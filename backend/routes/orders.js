const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET all orders (for admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single order by orderId
router.get('/:orderId', async (req, res) => {
  try {
    let id = req.params.orderId;
    if (!id.startsWith('#')) id = '#' + id;
    const order = await Order.findOne({ orderId: id });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create new order
router.post('/', async (req, res) => {
  try {
    const { customer, items, couponCode, paymentMethod } = req.body;

    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({ success: false, message: 'Customer details are incomplete' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
    }

    // Server-side calculation of pricing
    let subtotal = 0;
    const processedItems = items.map(item => {
      let addonSum = 0;
      if (item.selectedAddons && Array.isArray(item.selectedAddons)) {
        addonSum = item.selectedAddons.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
      }
      const unitTotal = (Number(item.price) || 0) + addonSum;
      const qty = Math.max(1, Number(item.qty) || 1);
      const itemTotal = unitTotal * qty;
      subtotal += itemTotal;

      return {
        dishId: item.dishId || item.id || null,
        name: item.name,
        price: Number(item.price),
        qty,
        spiceLevel: item.spiceLevel || 'Medium',
        isJain: Boolean(item.isJain),
        selectedAddons: item.selectedAddons || [],
        itemTotal
      };
    });

    const tax = Math.round(subtotal * 0.05 * 100) / 100;
    const deliveryFee = subtotal >= 200 ? 0 : 30;

    let discount = 0;
    if (couponCode) {
      const code = couponCode.trim().toUpperCase();
      if (code === 'GHARKA20') {
        discount = Math.min(100, Math.round(subtotal * 0.20 * 100) / 100);
      } else if (code === 'FREESHIP') {
        discount = deliveryFee;
      } else if (code === 'THALIDAY') {
        discount = 40;
      }
    }

    let grandTotal = Math.max(0, subtotal + tax + deliveryFee - discount);
    grandTotal = Math.round(grandTotal * 100) / 100;

    const orderId = `#PB-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder = await Order.create({
      orderId,
      customer: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        coordinates: customer.coordinates || { lat: 18.5284, lng: 73.8443 }
      },
      items: processedItems,
      subtotal,
      tax,
      deliveryFee,
      discount,
      couponCode: couponCode ? couponCode.toUpperCase() : null,
      grandTotal,
      paymentMethod: paymentMethod || 'upi',
      paymentStatus: paymentMethod === 'cod' ? 'Pending COD' : 'Paid',
      trackingStage: 1, // Order Received
      rider: {
        name: 'Ramesh Kumar',
        phone: '+91 98230 45678',
        vehicle: 'Hero Electric Bike (MH 12 PB 4920)',
        rating: 4.9,
        currentCoords: { lat: 18.5173, lng: 73.8398 }
      },
      kitchenCoords: { lat: 18.5173, lng: 73.8398 },
      estimatedMinutes: 28,
      statusTimeline: [
        { stage: 1, title: 'Order Received & Verified', desc: 'Kitchen docket printed in Central Rasoi', completed: true }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! Kitchen has fired the stoves.',
      order: newOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH update tracking stage
router.patch('/:orderId/stage', async (req, res) => {
  try {
    let id = req.params.orderId;
    if (!id.startsWith('#')) id = '#' + id;
    const { stage } = req.body;
    const stageNum = Number(stage);

    if (![1, 2, 3, 4].includes(stageNum)) {
      return res.status(400).json({ success: false, message: 'Invalid stage. Must be 1, 2, 3, or 4' });
    }

    let eta = 28;
    if (stageNum === 2) eta = 20;
    if (stageNum === 3) eta = 12;
    if (stageNum === 4) eta = 0;

    const updated = await Order.findOneAndUpdate(
      { orderId: id },
      {
        trackingStage: stageNum,
        estimatedMinutes: eta,
        ...(stageNum === 4 ? { paymentStatus: 'Completed & Delivered' } : {})
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
