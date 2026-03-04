import { Product } from "./Product";
export function ProductsGrid({products,updateCart}){
  
  return(
      <div className="products-grid">
      {products.map((productItem)=>{
        return(
          <Product productItem={productItem} updateCart={updateCart}/>
        );
    })}
    </div>
  );
}