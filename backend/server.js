require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { connectDB } = require('./config/db');

const dishesRoute = require('./routes/dishes');
const ordersRoute = require('./routes/orders');
const authRoute = require('./routes/auth');


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database (MongoDB Atlas / local MongoDB / resilient JSON store)
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/dishes', dishesRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/auth', authRoute);


// Serve frontend production build if present, otherwise legacy public
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
const legacyPublic = path.join(__dirname, '..', 'public');

if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else if (fs.existsSync(legacyPublic)) {
  app.use(express.static(legacyPublic));
  app.get('*', (req, res) => {
    res.sendFile(path.join(legacyPublic, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`[Padmavati Bhojnalaya] Royal Kitchen server running at http://localhost:${PORT}`);
});
