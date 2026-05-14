const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('✅ MongoDB Memory Server Connected');
  } catch (error) {
    console.log('⚠️  Running without database - using demo data');
  }
};

module.exports = connectDB;
