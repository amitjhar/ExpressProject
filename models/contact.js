const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    companyName:String,
    address:String,
    mobileNo:Number,
    phoneNo:Number,

})
module.exports = mongoose.model('contact',contactSchema)