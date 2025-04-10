const mongoose = require('mongoose');
 
const { Schema } = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    RestraurantId: {type: Schema.Types.ObjectId,
      ref: 'Restaurant', 
      required: true}, // rest id should be present
    category: String,
    isAvailable: Boolean,
    image: Image //what type
  });

  const Product = mongoose.model('Product', ProductSchema);
      module.exports = Product;