const Order = require('../../models/Order')

const getAllAvailableOrders = async (req, res) => {
    try {
      const availableOrders = await Order.find({ deliveryDriverID: null });
  
      if (availableOrders.length === 0) {
        console.log('No available orders found.');
        return res.status(404).json({ message: 'No available orders found.' });
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
        return res.status(400).json({ error: 'Order ID is required' });
    }
    const driverId = req.user._id;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            console.log('Order not found.');
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.deliveryDriverID) {
            return res.status(400).json({
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

    } catch (err) {
        console.log('Error accepting order:', err);
        res.status(500).json({ error: 'Failed to accept the order', details: err.message });
    }
}

module.exports = {
    getAllAvailableOrders,
    acceptOrder
}