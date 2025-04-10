require('dotenv').config();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

console.log("Mongo URI:", process.env.MONGO_URI);
const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('MongoDB connection URI is not defined in environment variables');
}

// Mongoose connection (primary connection for your app)
mongoose.connect(uri, {
  useNewUrlParser: true,        // Fixed typo: was 'userNewUrlParser'
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1  // Adding Stable API version
})
.then(() => console.log('Connected to MongoDB via Mongoose'))
.catch(err => console.error('Mongoose connection error:', err));

// Native MongoDB driver connection (for specific operations if needed)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function testConnection() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return true;
  } catch (err) {
    console.error("Connection test failed:", err);
    return false;
  } finally {
    await client.close();
    console.log("Test connection closed");
  }
}

// Only run the test connection if this file is executed directly
if (require.main === module) {
  testConnection().catch(console.error);
}

module.exports = {
  mongooseConnection: mongoose.connection,
  testConnection
};