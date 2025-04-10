// test-queries.js
const mongoose = require('mongoose');
require('./models/User'); // Import your models

async function testQueries() {
  try {
    await mongoose.connect('mongodb://localhost:27017/AppDB');
    
    // Usage example
     verifyUser('fatima@example.com', 'Fatima123')
    .then(result => console.log(result));
    // Test queries here
    const users = await User.find({ 'addresses.area': 'Salmiya' });
    console.log('Users in Salmiya:', users);
    
    // Test create operation
    const newUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123'
    });
    console.log('Created user:', newUser);
    
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    mongoose.disconnect();
  }
}

testQueries();