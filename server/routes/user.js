const router = require("express").Router()

const User = require("../models/User")

const CryptoJs = require("crypto-js")

// Update User

router.put("/:id",async (req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJs.AES.encrypt(
            req.body.password,
            req.body.process.env.PASS_SEC
        ).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
        
    }
})

// Delete User


// get User

router.get("/:id",async (req,res)=>{
        try {
            const user = await User.findById(req.params.id)
    
       ! user && res.status(400).json("user not found")
       const {password,...others}  = user._doc
       res.status(200).json(others)    
        } catch (error) {
            res.status(500).json(error)
        }
})


// get all user User
router.get("/",async(req,res)=>{
    const query = req.query.new;

    try {
        const users= query
        ? await User.find().sort({id:-1}).limit(5)
        :await User.find()


        res.status(200).json(users)
        
    } catch (error) {
        
    }
})


// get User stats


// Update User


module.exports=router