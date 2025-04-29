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
        const { parameters } = req.body;

        console.log('parameters:', parameters);

        // NEVER FORGET AWAIT SINCE THIS WILL GIVE YOU A WEIRD ERROR ABOUT NOT BEING ABLE TO JSON OR SOMETHING LIKE THAT

        const result = await User.findById(parameters._id);


        res.status(200).json({ message: "sucess", result: result});
        console.log('result:', result);

    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ error: "There is an error", details: error.message})
    }
}

module.exports = testQueries;