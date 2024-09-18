import Home from '../home';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import './navibar.css';

const Navibar=(props)=>{
  const{userId}= useParams();
  const navigate = useNavigate();

  const homepage=async()=>{
     

   navigate(`/home/${userId}`)
  }
  const orderpage =()=>{
   // navigate(`/orders/${userId}`);
  }
  const loginpage=()=>{
    navigate('/login')
  }
    return(
        <div className="navi">
          <div className="body">
            <div className="heading">
                <h1>PIZZA HUB</h1>
            </div>
            <div className="menu">
                <h2 onClick={props.homepage} className='click'>Home</h2>
                <h2 onClick={props.userOrders} className='click'>orders</h2>
                <h2 className='click'>help support</h2>
               
            </div>
          </div>
        </div>
    )
}
export default Navibar;