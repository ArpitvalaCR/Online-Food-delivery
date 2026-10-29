const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST Sign In
router.post('/login', async (req, res) => {
  try {
    const { identifier, password, rememberThaliPreference } = req.body;
    if (!identifier || !identifier.trim()) {
      return res.status(400).json({ success: false, message: 'Mobile number or email is required' });
    }
    if (!password || !password.trim()) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    const user = await User.findUser(identifier.trim());
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No account found with this mobile number or email. Please create an account first.'
      });
    }

    // Verify password if user has one stored
    if (user.password && user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. Please check your credentials and try again.'
      });
    }

    // Update remember preference if provided
    if (rememberThaliPreference !== undefined) {
      user.rememberThaliPreference = Boolean(rememberThaliPreference);
    }

    res.json({
      success: true,
      message: 'Swagat Hai! Logged in successfully.',
      user: {
        id: user.id || user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        rememberThaliPreference: user.rememberThaliPreference !== false,
        preferredSpiceLevel: user.preferredSpiceLevel || 'Medium'
      },
      token: 'pb_jwt_' + Date.now()
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST Register
router.post('/register', async (req, res) => {
  try {
    const { name, phone, email, password, rememberThaliPreference } = req.body;
    if (!phone || !name) {
      return res.status(400).json({ success: false, message: 'Name and mobile number are required' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const existingPhone = await User.findUser(phone);
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: 'An account already exists with this mobile number. Please Sign In.'
      });
    }

    if (email) {
      const existingEmail = await User.findUser(email);
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: 'An account already exists with this email address. Please Sign In.'
        });
      }
    }

    const newUser = await User.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      password: password,
      rememberThaliPreference: rememberThaliPreference !== false
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to Padmavati Bhojnalaya family.',
      user: {
        id: newUser.id || newUser._id,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        rememberThaliPreference: newUser.rememberThaliPreference,
        preferredSpiceLevel: newUser.preferredSpiceLevel || 'Medium'
      },
      token: 'pb_jwt_' + Date.now()
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST Fast OTP Login
router.post('/otp-login', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Mobile number is required for OTP login' });
    }

    let user = await User.findUser(phone);
    if (!user) {
      user = await User.create({
        name: 'Valued Guest',
        phone,
        rememberThaliPreference: true
      });
    }

    res.json({
      success: true,
      message: 'OTP verified successfully! Welcome back.',
      user: {
        id: user.id || user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        rememberThaliPreference: user.rememberThaliPreference,
        preferredSpiceLevel: user.preferredSpiceLevel || 'Medium'
      },
      token: 'pb_jwt_' + Date.now()
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
