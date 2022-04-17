const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    owner_id:{type:String},
    customer_name : {
        type : String,
    },
    customer_mobile :{
        type : String
    },
    items : [
        {
            item_name : {type:String},
            quantity :  {type:String},
            price : {type:Number},
            date : {type: String},
            time : {type:String}
        }
    ],
    transactions:[
        {
            paid:{type:Number},
            toBePaid:{type:Number},
            date : {type:Date},
            time : {type:String}
        }
    ],
    total : {type:Number}

},
    
{
    timestamps:true
}
)

module.exports = mongoose.model("Customers",CustomerSchema)