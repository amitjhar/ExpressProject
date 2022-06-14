const mongoose = require('mongoose')

const parkingSchema= mongoose.Schema(
    {
        vno:String,
        vtype:String,
        vin:Date,
        vout:Date,
        amount:Number,
    }
)

module.exports = mongoose.model('parkin',parkingSchema)