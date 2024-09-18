import { Schema,model } from "mongoose";

const orderlistSchema =Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref : 'user'
    },
    products: {
        productname:{
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
        id :{
            type : String,
        }
    },
    address :{
        type : String,
    },
    contact:{
        type : String
    },
    totalprice :{
        type : Number
    },
    quantity :{
        type :Number,
    },
   
})
const Orderlist = model('orderlist',orderlistSchema);
export default Orderlist;