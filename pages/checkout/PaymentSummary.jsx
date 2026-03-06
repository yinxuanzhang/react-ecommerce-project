import { moneyCount } from "../../utils/money";
import { Navigate, useNavigate } from 'react-router-dom';

import axios from "axios";
export function PaymentSummary({paymentSummary,cartCounts,updateCart}){
  const navigate=useNavigate();
  const createOrder=async()=>{
    await axios.post('/api/orders');
    updateCart();
    navigate('/orders');
  }
  return( <div className="payment-summary">

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

            <button className="place-order-button button-primary" onClick={createOrder}>
              Place your order
            </button>
        </div>
        );
}