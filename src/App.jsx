import {Routes,Route} from 'react-router-dom';
import { Homepage } from '../pages/HomePage';
import {CheckoutPage}from'../pages/checkout/CheckoutPage'
import { Orders } from '../pages/Orders';
import { Tracking } from '../pages/Tracking';
import { NotFoundPage } from '../pages/NotFoundPage';
import axios from 'axios';
import{useEffect,useState}from 'react';
import './App.css'

function App() {
  

  return (
   
    <Routes>
      <Route index element={<Homepage />}/>
      <Route path='checkout' element={<CheckoutPage/>}/>
      <Route path='orders' element={<Orders />}/>
      <Route path='tracking' element={<Tracking />}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    
  )
}

export default App
