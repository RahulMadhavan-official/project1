import { Schema,model } from "mongoose";

const userSchema = Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    contact:{
        type : Number,
        require : true
    },
    email:{
        type:String,
        require:true,
       
    },
    pincode:{
        type : Number,
        require:true
    },
    password:{
        type:String,
        required:true
    },

})
const User = model('user',userSchema);
export default User;