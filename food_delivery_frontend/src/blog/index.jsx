import { useState,useEffect } from 'react';
import Navibar from '../navibar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './blog.css';

const Blog =()=>{
    const navigation = useNavigate();
    const {userId,id}=useParams();
    const [count,setCount] = useState(1)
    const [order,setOrder] = useState([{
        user: '',
        products: {
              image: ' ',
              productname : '',
              price : ' ',
              id: ' '
        },
        quantity : '',
        totalprice : '',
        address : ' '
    }]);
    const [data,setData] = useState({
        image: '',
        productname: '',
        description: '',
        price: '',
        id : ''
    })
    const FetchData =async()=>{
          const response = await axios.get(`http://localhost:3000/products/${id}`)
          const response1 = await axios.get(`http://localhost:3000/user/${userId}`)
          setData({
            image: response.data.image,
            productname : response.data.name,
            description: response.data.description,
            price : response.data.price,
            id: response.data._id
          });
          setOrder({
            user : response1.data._id,
            products: {
            image: response.data.image,
            productname : response.data.name,
            price : response.data.price,
            id: response.data._id
      },
      totalprice :response.data.price,
      contact: response1.data.contact,
      quantity : 1,
      address :  response1.data.location,
      
            
      })
          
          //console.log(response1.data);
    }
   
    
    useEffect(()=>{
        FetchData()
    },[])
    const decrement=()=>{
        if(count>1){
         setCount(count-1)
         setOrder({...order,
            quantity : count-1,
            totalprice :( order.products.price) * (count-1)
         })
        }
       }
       const increment=()=>{
        if(count<6){
            setCount(count + 1)
            setOrder({...order,
               quantity: count+1,
               totalprice : (order.products.price) * (count+1)
            })}
       }
    const onClick=async()=>{
     const response = await axios.post(`http://localhost:3000/orderlist/orders`,order)
     
     navigation(`/orders/${userId}`)
    }
    const homepage=()=>{
        navigation(`/home/${userId}`)
      }
      const userOrders=()=>{
        navigation(`/orders/${userId}`)
      }
    console.log(order);
    return(
        <div className="main">
             <Navibar homepage={homepage} userOrders={userOrders}/>
                 <div className="blog-page">
                   
                    <div className='style'>
                    <img src={data.image} alt="" />
                    </div>

                    <div className="style-body">
                    <h1>{data.name}</h1>
                    
                    <h1>Price : $ {data.price}</h1>
                    <p>{data.description}</p>

                    <div className="count">
                    <button onClick={decrement}  >-</button>
                      <p >{count}</p>
                      <button onClick={increment}>+</button>
                    </div>
                    <br />
                    <br />
                    <div className="button">
                    <button className='btn' onClick={onClick}>BUY NOW</button>
                    </div>
                    </div>

                    </div>
        </div>
        
    )
}   
export default Blog;