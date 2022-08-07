const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { myProfile } = require("../models/userProfile.models");
exports.verify = async (req, res, next) => {
  try {
    const query = await myProfile.find({ email: req.body.email });
    const hashedPwd = query[0].Password;
    const check = await bcrypt.compare(req.body.pwd, hashedPwd);
    // res.cookie('jwt',createWebToken(query[0].id),{maxAge: 1000*60*60*24,httpOnly:true});
    // console.log(req.cookie);
    if (check) {
      // createWebToken(query[0].id,res);
      next();
    } else {
      res.status(400).json({
        status: 400,
      });
      console.log("Wrong password");
    }
  } catch (err) {
    console.log(err);
  }
};

// const createWebToken =(id,res)=>{
//     const token = jwt.sign({id},'secretKey',{expiresIn:1000000});
//     res.cookie('jwt',token,{maxAge: 1000*60*60*24,httpOnly:true});
// }
