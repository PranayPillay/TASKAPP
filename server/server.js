const express=require('express');
const cors=require('cors')
const app=express();
app.use(cors());
const sequelize=require('./config/db')
const authroutes=require('./routes/auth');
const taskroutes=require('./routes/tasks');
require("dotenv").config();
const PORT=process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth',authroutes);
app.use('/api/tasks',taskroutes);

app.get('/',(req,res)=>
{
    res.send("hello world")
})

sequelize.sync({ alter: true }).then(()=>{
    app.listen(PORT,()=>
    {
        console.log(`server is listening on port:${PORT}`)
    });
});





