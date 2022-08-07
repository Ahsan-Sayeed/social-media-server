const { createToken } = require('../middlewares/tokenGen');
const {myProfile} = require('../models/userProfile.models');
const jwt = require('jsonwebtoken');

exports.signUp = async(req,res)=>{
    try{
        const signupDoc = new myProfile({
            FullName:req.body.fullName,
            Email:req.body.email,
            Password:req.body.pwd
        });
        const result = await signupDoc.save();
        console.log(result);
        res.status(200).json(result);
    }
    catch(e){
        console.log(e);
    }
}

exports.login = async (req,res)=>{
   try{
    const query = await myProfile.find({Email:req.body.email});
    res.status(200).json({
        status:200,
        tk:createToken(query[0].id)
    });
   }
   catch(err){
    console.log(err)
   }
}


exports.profile = (req,res)=>{
    const token = req.body.tk;
    if(token!==undefined){
        jwt.verify(token,'this is a secret key',async(err,decodedToken)=>{
            try{
                 const profileInfo = await myProfile.find({_id:decodedToken.id});
                 res.status(200).send(profileInfo);
            }
            catch(err){
             console.log(err)
            }
         }) 
    }
}