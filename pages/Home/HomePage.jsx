import { Header } from '../../components/Header';
import './HomePage.css';
import { ProductsGrid } from './ProductsGrid';
export function Homepage({products,updateCart}){
  
  
return(
    <>
    <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
    <title>Ecommerce Project</title>
    <Header />

    <div className="home-page">
    <ProductsGrid products={products} updateCart={updateCart}/>
    </div>
    
  </>
  );
}

