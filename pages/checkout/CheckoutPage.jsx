import './CheckoutPage.css';
import { CheckoutHeader } from './CheckoutHeader';
import axios from 'axios';
import{useState,useEffect} from 'react';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({products,carts}){
  const cartCounts=carts.reduce((total,item)=>total+item.quantity,0);
  const [deliveryoptions,setDeliveryOptions]=useState([]);
  const[paymentSummary,setPaymentSummary]=useState([]);
  useEffect(()=>{
    const fetchCheckOutData=async()=>{
      let response=await axios.get('/api/delivery-options');
      setDeliveryOptions(response.data);

      response=await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    };
    fetchCheckOutData();
  },[]);

  return (
    <>
    <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
    <title>Checkout</title>
  
    <CheckoutHeader cartCounts={cartCounts}/>
    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
       <OrderSummary products={products} carts={carts} deliveryoptions={deliveryoptions}/>

       <PaymentSummary cartCounts={cartCounts} paymentSummary={paymentSummary}/>
      </div>
    </div>
    </>
  );
}
   
