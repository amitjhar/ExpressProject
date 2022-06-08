const mongoose = require('mongoose')
const querySchema= mongoose.Schema({
    query:String,
    email:String,
    status:String
})
module.exports = mongoose.model('query',querySchema)
