const Admin = require('../models/Admin');
const Order = require('../models/Order');
const User = require('../models/User');
const Driver = require('../models/Driver');
const Restaurant = require('../models/Restaurant');
const Product = require("../models/Product");
const Chat = require('../models/Chat');
const Message = require('../models/Message');


//  How to use in postman
// 1- create new request
// 2- set the method from GET to POST
// 3- type this url http://localhost:4123/testQueries
// 4- click on body and then click on raw just under body
// 5- go a little to the right set the type from text to JSON
// 6- type in the big container this format

/*

    {
        "parameters": {
            
        }
    }
*/

// 7- write the data you want to use inside the parameters
/*

    {
        "parameters": {
            "_id": "68038f352d9e7b936f558e11"
        }
    }
*/

// to access this use parameters._id and you can always look at the log
// final thing make sure to look at the postman responses and you're done


const testQueries = async (req, res) => {
    try {
        // const { parameters } = req.body;

        // console.log('parameters:', parameters);

        // NEVER FORGET AWAIT SINCE THIS WILL GIVE YOU A WEIRD ERROR ABOUT NOT BEING ABLE TO JSON OR SOMETHING LIKE THAT

        // const result = await User.findById(parameters._id);


        // res.status(200).json({ message: "sucess", result: result});
        // console.log('result:', result);

        // query for find orders needing delivery
        // const orders = await Order.findOrdersNeedingDelivery();
    
        // res.status(200).json({
        //   success: true,
        //   count: orders.length,
        //   data: orders
        // });



        // query for finding one users orders 
        // const { parameters } = req.body;
        
        // const orders = await Order.findOrdersByUserId(parameters._id);
        
        

        //finding a resturants orders 
        // const { parameters } = req.body;
        // const orders = await Order.findOrdersByRestaurantId(parameters._id);
       

        //finding a restaurants new orders
        // const { parameters } = req.body;
        // const orders = await Order.findNewRestaurantOrders(parameters._id);

        // res.status(200).json({
        //           success: true,
        //           count: orders.length,
        //           data: orders
        //         });


       //update order status
    //     const { orderId, newStatus } = req.body;
    //    const updatedOrder = await Order.findByIdAndUpdate(
    //     orderId,
    //     { 
    //       $set: { status: newStatus },
    //       $currentDate: { updatedAt: true } 
    //     },
    //     { new: true }
    //   );
    //     res.status(200).json({
    //       success: true,
    //       count: updatedOrder.length,
    //       data: updatedOrder
    //     });


    //unassign a delivery man 
    // const { orderId} = req.body;
    // const unassignDeliveryMan = await Order.findByIdAndUpdate(
    //       orderId,
    //       { 
    //         $set: { 
    //             deliveryDriverID: null, 
    //             status: 'preparing' 
    //           }
    //       },
    //       { new: true }   //return the new order after removing the delivery man 
    //     );
    //     res.status(200).json({
    //               success: true,
    //               data: unassignDeliveryMan
    //             });


    //assign a delivery man send the order id and driver id
    // const { orderId, deliveryManId} = req.body;
    // const assignDeliveryMan=await Order.findByIdAndUpdate(
    //     orderId,
    //     { 
    //       $set: { 
    //         deliveryDriverID: deliveryManId
    //       }
    //     },
    //     { new: true } // Return the updated document
    //   ).populate('deliveryDriverID', 'name phone vehicle');
    //   res.status(200).json({
    //                   success: true,
    //                   data: assignDeliveryMan
    //                 });


    // const { rating, someDriverId} = req.body;
    //    const driver = await Driver.findById(someDriverId);
    //     await driver.updateRating(rating ); 
    //     res.status(200).json({
    //         success: true,
    //         message: "Rating updated successfully",
    //         newRating: driver.rating,
    //         totalRatings: driver.ratingCount,
    //       });

    const { rating, someRestId} = req.body;
    const restaurant = await Restaurant.findById(someRestId);
    await restaurant.updateRating(rating ); 
    res.status(200).json({
                success: true,
                message: "Rating updated successfully",
                newRating: restaurant.rating,
                totalRatings: restaurant.ratingCount,
              });

    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ error: "There is an error", details: error.message})
    }
}

module.exports = testQueries;