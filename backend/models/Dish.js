const mongoose = require('mongoose');
const { isMongoActive, getMemoryStore, saveMemoryStore } = require('../config/db');
const seedDishes = require('../data/seedData');

const dishSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  badge: { type: String },
  badgeType: { type: String, default: 'primary' },
  tag: { type: String },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: String, default: '1k+' },
  description: { type: String, required: true },
  image: { type: String, required: true },
  isVeg: { type: Boolean, default: true },
  customizable: { type: Boolean, default: false },
  availableSpiceLevels: [{ type: String }],
  addonOptions: [{
    id: String,
    name: String,
    price: Number
  }],
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const MongoDish = mongoose.model('Dish', dishSchema);

// Initializer for fallback store
function initMemoryDishes() {
  const store = getMemoryStore();
  if (!store.dishes || store.dishes.length === 0) {
    store.dishes = [...seedDishes];
    saveMemoryStore();
  }
}
initMemoryDishes();

const Dish = {
  find: async (query = {}) => {
    if (isMongoActive()) {
      return await MongoDish.find(query);
    }
    initMemoryDishes();
    let results = [...getMemoryStore().dishes];
    if (query.category && query.category !== 'All') {
      results = results.filter(d => d.category.toLowerCase() === query.category.toLowerCase());
    }
    if (query.isAvailable !== undefined) {
      results = results.filter(d => d.isAvailable !== false);
    }
    return results;
  },

  findById: async (id) => {
    if (isMongoActive()) {
      return await MongoDish.findOne({ id }) || await MongoDish.findById(id);
    }
    initMemoryDishes();
    return getMemoryStore().dishes.find(d => d.id === id || d._id === id);
  },

  create: async (data) => {
    if (isMongoActive()) {
      return await MongoDish.create(data);
    }
    initMemoryDishes();
    const newDish = {
      ...data,
      id: data.id || `dish-${Date.now()}`,
      createdAt: new Date()
    };
    getMemoryStore().dishes.push(newDish);
    saveMemoryStore();
    return newDish;
  },

  findByIdAndUpdate: async (id, updates) => {
    if (isMongoActive()) {
      return await MongoDish.findOneAndUpdate({ id }, updates, { new: true });
    }
    initMemoryDishes();
    const store = getMemoryStore();
    const idx = store.dishes.findIndex(d => d.id === id);
    if (idx !== -1) {
      store.dishes[idx] = { ...store.dishes[idx], ...updates };
      saveMemoryStore();
      return store.dishes[idx];
    }
    return null;
  },

  findByIdAndDelete: async (id) => {
    if (isMongoActive()) {
      return await MongoDish.findOneAndDelete({ id });
    }
    initMemoryDishes();
    const store = getMemoryStore();
    const idx = store.dishes.findIndex(d => d.id === id);
    if (idx !== -1) {
      const removed = store.dishes.splice(idx, 1);
      saveMemoryStore();
      return removed[0];
    }
    return null;
  }
};

module.exports = Dish;
