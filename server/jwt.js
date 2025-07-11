const jwt=require('jsonwebtoken');

//verify the token

const jwtauthenticationmiddleware=(req,res,next)=>
{

    const authorization=req.headers.authorization;
    if(!authorization) return res.status(401).json({error:'authorization header missing'});

    const token=authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'token missing'})

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next()
    }
    catch(err)
    {
        console.error(err)
        res.status(401).json({error:'invalid token'})
    }

}


//generate token

const generatetoken=(userdata)=>
{
    return jwt.sign(userdata,process.env.JWT_SECRET);
}

module.exports={jwtauthenticationmiddleware,generatetoken};