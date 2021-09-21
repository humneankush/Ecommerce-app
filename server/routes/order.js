const Product = require('../models/Product')

const {verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require('./verifyToken')