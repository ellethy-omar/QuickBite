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
      enum: ['called', 'pending', 'processing', 'delivered', 'cancelled'],
      default: 'called'
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    },
    restaurantID: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant', 
      required: true
    },
    deliveryDriverID:{
      type: Schema.Types.ObjectId,
      ref: 'Driver'
    },
    items: [ItemSchema],
    totalAmount: Number,
    processingStartedAt: { type: Date }, 
    deliveredAt:{ type: Date }
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

  const productIds = items.map(item => item.productId);

  const products = await mongoose.model('Product').find({
    _id: { $in: productIds },
    restaurantId: restaurantID
  });

  // Verify all products were found
  if (products.length !== productIds.length) {
    const foundIds = products.map(p => p._id.toString());
    const missingIds = productIds.filter(id => !foundIds.includes(id.toString()));
    return { 
      isValid: false, 
      error: `Some products not found or don't belong to this restaurant`,
      missingProducts: missingIds
    };
  }
  const outOfStockItems = [];
 

  // Calculate totalAmount and check stock 
  let totalAmount = 0;
  for (const item of items) {
    const product = products.find(p => p._id.toString() === item.productId.toString());
    if (!product) continue; // Just in case
    
    
     if (product.stockAvailable < (item.quantity || 1)) {
      outOfStockItems.push({
        productId: product._id,
        productName: product.name,
        requested: item.quantity || 1,
        available: product.stockAvailable
      });
    }
    
    totalAmount += product.price * (item.quantity || 1);
  
  }

   //response in case no enough stock fro a product 
  if (outOfStockItems.length > 0) {
    return {
      isValid: false,
      error: 'Some products do not have sufficient stock',
      outOfStockItems,
      totalAmount 
    };
  }

  // Set totalAmount in orderData
  orderData.totalAmount = totalAmount;

  return { isValid: true };
};

// Create order with validation, order data must match schema and deduce the stock 
OrderSchema.statics.createOrder = async function(orderData) {
  
  const validation = await this.validateOrder(orderData);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const session = await mongoose.startSession();
  let order;
  
  try {
    await session.withTransaction(async () => {
      for (const item of orderData.items) {
        const quantity = item.quantity || 1;
        const product = await mongoose.model('Product').findOneAndUpdate(
          { 
            _id: item.productId, 
            stockAvailable: { $gte: quantity }
          },
          { $inc: { stockAvailable: -quantity } },
          { session, new: true }
        );
      }

      order = await this.create([orderData], { session });
    });
    
    return order[0];
  }
   finally {
    session.endSession();
  }
};

// Find orders needing delivery (no delivery man assigned and not cancelled)
 
OrderSchema.statics.findOrdersNeedingDelivery = async function() {
  return this.find({
    deliveryDriverID: {  $in: [null, undefined] },
    status: { $eq: 'pending' }
  })
  .populate('restaurantID', 'name address logo contact.phone')
  .populate('userID', 'name phone addresses')
  .populate('items.productId', 'name price category description image');
};

//find orders by user id
OrderSchema.statics.findOrdersByUserId = async function(userID) {
  return this.find({ userID })
    .populate('restaurantID', 'name contact.phone logo')
    .populate('items.productId', 'name image')
    .populate({
      path: 'deliveryDriverID',
      select: 'name phone vehicle rating profilePicture'
    })
    .sort({ createdAt: -1 });
};

// find orders by restaurant id   
OrderSchema.statics.findOrdersByRestaurantId = async function(restaurantID) {
  return this.find({ restaurantID })
    .populate('userID', 'name addresses')
    .populate('deliveryDriverID', 'name phone')
    .populate('items.productId', 'name price category description image')
    .sort({ timestamp: -1 });
};

//resturant find new orders for a sepcfic restaurant with status pending 
OrderSchema.statics.findNewRestaurantOrders = async function(restaurantID) {
  return this.find({  restaurantID,
    status: { $eq: 'pending' }  
   })
    .populate('userID', 'name addresses')
    .populate('deliveryDriverID', 'name phone')
    .populate('items.productId', 'name price category description image')
    .sort({ timestamp: -1 });
};


//find order by ID not tested yet 
// OrderSchema.statics.findOrderById = async function(orderId) {
//   return this.findById(orderId)
//     .populate('restaurantID')
//     .populate('userID')
//     .populate('deliveryDriverID')
//     .populate('items.productID');
// };


//update status of order by id in test queries line 80


// unassignDeliveryman by order id in test queries line 97


//assign a delivery man by the order id and delivery man id in test queries line 115



  const Order = mongoose.model('Order', OrderSchema);
  
  module.exports = Order;