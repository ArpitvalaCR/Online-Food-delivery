const mongoose = require('mongoose');
const { isMongoActive, getMemoryStore, saveMemoryStore } = require('../config/db');

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String, default: 'Valued Guest' },
  email: { type: String },
  phone: { type: String, required: true },
  password: { type: String },
  rememberThaliPreference: { type: Boolean, default: true },
  preferredSpiceLevel: { type: String, default: 'Medium' },
  defaultAddress: { type: String, default: '' },
  ordersCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const MongoUser = mongoose.model('User', userSchema);

const User = {
  findUser: async (identifier) => {
    if (!identifier) return null;
    const cleanId = String(identifier).replace(/[\s\-\+]/g, '').replace(/^91/, '');
    const isEmail = String(identifier).includes('@');
    const targetEmail = String(identifier).toLowerCase().trim();

    if (isMongoActive()) {
      if (isEmail) {
        return await MongoUser.findOne({ email: targetEmail });
      }
      return await MongoUser.findOne({
        $or: [
          { phone: identifier },
          { phone: cleanId },
          { phone: `+91 ${cleanId}` },
          { phone: `+91${cleanId}` }
        ]
      });
    }

    const store = getMemoryStore();
    return store.users.find(u => {
      if (isEmail) {
        return (u.email || '').toLowerCase().trim() === targetEmail;
      }
      const uPhoneClean = String(u.phone || '').replace(/[\s\-\+]/g, '').replace(/^91/, '');
      return (cleanId && uPhoneClean === cleanId) || u.phone === identifier;
    });
  },

  create: async (data) => {
    if (isMongoActive()) {
      return await MongoUser.create(data);
    }
    const store = getMemoryStore();
    const newUser = {
      ...data,
      id: `usr_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    store.users.push(newUser);
    saveMemoryStore();
    return newUser;
  }
};

module.exports = User;
