import {Routes,Route} from 'react-router-dom';
import { Homepage } from '../pages/HomePage';
import {CheckoutPage}from'../pages/CheckoutPage'
import { Orders } from '../pages/Orders';
import { Tracking } from '../pages/Tracking';
import './App.css'

function App() {
  

  return (
   
    <Routes>
      <Route index element={<Homepage/>}/>
      <Route path='checkout' element={<CheckoutPage/>}/>
      <Route path='orders' element={<Orders />}/>
      <Route path='tracking' element={<Tracking />}/>
    </Routes>
    
  )
}

export default App
