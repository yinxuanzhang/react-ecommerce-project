import './CheckoutPage.css';
import { CheckoutHeader } from './CheckoutHeader';
import { moneyCount } from '../utils/money';
import axios from 'axios';
import{useState,useEffect} from 'react';
import dayjs from 'dayjs';

export function CheckoutPage({products,carts}){
  const cartCounts=carts.reduce((total,item)=>total+item.quantity,0);
  const [deliveryoptions,setDeliveryOptions]=useState([]);
  useEffect(()=>{
    axios.get('/api/delivery-options').then((response)=>{
      setDeliveryOptions(response.data);
    });
  });
  const[paymentSummary,setPaymentSummary]=useState([]);
  useEffect(()=>{
    axios.get('/api/payment-summary').then((response)=>{
      setPaymentSummary(response.data);
    })
  });

  return (
    <>
    <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
    <title>Checkout</title>
  
    <CheckoutHeader cartCounts={cartCounts}/>
    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        <div className="order-summary">
          {carts.map((cartItem)=>{
            
            const product=products.find((p)=>p.id===cartItem.productId);
            if (!product) {
              return null; // 或显示 loading
            }
            return(
              
            <div key={cartItem.id} className="cart-item-container">
              

            <div className="delivery-date">
              Delivery date:
            </div>

            <div key={cartItem.productId} className="cart-item-details-grid">
              <img className="product-image"
                src={product.image} />

              <div className="cart-item-details">
                <div className="product-name">
                  {product.name}
                </div>
                <div className="product-price">
                  ${moneyCount(product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {deliveryoptions.map((deliveryOption)=>{
                  return(
                  <div key={deliveryOption.id} className="delivery-option">
                  <input type="radio" checked={cartItem.deliveryOptionId===deliveryOption.id}
                    className="delivery-option-input"
                    name={`delivery-option-${deliveryOption.id}`}/>
                  <div>
                    <div className="delivery-option-date">
                      {`${dayjs().add(deliveryOption.deliveryDays,"day").format("dddd, MMMM D")}`}
                    </div>
                    <div className="delivery-option-price">
                      {deliveryOption.priceCents===0 ? "Free Shipping":`$${moneyCount(deliveryOption.priceCents)}`}
                    </div>
                  </div>
                    </div>
                  );
                })}

              </div>
            </div>
          </div>);
          })}
        </div>
          
        <div className="payment-summary">

            <div className="payment-summary-title">
              Payment Summary
            </div>

            <div className="payment-summary-row">
              <div>Items ({cartCounts}):</div>
              <div className="payment-summary-money">${moneyCount(paymentSummary.productCostCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">${moneyCount(paymentSummary.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">${moneyCount(paymentSummary.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">${moneyCount(paymentSummary.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">${moneyCount(paymentSummary.totalCostCents)}</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
        </div>
      </div>
    </div>
    </>
  );
}
   
