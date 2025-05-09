const Order = require('../../models/Order');

const getRestaurantAllRequiredOrders = async (req, res) => {
    try {
        const orders = await Order.findNewRestaurantOrders(req.user._id);
        if (!orders) {
            console.log("No orders found");
            return res.status(200).json({ 
                message: 'No required orders found' ,
                data: []
            });
        }

        res.status(200).json({
            message: "Orders fetched successfully",
            data: orders
        });

        console.log('orders:', orders);
    } catch (error) {
        console.log('Error fetching required orders:', err);
        res.status(500).json({ error: 'Failed to fetch required orders', details: err.message });        
    }
}

const getRestaurantAllOrders = async (req, res) => {
    try {
        const orders = await Order.findNewRestaurantOrders(req.user._id);
        if (!orders) {
            console.log("No orders found");
            return res.status(200).json({ 
                message: 'No orders found' ,
                data: []
            });
        }

        res.status(200).json({
            message: "Orders fetched successfully",
            data: orders
        });

        console.log('orders:', orders);
    } catch (error) {
        console.log('Error fetching required orders:', err);
        res.status(500).json({ error: 'Failed to fetch required orders', details: err.message });        
    }
}


module.exports = {
    getRestaurantAllRequiredOrders,
    getRestaurantAllOrders
}