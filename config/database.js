const {db} = require('./config');
const mongoose = require('mongoose');
mongoose.connect(db)
.then(()=>console.log('database connected'))
.catch((err)=>console.log('database connection failed '+err));