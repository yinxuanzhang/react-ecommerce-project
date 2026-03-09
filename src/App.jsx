import {Routes,Route} from 'react-router-dom';
import { Homepage } from '../pages/Home/HomePage';
import {CheckoutPage}from'../pages/checkout/CheckoutPage'
import { Orders } from '../pages/orders/Orders';
import{Tracking}from '../pages/Tracking/Tracking';
import { NotFoundPage } from '../pages/notFoundPage/NotFoundPage';
import axios from 'axios';
import{useEffect,useState}from 'react';
import './App.css'

function App() {
  const[products,setProducts]=useState([]);
  const [carts,setCarts]=useState([]);
  const updateCart=async()=>{
      const response=await axios.get('/api/cart-items');
      setCarts(response.data)
  }
   
  
  useEffect(()=>{
    const fetchAppData =async()=>{
      const response=await axios.get('/api/products');
      setProducts(response.data)

    };fetchAppData();updateCart();
   
  },[]);
 
  return (
   
    <Routes>
      <Route index element={<Homepage products={products} updateCart={updateCart} carts={carts}/>}/>
      <Route path='checkout' element={<CheckoutPage carts={carts} products={products} updateCart={updateCart}/>}/>
      <Route path='orders' element={<Orders updateCart={updateCart} carts={carts}/>}/>
      <Route path='tracking' element={<Tracking />}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    
  )
}

export default App
