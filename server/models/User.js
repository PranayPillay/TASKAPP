const {DataTypes}=require('sequelize')
const sequelize=require('../config/db')
const bcrypt=require('bcryptjs')

const User=sequelize.define('User',{
    username:
    {
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    }
    ,
    email:
    {
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    }
    ,
    password:
    {
        type:DataTypes.STRING,
        allowNull:false
    }
});


User.beforeCreate(async(user)=>
{
    user.password=await bcrypt.hash(user.password,10)

});

User.prototype.comparePassword=async function(plainPassword)
{
    return await bcrypt.compare(plainPassword,this.password)
};


module.exports=User

