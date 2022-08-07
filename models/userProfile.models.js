const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// create data type
const myProfileSchema = mongoose.Schema({
    FullName:String,
    Email:String,
    Password:String
});

//password hashing
myProfileSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.Password = await bcrypt.hash(this.Password,salt); 
    next();
});

// create table/collections
exports.myProfile = mongoose.model('myProfile',myProfileSchema);
