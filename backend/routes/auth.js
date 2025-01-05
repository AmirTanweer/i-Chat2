const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { check, validationResult, body } = require("express-validator");

//Route 1 - Create a user using: POST "/api/auth". No login required
router.post('/register',[
    body('username',"Username must be atleast 3 character").isLength({min:3}),
    body('email','Email must be valid').isEmail(),
    body('password',"Password must be atleast 8 character").isLength({min:8})
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
    const {username,email,password}=req.body;
        let user = await User.findOne({email});
        
        if(user){
            return res.status(400).json({errors: [{msg:"User already exists"}]});
        }
        let salt= await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(password,salt);

        user =new User({
            username:username,
            email:email,
            password:hashedPass
        });
       await user.save();

        res.status(200).json({
            message:"Successfully registered",
            user:user
        })
        
    }

    catch(error){
        console.error(error); // Log error for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
})
//Router 2 - Login a User using POST "/api/auth/login" No login Required
router.post('/login',async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
         const {email,password}=req.body;
         let user=await User.findOne({email});
         if(!user){
            return res.status(403).json({error:"Unauthorised Access"})
         }
          const isvalid= await bcrypt.compare(password,user.password)
          if(!isvalid){
            return res.status(403).json({error:"Unauthorised Access"})
          }
          const payload={
            user:{
                id:user.id
            }
          }
          const token=jwt.sign(payload,process.env.SECRET,{ expiresIn: '1h' });
          res.status(200).json({
            message:"Successfully LoggedIn",
            token:token
          })

    }
    catch(error){
        console.error(error); // Log error for debugging
res.status(500).json({ error: "Internal Server Error" });
    }
})
module.exports=router