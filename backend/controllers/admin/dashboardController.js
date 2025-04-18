// const Admin = require('../../models/Admin')
const Driver = require('../../models/Driver')
const Restaurant = require('../../models/Restaurant')
const Order = require('../../models/Order')
const Product = require('../../models/Product')

const banUser = async (req, res) => { 
    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const banRestaurant = async (req, res) => {
    
    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const banDriver = async (req, res) => {
    
    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const sendwarningToUser = async (req, res) => {
    
    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const sendWarningToDriver = async (req ,res) => {
    
    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const sendWarningToRestaurant = async (req, res) => {
    
    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const unBanUser = async (req, res) => {
    
    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const unBanDriver = async (req, res) => {
    
    res.status(505).json({
        errror: "Not implmented yet"
    })
}

const unBanRestaurant = async (req, res) => {
    
    res.status(505).json({
        errror: "Not implmented yet"
    })
}

module.exports = {
    sendwarningToUser,
    banUser,
    unBanUser,
    sendWarningToDriver,
    banDriver,
    unBanDriver,
    sendWarningToRestaurant,
    banRestaurant,
    unBanRestaurant,   
}