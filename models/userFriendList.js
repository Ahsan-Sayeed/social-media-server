const mongoose = require('mongoose');

const FriendListSchema = mongoose.Schema({
    Friends:[{
    FriendsId:String,
    FriendsName: String
    }]
});

exports.FriendList = mongoose.model('FriendList',FriendListSchema);