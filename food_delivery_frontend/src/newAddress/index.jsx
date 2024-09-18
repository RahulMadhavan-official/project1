import Navibar from '../navibar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Input from '../component/input';
import Button from '../component/button';
import { useState } from 'react';
import './address.css';

const Address=()=>{
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
    const [address,setAddress] = useState({
        name :'',
        location: '',
        email : ' ',
        contact: '',
        pincode:''
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
    
    
  console.log(orderlist)
    useEffect(()=>{
      FetchData()
    },[]);
    
    const homepage=()=>{
      navigate(`/home/${userId}`)
    }
    const userOrders=()=>{
      navigate(`/orders/${userId}`)
    }
    const onChange=(e,key)=>{
        if(key == 'name')setAddress({...address,name:e.target.value})
        if(key == 'contact')setAddress({...address,contact:parseInt(e.target.value)})
        if(key == 'email')setAddress({...address,email:e.target.value})
        if(key == 'location')setAddress({...address,location:e.target.value})
        if(key == 'pincode')setAddress({...address,pincode:parseInt(e.target.value)})
    }
    const new_address=async()=>{
      const response = await axios.patch(`http://localhost:3000/user/${userId}`,address)
      navigate(`/orders/${userId}`)
    }
    return(
        <div className='orderpage'>
         <div className="navigation">
         <Navibar homepage={homepage} userOrders={userOrders}/>
         </div>
         <div className="orderlist_heading">
            <h1>Hy {user.name.toUpperCase()}, your Orders are here!</h1> 
            </div>
            <div className="orderbody_address">
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
                       <Button >Change</Button>
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
              <p>discount(5%) : ₹{(j*5)/100}</p>
              <br />
              <p>delivery Charge : ₹25</p>
              <br />
              <p>total price : ₹{j-((j*5)/100)+25}</p>
              <br />
              <br />
              <Button>place order</Button>
            </div>
           </div>
          
         </div>
          <div className="new_address_form">
            <h1>Delivery Location</h1>
           <div className="address_details">
                        <Input placeholder='name' onChange={(e)=>onChange(e,'name')}/>
                        <Input placeholder='location address'  onChange={(e)=>onChange(e,'location')}/>
                        <Input placeholder='pincode' onChange={(e)=>onChange(e,'pincode')}/>
                        <Input placeholder='contact number'  onChange={(e)=>onChange(e,'contact')}/>
                        <Input placeholder='email'  onChange={(e)=>onChange(e,'email')}/>
                        
                        <br />
                        <br />
                        <Button onClick={new_address}>Change Address</Button>
                    </div>
        </div>
        </div>
    )
}
export default Address;