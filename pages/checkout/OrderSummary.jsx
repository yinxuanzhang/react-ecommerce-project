import { CartItemdetails } from "./CartItemDetails";



export function OrderSummary({carts,products,deliveryoptions,updateCart,fetchPaymentSummary}){
  
  return(
    <>
    <div className="order-summary">
          {carts.map((cartItem)=>{
            
            const product=products.find((p)=>p.id===cartItem.productId);
            if (!product) {
              return null; // 或显示 loading
            }
            return(<CartItemdetails cartItem={cartItem} product={product} deliveryoptions={deliveryoptions} 
              updateCart={updateCart} fetchPaymentSummary={fetchPaymentSummary}/>);
          })}
        </div>
    </>
    )
}