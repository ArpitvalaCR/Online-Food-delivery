const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');

// GET all dishes with optional category and search filters
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    let dishes = await Dish.find(query);
    if (search) {
      const q = search.toLowerCase().trim();
      dishes = dishes.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      );
    }
    res.json({ success: true, count: dishes.length, dishes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET dish by id
router.get('/:id', async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ success: false, message: 'Dish not found' });
    }
    res.json({ success: true, dish });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST add dish (Admin)
router.post('/', async (req, res) => {
  try {
    const { name, category, price, description, image, originalPrice, badge, badgeType, tag, customizable } = req.body;
    if (!name || !category || !price || !description || !image) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }
    const newDish = await Dish.create({
      name,
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      badge: badge || undefined,
      badgeType: badgeType || 'primary',
      tag: tag || undefined,
      description,
      image,
      isVeg: true,
      customizable: Boolean(customizable),
      availableSpiceLevels: ["Mild", "Medium", "Desi Teekha"],
      addonOptions: [
        { id: "extra_ghee", name: "Extra Desi Ghee", price: 25 },
        { id: "extra_butter", name: "Extra Butter", price: 20 }
      ]
    });
    res.status(201).json({ success: true, dish: newDish });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update dish (Admin)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Dish.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Dish not found' });
    }
    res.json({ success: true, dish: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE dish (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Dish.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Dish not found' });
    }
    res.json({ success: true, message: 'Dish removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
