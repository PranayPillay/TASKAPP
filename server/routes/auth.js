const express=require('express');
const router=express.Router();
const User=require('../models/User')
const Task=require('../models/Tasks')
const {generatetoken}=require('../jwt');
const dirname='C:\Users\Pranay\Desktop\Project\client\app-ui\src\Pages'
router.post("/signup",async(req,res)=>
{
    try{
    const {username,email,password}=req.body;
    const newUser=await User.create({username,email,password});

    const payload={
        id:newUser.id,
        username:newUser.username
    }

    const token=generatetoken(payload);
    res.json({token});
}
catch(err)
{
    console.error(err)
    res.status(401).json({error:'user already exists or invalid data entered'})
}
})

router.post("/login",async(req,res)=>
{
    try
    {
    const {username,password}=req.body
    const user=await User.findOne({where:{username}})
    if(!user || !(await user.comparePassword(password)))
    {
        return res.status(401).json({error:'invalid username or password'})
    }

    const payload={
        id:user.id,
        username:user.username
    }

    const token=generatetoken(payload);
    res.json({token})
    
    
}
catch(err)
{
    console.error(err)
    res.status(500).json({error:'internal server error'})
}
})


module.exports=router;