const router  = require('express').Router()

const User = require('../models/User')

const CryptoJs = require('crypto-js')

const jwt = require('jsonwebtoken')



// Register route
router.post("/register",async (req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()    
    })

    try{
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json(err)
    }

})

// Login route
router.post("/login",async (req,res)=>{
   
    try {
        const user  = await User.findOne({email:req.body.email})
        !user && res.status(400).json("user not found wrong credentials")
    
        const hashedPassword = CryptoJs.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        )
    
            const OriginalPassword  = hashedPassword.toString(CryptoJs.enc.Utf8)
    
            OriginalPassword != req.body.password && res.status(401).json("wrong password")

            const accessToken = jwt.sign(
                {
                    id:user._id,
                    isAdmin:user.isAdmin
                },
                process.env.JWT_SEC,
                {expiresIn:"3d"}
            )

            const {password,...others} = user._doc

            res.status(200).json({...others,accessToken})
    
    
    } catch (err) {
        res.status(500).json({err:err.message})
        
    }



})


module.exports =  router;