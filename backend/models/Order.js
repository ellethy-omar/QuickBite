const mongoose = require('mongoose');
 
const { Schema } = mongoose.Schema;


const ItemSchema = new Schema({
    ProductId: {type: Schema.Types.ObjectId,
      ref: 'Product', 
      required: true}, // product id should be present
    quantity: Number
  });

  const OrderSchema = new Schema({
    status: String,
    userID: {type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true},//validate, //should be a present user
    restaurantID: {type: Schema.Types.ObjectId,
      ref: 'Restaurant', 
      required: true},
    deliveryDriverID:{type: Schema.Types.ObjectId,
      ref: 'Driver', 
      required: true}, //validate
    items: [ItemSchema],
    timestamp: { type: Date, default: Date.now }
  });