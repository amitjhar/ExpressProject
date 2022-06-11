const mongoose = require('mongoose') // module

const headertableSchema= mongoose.Schema({
    title:String,
    shortDes:String,
    longDes:String,
    image:String,
});
    module.exports = mongoose.model('headertable',headertableSchema)
