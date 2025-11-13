const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const SECRET = "your_jwt_secret";

// Middleware to authenticate user
function auth(req,res,next){
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) return res.status(401).json({error:"Unauthorized"});
    try{
        const decoded = jwt.verify(token,SECRET);
        req.userId = decoded.id;
        next();
    }catch(err){
        res.status(401).json({error:"Invalid token"});
    }
}

// Place order
router.post('/', auth, async (req,res)=>{
    const {products,total} = req.body;
    const order = new Order({userId:req.userId,products,total});
    await order.save();
    res.json({message:"Order placed successfully"});
});

// Get user orders
router.get('/', auth, async (req,res)=>{
    const orders = await Order.find({userId:req.userId});
    res.json(orders);
});

module.exports = router;
