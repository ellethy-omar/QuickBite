const Order = require('../../models/Order');

const getRestaurantAllCalledOrders = async (req, res) => {
    try {
        const restaurantID = req.user._id;
        
        const orders = await Order.find({ 
            restaurantID,
            status: 'called' 
        })
        .populate('userID', 'name phone addresses')
        .populate('items.productId', 'name price category description image')
        .sort({ createdAt: -1 });
        
        res.status(200).json({
            message: "Called orders fetched successfully",
            data: orders || []
        }); 

        console.log('Called orders:', orders.length);
    } catch (err) {
        console.log('Error fetching called orders:', err);
        res.status(500).json({ error: 'Failed to fetch called orders', details: err.message });        
    }
};

const getRestaurantAllRequiredOrders = async (req, res) => {
    try {
        const restaurantID = req.user._id;
        
        const orders = await Order.find({ 
            restaurantID,
            status: { $in: ['pending', 'processing'] } 
        })
        .populate('userID', 'name phone addresses')
        .populate('items.productId', 'name price category description image')
        .populate('deliveryDriverID', 'name phone vehicle rating profilePicture')
        .sort({ createdAt: -1 });
        
        res.status(200).json({
            message: "Required orders fetched successfully",
            data: orders || []
        });

        console.log('Required orders:', orders.length);
    } catch (err) {
        console.log('Error fetching required orders:', err);
        res.status(500).json({ error: 'Failed to fetch required orders', details: err.message });        
    }
};

const acceptOrder = async (req, res) => {
    try {
        const { orderID } = req.query;
        const restaurantID = req.user._id;
        
        if (!orderID) {
            return res.status(400).json({ error: 'Order ID is required' });
        }
        
        const order = await Order.findOne({ 
            _id: orderID,
            restaurantID,
            status: 'called'
        });
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found or not in "called" status' });
        }
        
        order.status = 'pending';
        await order.save();
        
        res.status(200).json({
            message: 'Order accepted successfully',
            order
        });
        
        console.log('Order accepted:', orderID);
    } catch (err) {
        console.log('Error accepting order:', err);
        res.status(500).json({ error: 'Failed to accept order', details: err.message });
    }
};

const rejectOrder = async (req, res) => {
    try {
        const { orderID } = req.query;
        const restaurantID = req.user._id;
        
        if (!orderID) {
            return res.status(400).json({ error: 'Order ID is required' });
        }
        
        const order = await Order.findOne({ 
            _id: orderID,
            restaurantID,
            status: 'called'
        });
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found or not in "called" status' });
        }
        
        order.status = 'cancelled';
        await order.save();
        
        res.status(200).json({
            message: 'Order rejected successfully',
            order
        });
        
        console.log('Order rejected:', orderID);
    } catch (err) {
        console.log('Error rejecting order:', err);
        res.status(500).json({ error: 'Failed to reject order', details: err.message });
    }
};

const getOrdersHistory = async (req, res) => {
    try {
        const restaurantID = req.user._id;
        
        const query = { restaurantID };
        
        const totalOrders = await Order.countDocuments(query);
        
        const orders = await Order.find(query)
            .populate('userID', 'name phone addresses')
            .populate('items.productId', 'name price category description image')
            .populate('deliveryDriverID', 'name phone vehicle rating profilePicture')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            message: "Order history fetched successfully",
            data: orders || [],
        });
        
        console.log(`Order history for restaurant (${page}/${Math.ceil(totalOrders / limit)}):`, orders.length);
    } catch (err) {
        console.log('Error fetching order history:', err);
        res.status(500).json({ error: 'Failed to fetch order history', details: err.message });
    }
};

module.exports = {
    getRestaurantAllCalledOrders,
    getRestaurantAllRequiredOrders,
    acceptOrder,
    rejectOrder,
    getOrdersHistory
};