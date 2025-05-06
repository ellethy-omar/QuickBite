const Order = require('../../models/Order')

const { sendWSMessage } = require('../../websockets/utils/wsUtils')

const getAllAvailableOrders = async (req, res) => {
    try {
      const availableOrders = await Order.findOrdersNeedingDelivery();
  
      if (availableOrders.length === 0) {
        console.log('No available orders found.');
        return res.status(200).json({ message: 'No available orders found.', data: [] });
      }
  
      res.status(200).json({
        data: availableOrders,
      });
  
      console.log('availableOrders:', availableOrders);  
    } catch (err) {
      console.log('Error fetching available orders:', err);
      res.status(500).json({ error: 'Failed to fetch available orders', details: err.message });
    }
};
  

const acceptOrder = async (req, res) => {
    const { orderId } = req.query;

    if (!orderId) {
        console.log('Order ID is required.');
        return res.status(403).json({ error: 'Order ID is required' });
    }
    const driverId = req.user._id;

    try {
        const existingOrder = await Order.findOne({
            deliveryDriverID: driverId,
            status: { $in: ['pending', 'processing'] }
        });

        if (existingOrder) {
            return res.status(400).json({
                error: 'You already have an order with you, please cancel it first before accepting other orders.',
                existingOrder
            });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            console.log('Order not found.');
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.deliveryDriverID) {
            if(order.deliveryDriverID === driverId) {

                console.log('You already have this order.');
                return res.status(403).json({
                    error: 'You already have this order.',
                    order
                });
            }
            console.log('The order is already taken by another driver.');
            return res.status(403).json({
                error: 'The order is already taken by another driver.',
                order
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                $set: { deliveryDriverID: driverId, status: 'processing' }, // Assign the driver and update status
            },
            { new: true } // Return the updated document
        ).populate('deliveryDriverID', 'name phone vehicle');

        res.status(200).json({
            message: 'Order accepted successfully',
            order: updatedOrder,
        });

        console.log('updatedOrder:', updatedOrder);

        const pushed = sendWSMessage(
            'user',
            updatedOrder.userID,
            'orderAccepted',
            { orderId: updatedOrder._id, status: updatedOrder.status }
        );

        if(!pushed) {
            console.log('Failed to send order accepted message to user.');
        }

    } catch (err) {
        console.log('Error accepting order:', err);
        res.status(500).json({ error: 'Failed to accept the order', details: err.message });
    }
}

const leaveOrder = async (req, res) => {
    const { orderId } = req.query;

    if (!orderId) {
        console.log('Order ID is required.');
        return res.status(403).json({ error: 'Order ID is required' });
    }
    const driverId = req.user._id;    
    try {
        const existingOrder = await Order.findById(orderId);

        if (!existingOrder) {
            console.log('You do not have any orders.');
            return res.status(404).json({
                error: 'You do not have any orders.'
            });
        }

        if(existingOrder.deliveryDriverID != driverId) {
            console.log('You do not have this order.');
            return res.status(403).json({
                error: 'You do not have this order.'
            });
        }
        existingOrder.deliveryDriverID = null;
        existingOrder.status = 'pending';
        await existingOrder.save();

        console.log('Order left successfully:', existingOrder);
        res.status(200).json({
            message: 'You have left the order successfully.'
        });

        const pushed = sendWSMessage(
            'user',
            existingOrder.userID,
            'orderLeft',
            { orderId: existingOrder._id, status: existingOrder.status }
        );

        if(!pushed) {
            console.log('Failed to send order left message to user.');
        }

    } catch (error) {
        console.log('Error leaving order:', err);
        res.status(500).json({ error: 'Failed to leave the order, guess you are stuck with it', details: err.message });        
    }
}

const getTheOrderIneedToDeliver = async (req, res) => {
    const driverId = req.user._id;    
    try {
        const order = await Order.findOne({
            deliveryDriverID: driverId,
            status: { $in: ['pending', 'processing'] }
        }).populate('restaurantID', 'name address contact.phone')
        .populate('userID', 'name phone addresses')
        .populate('items.productId', 'name price category description image');

        if(!order) {
            console.log('You do not have any order.');
            return res.status(200).json({
                message: 'You do not have any orders.',
                existingOrder: order
            });
        } else {
            console.log('Found order:', order);
            res.status(200).json({
                message: 'Order found.',
                existingOrder: order
            });
        }
    }
    catch (error) {
        console.log('Error finding order:', err);
        res.status(500).json({ error: 'Error getting the order????????? How did you reach this point?', details: err.message });        
    }
}

const getMyOrdersHistory = async (req, res) => {
    const driverId = req.user._id;    
    try {
        const orders = await Order.find({
            deliveryDriverID: driverId,
            status: { $in: ['delivered', 'cancelled'] }
        }).populate('restaurantID', 'name address contact.phone')
        .populate('userID', 'name phone addresses')
        .populate('items.productId', 'name price category description image');

        if(!orders) {
            console.log('You do not have any order.');
            return res.status(200).json({
                message: 'You do not have any orders.',
                existingOrder: orders
            });
        } else {
            console.log('Found order:', orders);
            res.status(200).json({
                message: 'Order found.',
                existingOrder: orders
            });
        }
    }
    catch (error) {
        console.log('Error finding order:', err);
        res.status(500).json({ error: 'Error getting the order????????? How did you reach this point?', details: err.message });        
    }
}

module.exports = {
    getAllAvailableOrders,
    acceptOrder,
    leaveOrder,
    getTheOrderIneedToDeliver,
    getMyOrdersHistory
}