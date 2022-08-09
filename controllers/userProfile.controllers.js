const { createToken } = require('../middlewares/tokenGen');
const {myProfile} = require('../models/userProfile.models');
const {FriendList} = require('../models/userFriendList');
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


exports.findFriends = async(req,res)=>{
    // const friends =  await myProfile.find({_id:{$ne:'62ed69f1c5f75f4fd4bff05f'}}).select({FullName:1});
    // res.status(200).send(friends);
    const token = req.body.tk;
    if(token!==undefined){
        jwt.verify(token,'this is a secret key',async(err,decodedToken)=>{
            try{
                 const friends = await myProfile.find({_id: {$ne:decodedToken.id}}).select({FullName:1});
                 res.status(200).send(friends);
            }
            catch(err){
             console.log(err)
            }
         }) 
    }
}

exports.friendList = async(req,res)=>{
   try{
        const _id = req.body.id;
        const friendsProfile = await myProfile.find({_id}).select({FullName:1});
        const FriendListDoc = FriendList({
            Friends:[
                {
                FriendsId:friendsProfile[0].id,
                FriendsName:friendsProfile[0].FullName
                }
            ]
        });
        const result = await FriendListDoc.save();
        res.status(200).send(result);
        console.log(result);
   }
   catch(err){
    console.log(err)
   }
}

///fake doc
const check = async()=>{
    try{
        const FriendListDoc = FriendList({_id:'62f1636df74a1edcb132e652'},
       
                {$set:{
                FriendsId:'1234',
                FriendsName:'don2'
                }}
    
        );
        // const result = await FriendListDoc.save();
        console.log(FriendListDoc)
    }
    catch(err){
        console.log(err)
    }
}
// check();
const findIDS = async()=>{
    const findby = await FriendList.find({_id:'62f1636df74a1edcb132e652'});
    console.log(findby);
}
// findIDS();
