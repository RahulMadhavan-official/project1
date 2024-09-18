import Navibar from '../navibar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Button from '../component/button';
import { useState } from 'react';
import './order.css';

const Order = ()=>{
  let j =0
  const count = 0
    const {userId} = useParams();
    const navigate = useNavigate();
    const [orders,setOrders] = useState({
      user: '',
      products: [{
            image: ' ',
            productname : '',
            description: ' ',
            price : ' ',
            id: ' '
      }],
      quantity : '',
      totalprice : '',
      address : ' '
    })
    const [orderlist,setOrderlist] = useState([])
    const [user,setUser]= useState({
      name : '',
      location : '',
      email : ' ',
      contact : '',
      id : ''
    })
    
    const FetchData=async()=>{  
     const response2 = await axios.get(`http://localhost:3000/user/${userId}`)
     setUser({
         name: response2.data.name,
         location: response2.data.location,
         email: response2.data.email,
         contact: response2.data.contact,
         pincode: response2.data.pincode,
         id : response2.data._id
     })
     const response = await axios.get(`http://localhost:3000/orderlist/${userId}`)
      setOrderlist(response.data)
     //const response1 = await axios.get(`http://localhost:3000/products/${id}`)
      //
      
    }
    
    
 
    useEffect(()=>{
      FetchData()
    },[]);
    
    const homepage=()=>{
      navigate(`/home/${userId}`)
    }
    const userOrders=()=>{
      navigate(`/orders/${userId}`)
    }
    const new_address=()=>{
      navigate(`/address/${userId}`);
      
    }
    const placeOrder=async()=>{
      const response = await axios.post(`http://localhost:3000/order/neworder`,orderlist)
      const response1 = await axios.delete(`http://localhost:3000/orderlist/${userId}`)
      location.reload()
    }
    return(
        <div className='orderpage'>
         <div className="navigation">
         <Navibar homepage={homepage} userOrders={userOrders}/>
         </div>
         <div className="orderlist_heading">
            <h1>Hy {user.name.toUpperCase()}, your Orders are here!</h1> 
            </div>
            <div className="orderbody">
         <div className="order_body">
        {orderlist.map((item,i)=>{  
                 
                return(
                <div className="orderlist_model" key={i}>
                        
                        <div className="orderlist_productname">
                        <img src={item.products.image} alt="" />
                        <h1 >{item.products.productname}</h1>
                        <p>X</p>
                         <p >{item.quantity}</p>
                         <p>₹{item.totalprice}</p>
                        </div>
                        
         
                </div>)
                })} 
                               
         </div >
           <div className="totalsum">
           <div className="order_contact">
                        <p>address : {user.location}</p>
                        <br />
                        <p>contact : {user.contact}</p>
                        <br />
                        <p>pincode : {user.pincode}</p>
                        <br />
                       <Button onClick={new_address}>Change</Button>
              </div>
              <br />
              <br />
              <br />
            <div className="sum">
              <h1>Price details</h1>
              {orderlist.map((item,i)=>{
                j = Number(item.totalprice)+j
              })}
              <br />
              <p>price({orderlist.length} item) : ₹{j}</p>
              <br />
              <p>delivery Charge : ₹25</p>
              <br />
              <p>total price : ₹{j}</p>
              <br />
              <br />
              <Button onClick={placeOrder}>place order</Button>
            </div>
           </div>
         </div>
        
        </div>
    )
}
export default Order;