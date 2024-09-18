import Input from "../component/input";
import Navibar from "../navibar";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import './signup.css';

const Signup=()=>{
    const navigate = useNavigate()
    const [data,setData] = useState({
        name: '',
        location:'',
        contact: '',
        email: '',
        pincode: '',
        password: '',
        confirmPassword : ''
    })
    const onChange=(e,key)=>{
      if(key == 'name') setData({...data,name:e.target.value})
      if(key == 'location') setData({...data,location:e.target.value})
      if(key == 'pincode') setData({...data,pincode:parseInt(e.target.value)})
        if(key == 'contact') setData({...data,contact:parseInt(e.target.value)})
            if(key == 'email') setData({...data,email:e.target.value})
                if(key == 'password') setData({...data,password:e.target.value})
                    if(key == 'confirmPassword') setData({...data,confirmPassword:e.target.value})
    }
    const onClick=async()=>{
       try{
        const response = await axios.post("http://localhost:3000/user/signup",data)
        alert('sucessfully signUp')
        navigate('/')
       }catch(e){
        return( alert("Invalid email Or contact"))
       }
    }
    
    return(
        <div className="signup_main">
            <div className="signup_box">
                <div className="signup_body">
                    <div className="signup_head">
                        <h1>Welcome to the world of <span style={{color:'red'}}>PIZZA</span></h1>
                    </div>
                    <br />
                    <div className="signup_details">
                        <Input placeholder='name' onChange={(e)=>onChange(e,'name')}/>
                        <Input placeholder='location address'onChange={(e)=>onChange(e,'location')}/>
                        <Input placeholder='pincode' onChange={(e)=>onChange(e,'pincode')}/>
                        <Input placeholder='contact number'onChange={(e)=>onChange(e,'contact')}/>
                        <Input placeholder='email' onChange={(e)=>onChange(e,'email')}/>
                        <Input placeholder='passsword' onChange={(e)=>onChange(e,'password')}/>
                        <Input placeholder='confirm passsword' onChange={(e)=>onChange(e,'confirmPassword')}/>
                        <br />
                        <br />
                        <Button onClick={onClick}>SignIn</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup;
