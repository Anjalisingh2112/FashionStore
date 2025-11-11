const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = "your_jwt_secret";

// Register
router.post('/register', async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const user = new User({name,email,password});
        await user.save();
        res.status(201).json({message:'User registered successfully'});
    } catch(err){
        res.status(400).json({error: err.message});
    }
});

// Login
router.post('/login', async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({error:"User not found"});
        const valid = await bcrypt.compare(password,user.password);
        if(!valid) return res.status(400).json({error:"Invalid password"});
        const token = jwt.sign({id:user._id},SECRET,{expiresIn:'1d'});
        res.json({token,user:{id:user._id,name:user.name,email:user.email}});
    } catch(err){
        res.status(500).json({error:err.message});
    }
});

module.exports = router;


