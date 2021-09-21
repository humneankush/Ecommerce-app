const router = require("express").Router()

const User = require("../models/User")

const CryptoJs = require("crypto-js")

const {verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
    } = require("./verifyToken")

// Update User

    router.put("/:id", verifyTokenAndAuthorization,async (req,res)=>{
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
router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
       ! user && res.status(400).json("user not found")
       res.status(200).json("user has been deleted")    

    }catch(err){
        res.status(500).json(err)
    }
})


// get User

router.get("/find/:id",verifyTokenAndAdmin,async (req,res)=>{
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
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
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

router.get("/stats",verifyTokenAndAdmin,  async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports=router