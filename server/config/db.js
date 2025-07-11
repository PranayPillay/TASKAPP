const {Sequelize}=require('sequelize');
const sequelize=new Sequelize("taskdb","postgres","redhat",{
    host:"localhost",
    dialect:"postgres"
});

module.exports=sequelize;