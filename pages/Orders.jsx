import { Header } from "../components/Header";
import { NavLink } from "react-router-dom";
import { useState,useEffect,Fragment } from "react";
import axios from "axios";
import dayjs from "dayjs";
import'./Orders.css'

export function Orders(){
  const[orders,setOrders]=useState([]);
  useEffect(()=>{
      axios.get('/api/orders?expand=products').then((response)=>{
        setOrders(response.data);
      });
  },[]);
  return(
    <>
    <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
    <title>orders</title>
    <Header/>
    

    <div className="orders-page">
      <div className="page-title">Your orders</div>

      <div className="orders-grid">
        {orders.map((order)=>{
          return(
          <div key={orders.id} className="order-container">

          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Orders Placed:</div>
                <div>{order.ordersTimes}</div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>${(order.totalCostCents/100).toFixed(2)}</div>
              </div>
            </div>

            <div className="order-header-right-section">
              <div className="order-header-label">Orders ID:</div>
              <div>{order.id}</div>
            </div>
          </div>

          <div className="order-details-grid">
            {order.products.map((productItem)=>{
              return(
                <Fragment key={productItem.productId}>
                <div className="product-image-container">
                <img src={productItem.product.image} />
                </div>

                <div className="product-details">
                  <div className="product-name">
                    {productItem.product.name}
                  </div>
                  <div className="product-delivery-date">
                    Arriving on: {dayjs(productItem.estimatedDeliveryTimeMs).format('MMMM D')}
                  </div>
                  <div className="product-quantity">
                    Quantity: {productItem.quantity}
                  </div>
                  <button className="buy-again-button button-primary">
                    <img className="buy-again-icon" src="images/icons/buy-again.png" />
                    <span className="buy-again-message">Add to order</span>
                  </button>
                </div>

                <div className="product-actions">
                  <NavLink to="/tracking">
                    <button className="track-package-button button-secondary">
                      Track package
                    </button>
                  </NavLink>
                </div>
            </Fragment>)
            })}
           


          </div>
        </div>
          );
        })}


 
      </div>
    </div>
    </>
  );
}