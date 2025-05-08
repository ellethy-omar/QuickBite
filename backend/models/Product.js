const mongoose = require('mongoose');
 
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    restaurantId: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true}, // rest id should be present
    category: String,
    stockAvailable: Number, // should be decremented once an order is placed and checked before placing an order
    image: String,  
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;