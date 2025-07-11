const {DataTypes}=require('sequelize')
const sequelize=require('../config/db')
const User = require("./User");
const Task=sequelize.define('Task',{
title:
{
    type:DataTypes.STRING,
    allowNull:false
},
description:
{
    type:DataTypes.STRING
}
});


User.hasMany(Task)
Task.belongsTo(User)

module.exports=Task;