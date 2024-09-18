import { Routes,Route } from 'react-router-dom'
import Home from './home'
import Blog from './blog'
import Order from './order'
import Login from './loginPage'
import Signup from './signupPage'
import Address from './newAddress'

import './App.css'

const App=()=> {

  return (
    <>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/blog/:userId/:id' element={<Blog/>}/>
      <Route path='/address/:userId' element={<Address/>}/>
      <Route path='/orders/:userId' element={<Order/>}/>
      
      <Route path='/home/:userId' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>

     </Routes>
    </>
  )
}

export default App
