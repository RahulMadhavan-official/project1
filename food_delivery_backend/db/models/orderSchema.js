import { Schema,model } from "mongoose";

const orderSchema =Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref : 'user'
    },
    products: [{
        name:{
            type : String,
            require: true,
        },
        image: {
            type : String
        },
        price :{
            type:Number,
            require:true
        },
        quantity: {
            type : String
        },
        id :{
            type : String
        }
    }],
    address :{
        type : String,
    },
    contact : {
        type :String
    },
    pincode :{
        type : String
    },
    quantity: {
        type : String
    },
    totalprice: {
        type :Number
    }
})
const Order = model('order',orderSchema);
export default Order;