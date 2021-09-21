const Product = require('../models/Product')

const {verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require('./verifyToken')

const router  = require('express').Router()


// CREATE PRODUCT

router.post("/",(req,res)=>{

})

// UPDATE PRODUCT
router.update("/id",(req,res)=>{
    
})


// DELETE PRODUCT
router.delete("/:id",(req,res)=>{
    
})


// GET PRODUCT
router.get("/find/:id",(req,res)=>{
    
})


// GET ALL PRODUCT

router.get("/",(req,res)=>{
    
})




module.exports =  router;
