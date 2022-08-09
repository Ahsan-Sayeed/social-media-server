const express = require('express');
const { signUp, login, profile, findFriends, friendList } = require('../controllers/userProfile.controllers');
const routes = express.Router();
const {verify} = require('../middlewares/verify');
const cookieParser = require('cookie-parser');
routes.use(cookieParser());

//sign up
routes.post('/signup',signUp);
//sign in
routes.post('/login',verify,login);
//get profile info
routes.post('/profile',profile);

routes.post('/findfriends',findFriends);

routes.post('/friendlist',friendList);

module.exports = routes;