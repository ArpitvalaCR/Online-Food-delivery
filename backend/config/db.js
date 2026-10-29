const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let isConnected = false;
const dataFile = path.join(__dirname, '..', 'data', 'store.json');

// Memory store fallback in case MongoDB instance is not active
const memoryStore = {
  dishes: [],
  orders: [],
  users: []
};

function loadStoreFromFile() {
  try {
    if (fs.existsSync(dataFile)) {
      const raw = fs.readFileSync(dataFile, 'utf8');
      const parsed = JSON.parse(raw);
      memoryStore.dishes = parsed.dishes || [];
      memoryStore.orders = parsed.orders || [];
      memoryStore.users = parsed.users || [];
    }
  } catch (err) {
    console.warn('Could not read from local store file:', err.message);
  }
}

function saveStoreToFile() {
  try {
    const dir = path.dirname(dataFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFile, JSON.stringify(memoryStore, null, 2), 'utf8');
  } catch (err) {
    console.warn('Could not persist to local store file:', err.message);
  }
}

loadStoreFromFile();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/padmavati_bhojnalaya';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.log(`[Database Notice] MongoDB server is not running locally. Using resilient high-speed JSON/In-Memory persistence layer.`);
  }
};

module.exports = {
  connectDB,
  isMongoActive: () => isConnected,
  getMemoryStore: () => memoryStore,
  saveMemoryStore: saveStoreToFile
};
