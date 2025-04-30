const mongoose = require('mongoose');
 
const { Schema } = mongoose;

const ItemSchema = new Schema({
    productId: {type: Schema.Types.ObjectId,
      ref: 'Product', 
      required: true}, // product id should be present
    quantity: Number
  });

const OrderSchema = new Schema({
    status: {
      type: String,
      enum: ['pending', 'processing', 'delivered', 'cancelled'],
      default: 'pending'
    },
    userID: {type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true},
    restaurantID: {type: Schema.Types.ObjectId,
      ref: 'Restaurant', 
      required: true},
    deliveryDriverID:{type: Schema.Types.ObjectId,
      ref: 'Driver'},
    items: [ItemSchema],
    totalAmount: Number
  },{ 
    timestamps: true // Adds createdAt and updatedAt automatically
  });




// Validation function
OrderSchema.statics.validateOrder = async function(orderData) {
  const { restaurantID, items } = orderData;
  
  const restaurant = await mongoose.model('Restaurant').findById(restaurantID);
  if (!restaurant) {
    return { isValid: false, error: 'Restaurant not found' };
  }

  // 2. Check all product IDs exist and belong to this restaurant
  const productIds = items.map(item => item.productId);

  const products = await mongoose.model('Product').find({
    _id: { $in: productIds },
    restaurantId: restaurantID
  })

  console.log('products*:', products);
  console.log('productIds:', productIds);

  // 3. Verify all products were found
  if (products.length !== productIds.length) {
    const foundIds = products.map(p => p._id.toString());
    const missingIds = productIds.filter(id => !foundIds.includes(id.toString()));
    return { 
      isValid: false, 
      error: `Some products not found or don't belong to this restaurant`,
      missingProducts: missingIds
    };
  }

  return { isValid: true };
};

// Create order with validation, order data must match schema
OrderSchema.statics.createOrder = async function(orderData) {
  const validation = await this.validateOrder(orderData);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  return this.create(orderData);
};

// Find orders needing delivery (no delivery man assigned and not cancelled)
 
OrderSchema.statics.findOrdersNeedingDelivery = async function() {
  return this.find({
    deliveryDriverID: { $exists: false },
    status: { $ne: 'cancelled' }
  })
  .populate('restaurantID', 'name address')
  .populate('userID', 'name phone addresses')
  .populate('items.productId', 'name price');
};

//find orders by user id
OrderSchema.statics.findOrdersByUserId = async function(userID) {
  return this.find({ userID })
    .populate('restaurantID', 'name logo')
    .populate('items.productID', 'name image')
    .sort({ timestamp: -1 }); // newest first
};

// find orders by restaurant id 
OrderSchema.statics.findOrdersByRestaurantId = async function(restaurantID) {
  return this.find({ restaurantID })
    .populate('userID', 'name addresses')
    .populate('deliveryDriverID', 'name phone')
    .sort({ timestamp: -1 });
};

//find order by ID
OrderSchema.statics.findOrderById = async function(orderId) {
  return this.findById(orderId)
    .populate('restaurantID')
    .populate('userID')
    .populate('deliveryDriverID')
    .populate('items.productID');
};


//update status of order by id 
const updateOrderStatus = async (orderId, newStatus) => {
  return Order.findByIdAndUpdate(
    orderId,
    { 
      $set: { status: newStatus },
      $currentDate: { updatedAt: true } 
    },
    { new: true } // Return the updated document
  );
};

const unassignDeliveryMan = async (orderId) => {
  return Order.findByIdAndUpdate(
    orderId,
    { 
      $unset: { deliveryManId: "" },
      $set: { status: 'preparing' }
    },
    { new: true }
  );
};

const assignDeliveryMan = async (orderId, deliveryManId) => {
  return Order.findByIdAndUpdate(
    orderId,
    { 
      $set: { 
        deliveryDriverID: deliveryManId
      }
    },
    { new: true } // Return the updated document
  ).populate('deliveryManId', 'name phone vehicle');
};



  const Order = mongoose.model('Order', OrderSchema);
  
  module.exports = Order;