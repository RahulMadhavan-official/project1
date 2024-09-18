import Navibar from '../navibar';
import Input from '../component/input';
import Button from '../component/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './login.css';


const Login=()=>{
  const id=''
  const navigate = useNavigate();
 const[user,setUser] = useState({
  contact:'' ,
  password :'',
 })
  const signup=()=>{
    navigate('/signup')
  }
  const onchange=(e,key)=>{
  if(key== 'contact') setUser({...user,contact:parseInt(e.target.value)})
    if(key== 'password') setUser({...user,password:e.target.value})
      
  }
  
  const login_click = async()=>{
      const response = await axios.post("http://localhost:3000/user/login",user)
      
     
      const { token } = response.data;
            // Store the token in localStorage or cookies
            localStorage.setItem('token', token);
            alert('Login successful!');
           
             navigate(`/home/${response.data.user._id}`)
      }
      console.log(user)
    return(
        <div className='login_main'>
         <div className="loginpage">
           <div className="navi">
           <h1>PIZZA HUB</h1>
           </div>
           <div className="login_box">
           <div className="login_body">
            <div className="login_head">
            <h1>Welcome to Pizza Hub</h1>
            </div>
           
            <div className="login_details">
              <Input placeholder='contact number' onChange={(e)=>onchange(e,'contact')}/>
              <Input placeholder='password'  onChange={(e)=>onchange(e,'password')} />
                <div className="button_login">
                    <Button onClick={login_click}>LogIn</Button>
                </div>
                <p className='signup_style'>if you don't have an account <span className='signup' onClick={signup}>SignUP</span></p>
            </div>
            
           </div>
           </div>
           
         </div>
        </div>
    )
}
export default Login;