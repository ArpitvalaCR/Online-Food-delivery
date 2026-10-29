const mongoose = require('mongoose');
const { isMongoActive, getMemoryStore, saveMemoryStore } = require('../config/db');

const orderItemSchema = new mongoose.Schema({
  dishId: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, default: 1 },
  spiceLevel: { type: String, default: 'Medium' },
  isJain: { type: Boolean, default: false },
  selectedAddons: [{
    id: String,
    name: String,
    price: Number
  }],
  itemTotal: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    coordinates: {
      lat: { type: Number, default: 18.5204 },
      lng: { type: Number, default: 73.8567 }
    }
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  couponCode: { type: String, default: null },
  grandTotal: { type: Number, required: true },
  paymentMethod: { type: String, default: 'upi' },
  paymentStatus: { type: String, default: 'Paid' },
  trackingStage: { type: Number, default: 1 }, // 1: Received, 2: Preparing, 3: On Route, 4: Delivered
  rider: {
    name: { type: String, default: 'Ramesh Kumar' },
    phone: { type: String, default: '+91 98230 45678' },
    vehicle: { type: String, default: 'Hero Electric Bike (MH 12 PB 4920)' },
    rating: { type: Number, default: 4.9 },
    currentCoords: {
      lat: { type: Number, default: 18.5220 },
      lng: { type: Number, default: 73.8425 }
    }
  },
  kitchenCoords: {
    lat: { type: Number, default: 18.5173 },
    lng: { type: Number, default: 73.8398 }
  },
  estimatedMinutes: { type: Number, default: 25 },
  statusTimeline: [{
    stage: Number,
    title: String,
    desc: String,
    timestamp: { type: Date, default: Date.now },
    completed: Boolean
  }],
  createdAt: { type: Date, default: Date.now }
});

const MongoOrder = mongoose.model('Order', orderSchema);

// Initial sample order for instant live tracking view
function initSampleOrder() {
  const store = getMemoryStore();
  if (!store.orders || store.orders.length === 0) {
    store.orders = [
      {
        orderId: "#PB-84920",
        customer: {
          name: "Anand Joshi",
          phone: "+91 98221 54321",
          address: "Flat 402, Shivshanti Apartments, Main Road",
          coordinates: { lat: 18.5284, lng: 73.8443 }
        },
        items: [
          {
            dishId: "dish-1",
            name: "Maharaja Special Thali",
            price: 280,
            qty: 1,
            spiceLevel: "Medium",
            isJain: false,
            selectedAddons: [{ id: "extra_ghee", name: "Extra Desi Ghee Drizzle", price: 25 }],
            itemTotal: 305
          },
          {
            dishId: "dish-2",
            name: "Shahi Dal Tadka & Jeera Rice Combo",
            price: 190,
            qty: 1,
            spiceLevel: "Desi Teekha",
            isJain: false,
            selectedAddons: [],
            itemTotal: 190
          }
        ],
        subtotal: 495,
        tax: 24.75,
        deliveryFee: 0,
        discount: 0,
        couponCode: null,
        grandTotal: 519.75,
        paymentMethod: "upi",
        paymentStatus: "Paid",
        trackingStage: 3, // On route by default for demo
        rider: {
          name: "Ramesh Kumar",
          phone: "+91 98230 45678",
          vehicle: "Hero Electric Bike (MH 12 PB 4920)",
          rating: 4.9,
          currentCoords: { lat: 18.5220, lng: 73.8425 }
        },
        kitchenCoords: { lat: 18.5173, lng: 73.8398 },
        estimatedMinutes: 14,
        createdAt: new Date(Date.now() - 15 * 60 * 1000)
      }
    ];
    saveMemoryStore();
  }
}
initSampleOrder();

const Order = {
  find: async (query = {}) => {
    if (isMongoActive()) {
      return await MongoOrder.find(query).sort({ createdAt: -1 });
    }
    initSampleOrder();
    let results = [...getMemoryStore().orders];
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return results;
  },

  findOne: async (query) => {
    if (isMongoActive()) {
      return await MongoOrder.findOne(query);
    }
    initSampleOrder();
    const store = getMemoryStore();
    return store.orders.find(o => {
      if (query.orderId) return o.orderId.toLowerCase() === query.orderId.toLowerCase();
      if (query._id) return o._id === query._id;
      return false;
    });
  },

  create: async (data) => {
    if (isMongoActive()) {
      return await MongoOrder.create(data);
    }
    initSampleOrder();
    const newOrder = {
      ...data,
      _id: `ord_${Date.now()}`,
      createdAt: new Date()
    };
    getMemoryStore().orders.unshift(newOrder);
    saveMemoryStore();
    return newOrder;
  },

  findOneAndUpdate: async (query, updates, options = {}) => {
    if (isMongoActive()) {
      return await MongoOrder.findOneAndUpdate(query, updates, options);
    }
    initSampleOrder();
    const store = getMemoryStore();
    const idx = store.orders.findIndex(o => {
      if (query.orderId) return o.orderId.toLowerCase() === query.orderId.toLowerCase();
      if (query._id) return o._id === query._id;
      return false;
    });
    if (idx !== -1) {
      store.orders[idx] = { ...store.orders[idx], ...updates };
      saveMemoryStore();
      return store.orders[idx];
    }
    return null;
  }
};

module.exports = Order;
