const Driver = require('../../models/Driver')
const Restaurant = require('../../models/Restaurant')
const Order = require('../../models/Order')

const getAllOrders = async (req ,res) => {
    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const acceptOrder = async (req, res) => {
    res.status(505).json({
        errror: "Not implmented yet"
    })
}

module.exports = {
    getAllOrders,
    acceptOrder
}