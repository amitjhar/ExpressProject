const mongoose = require('mongoose')

const userSchema  = mongoose.Schema({
    username:String,
    password:String,
    status:String,
    role:String,
});

module.exports = mongoose.model('user',userSchema)