const mongoose = require('mongoose')

const OwnerSchema = new mongoose.Schema({
    shop_name :{
        type:String,
        required:true
    },
    owner_name : {
        type : String,
        required : true
    },
    email:{
        type:String,
        required:true
    },
    password : {
        type : String,
        required : true
    },
    confirm_password : {
        type:String,
        required:true
    },
    items:[{
        item_name: {type:String},
        quantity : {type:String},
        price : {type:Number},
        date : {type:String},
        customer_name:{type:String}
    }],
},
{
    timestamps:true
}
)



module.exports = mongoose.model("Owner",OwnerSchema)