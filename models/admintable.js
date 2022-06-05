const mongoose = require('mongoose') //module


const admintableSchema= mongoose.Schema({
    username:String,
    password:String
})
module.exports= mongoose.model('admintable',admintableSchema);