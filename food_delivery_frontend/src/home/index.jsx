import Navibar from '../navibar';
import axios from 'axios';
import { useState,useEffect } from 'react';
import ProductCard from '../component/productCard';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './home.css';


const Home = ()=>{
   const {userId}= useParams();
    const navigate = useNavigate()
    const [product,setProduct]= useState([]);
    const [data,setData]= useState([]);
     const name = data.name
    const FetchData = async ()=> {
        const response = await axios.get("http://localhost:3000/products")
        const response1 = await axios.get(`http://localhost:3000/user/${userId}`)

        setProduct(response.data);
        setData(response1.data)
         
          } 
          console.log(data);
          
       useEffect(()=>{
        FetchData()
       },[])
       
    const blog=(id)=>{
  navigate(`/blog/${data._id}/${id}`)
    }
    const orders=()=>{
      navigate(`/orders/${data._id}`)
    }
    const profile=()=>{
      navigate(`/profile/${data._id}`)
    }
    return(
        <div className="home">
           <Navibar userOrders={orders} profile={profile}/>
          <div className="heading">
          <h1>Welcome back {name}!</h1>
          </div>
           <div className="home-body">
          
              {product.map((item,i)=>{
               return(
                  <ProductCard image ={item.image} name={item.name} price={item.price}
                  key={i} onClick={()=>blog(item._id)}
                  />
               )
               
              })
              }
           </div>
        </div>
    )
}
export default Home;