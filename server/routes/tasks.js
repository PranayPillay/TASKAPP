const express=require('express');
const router=express.Router();
const Task=require('../models/Tasks')
const {jwtauthenticationmiddleware}=require('../jwt');
const { where } = require('sequelize');

//creating items
router.post('/create',jwtauthenticationmiddleware,async(req,res)=>
{
    try{
    const {title,description}=req.body;

    const newtask=await Task.create({title,description,UserId:req.user.id});
    res.json(newtask)
    }
    catch(err)
    {
        console.error(err);
        res.status(401).json({error:'error creating task'})

    }
})

//viewing list of task
router.get('/view',jwtauthenticationmiddleware,async(req,res)=>
{
    try{

        const tasks = await Task.findAll({ where: { UserId: req.user.id } });
        const plainTasks = tasks.map(task => task.get({ plain: true }));
        res.json(plainTasks);
        console.log("task is:",plainTasks)
    }
    catch(err)
    {
        console.error(err);
        res.status(401).json({error:'error viewing list'})
        
    }
})

//updating or editing tasks

router.put('/update/:id',jwtauthenticationmiddleware,async(req,res)=>
{
    try{
    const task=await Task.findOne({where:{id:req.params.id,UserId:req.user.id}})
    if(!task) return res.status(401).json({error:'task not found'})
    task.title=req.body.title;
    task.description=req.body.description;
    await task.save();
    res.json(task)
}
catch(err)
{
    console.error(err)
    res.status(401).json({error:'error updating task'})
}
})



//deleting task
router.delete('/delete/:id',jwtauthenticationmiddleware,async(req,res)=>
{
    try{
    const task=await Task.findOne({where:{id:req.params.id,UserId:req.user.id}})
    if(!task) return res.status(401).json({error:'task not found'})
    await task.destroy();
    res.json({message:'task deleted successfully'})
}
catch(err)
{
    console.error(err)
    res.status(401).json({error:'error deleting the task'})
}    
})

module.exports=router