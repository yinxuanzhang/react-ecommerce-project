import dayjs from 'dayjs';
import { moneyCount } from '../../utils/money';
import axios from 'axios';

export function OrderSummary({carts,products,deliveryoptions,updateCart,fetchPaymentSummary}){
  const chooseDeliveryOption=async({cartItem,deliveryOption})=>{
    await axios.put(`/api/cart-items/${cartItem.productId}`,
      { quantity:cartItem.quantity,
        deliveryOptionId: deliveryOption.id
       }
  )
      updateCart();
      fetchPaymentSummary();
  };
  const deleteProduct= async(cartItem)=>{
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    updateCart();
  }
  
  return(
    <>
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
                  <span className="delete-quantity-link link-primary" onClick={()=>deleteProduct(cartItem)}>
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
                    name={`delivery-option-${cartItem.productId}`}
                    onChange={()=>chooseDeliveryOption({cartItem,deliveryOption})}/>
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
    </>
    )
}