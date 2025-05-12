const Order = require('../../models/Order')
const Restaurant = require('../../models/Restaurant')
const Product = require('../../models/Product')


const createOrder = async (req, res) => {
    try {
        const { restaurantID, items } = req.body;
        const userID = req.user._id;

        req.body.userID = userID;
        req.body.deliveryDriverID = null;

        if (!restaurantID || !items || !Array.isArray(items) || items.length === 0) {
            console.log("Missing required fields or empty items list.");
            return res.status(403).json({ error: 'Missing required order fields or empty items list.' });
        }

        const existingOrder = await Order.findOne({
            userID: userID,
            status: { $in: ['pending', 'processing'] }
        });

        if (existingOrder) {
            return res.status(403).json({
                error: 'You already have an order with you, please cancel it first before creating other orders.',
                existingOrder
            });
        }
  
        const restaurant = await Restaurant.findById(restaurantID);
        if (!restaurant) return res.status(404).json({ error: 'Restaurant not found.' });
    
        // Run validation before trying to create order
        const validation = await Order.validateOrder(req.body);
        if (!validation.isValid) {
            // Handle stock availability issues
            if (validation.outOfStockItems) {
                return res.status(403).json({
                    error: 'Some products do not have sufficient stock',
                    outOfStockItems: validation.outOfStockItems,
                    totalAmount: validation.totalAmount
                });
            }
            
            // Handle any other validation errors
            return res.status(403).json({ 
                error: validation.error,
                details: validation.missingProducts ? { missingProducts: validation.missingProducts } : undefined
            });
        }
    
        const newOrder = await Order.createOrder(req.body);
        res.status(201).json(newOrder);
        console.log('newOrder:', newOrder);
        
    } catch (error) {
        console.log("Order creation error:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const userID = req.user._id;
        const {orderId, items} = req.body;

        if (!orderId || !Array.isArray(items) || items.length === 0) {
            return res.status(403).json({ error: "Missing order ID or items are invalid." });
        }

        // Fetch the order
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }

        if (order.userID.toString() !== userID.toString()) {
            return res.status(403).json({ error: "You are not authorized to update this order." });
        }

        // Check if a delivery driver has been assigned
        if (order.deliveryDriverID) {
            return res.status(409).json({ 
                error: "Cannot modify order after a delivery driver has been assigned.",
                driverAssigned: true
            });
        }

        if (['processing','delivered', 'cancelled'].includes(order.status)) {
            return res.status(403).json({ error: `Cannot update an order that is ${order.status}.` });
        }

        // Only update items (user is not allowed to change delivery driver, status, etc.)
        const updatedData = {
            restaurantID: order.restaurantID,
            userID: userID,
            items: items
        };

        // Validate and compute total using the static method
        const validation = await Order.validateOrder(updatedData);
        if (!validation.isValid) {
            if (validation.outOfStockItems) {
                return res.status(403).json({
                    error: 'Some products do not have sufficient stock',
                    outOfStockItems: validation.outOfStockItems,
                    totalAmount: validation.totalAmount
                });
            }
            
            return res.status(403).json({ 
                error: validation.error, 
                details: validation.missingProducts ? { missingProducts: validation.missingProducts } : undefined
            });
        }

        // Apply updates
        order.items = items;
        order.totalAmount = updatedData.totalAmount;

        await order.save();

        console.log('Updated order:', order);

        return res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
        console.log("Order update error:", error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

const cancelOrder = async (req, res) => {
    const { orderID } = req.query;
    const userID = req.user._id;

    if (!orderID) {
        console.log("Order ID is required");
        return res.status(403).json({ error: 'Order ID is required' });
    }

    try {
        // First find the order to check delivery driver status
        const order = await Order.findById(orderID);
        
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Verify the user owns this order
        if (order.userID.toString() !== userID.toString()) {
            return res.status(403).json({ error: "You are not authorized to cancel this order" });
        }

        // Check if a delivery driver has been assigned
        if (order.deliveryDriverID) {
            return res.status(403).json({ 
                error: "Cannot cancel order after a delivery driver has been assigned",
                driverAssigned: true
            });
        }

        // Check if order is already delivered or cancelled
        if (order.status === 'delivered') {
            return res.status(403).json({ error: "Cannot cancel an order that has been delivered" });
        }
        
        if (order.status === 'cancelled') {
            return res.status(403).json({ error: "This order is already cancelled" });
        }

        // Update order status to cancelled
        order.status = 'cancelled';
        await order.save();
        
        res.status(200).json({ message: 'Order cancelled successfully' });
        console.log('Order cancelled successfully:', orderID);
    } catch (error) {
        console.log("Order cancellation error:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findOrdersByUserId(req.user._id)
        res.status(200).json({
            message: "All orders fetched successfully",
            data: orders
        });
        console.log('orders:', orders);
    } catch (error) {
        console.log("Order fetching error:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message });        
    }
}

const getMyCurrentOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ userID: req.user._id, status: { $in: ['pending', 'processing'] } });
        if (!order) {
            return res.status(200).json({ message: 'No current order found.', order });
        }
        res.status(200).json({
            message: "Current order fetched successfully",
            order: order
        });
        console.log('order:', order);
    } catch (error) {
        console.log("Order fetching error:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message });        
    }
}

const getAllRestaurants  = async (req, res) => {
    const restaurants = await Restaurant.find({})
    if (!restaurants) {
        console.log("No restaurants found");
        return res.status(200).json({
            message: "No restaurants found",
            data: []
        });
    }

    res.status(200).json({
        message: "All restaurants fetched successfully",
        data: restaurants
    });
    console.log('restaurants:', restaurants);
}

const getProductsForRestaurant = async (req, res) => {
    const { restraurantID } = req.query;

    if(!restraurantID) {
        console.log("Restaurant ID is required");
        return res.status(403).json({ error: 'Restaurant ID is required' });
    }

    const restaurant = await Restaurant.findById(restraurantID);
    if (!restaurant) {
      console.log("Invalid restaurant _id");
      return res.status(404).json({ error: 'Restaurant not found.' });
    }

    console.log('restaurant:', restaurant);

    const products = await Product.find({
    restaurantId: restraurantID,
    $or: [
        { isBanned: null },
        { isBanned: false }
        ]
    });

    if (!products) {
        console.log("No products found for this restaurant");
        return res.status(200).json({
            message: "No products found for this restaurant",
            data: []
        });
    }

    res.status(200).json({
        message: "All products fetched successfully",
        data: products
    });
    console.log('products:', products);
}

module.exports = {
    createOrder,
    updateOrder,
    cancelOrder,
    getMyOrders,
    getMyCurrentOrder,
    getAllRestaurants,
    getProductsForRestaurant
}
