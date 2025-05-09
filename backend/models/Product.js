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
    rating: 
     {
       type: Number,
       min: 0,
       max: 5,
       default: 0
     },
    ratingCount: 
     {  
      type: Number,
      default: 0
     },
});

ProductSchema.methods.updateRating = function(newRating) {
  
  if (newRating < 0 || newRating > 5) {
     throw new Error('Rating must be between 0 and 5');
  }
  if(!this.rating)
    this.rating = 0;

  if(!this.ratingCount)
    this.ratingCount = 0;

  const currentTotal = this.rating * this.ratingCount;
  this.ratingCount += 1;
  this.rating = (currentTotal + newRating) / this.ratingCount;

  this.rating = Math.round(this.rating * 10) / 10;

  return this.save();
};

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;