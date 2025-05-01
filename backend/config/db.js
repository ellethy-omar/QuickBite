require('dotenv').config();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('MongoDB connection URI is not defined in environment variables');
}

// Mongoose connection (primary connection for your app)
const intializeMongooseConnection = async ()=> {
  mongoose.connect(uri, {
    useNewUrlParser: true,        // Fixed typo: was 'userNewUrlParser'
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1  // Adding Stable API version
  })
  .then(() => console.log('Connected to MongoDB via Mongoose'))
  .catch(err => console.error('Mongoose connection error:', err));
}

module.exports = {
  intializeMongooseConnection
};