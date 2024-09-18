import { Schema,model } from "mongoose";

const productSchema = Schema({
    name:{
        type : String,
        require: true,
    },
    description :{
        type: String
    },
    image: {
        type : String
    },
    price :{
        type:Number,
        require:true
    },
    
})
const Product = model('product',productSchema);
export default Product;