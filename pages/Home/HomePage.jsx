import { Header } from '../../components/Header';
import './HomePage.css';
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function Homepage({updateCart,carts}){
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const [products, setProducts] = useState([]);

  useEffect(() => {

    async function loadProducts() {

      // 根据 search 决定 API
      const url = search
        ? `/api/products?search=${search}`
        : `/api/products`;

      const response = await axios.get(url);

      setProducts(response.data);
    }

    loadProducts();

  }, [search]);
return(
    <>
    <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
    <title>Ecommerce Project</title>
    <Header carts={carts}/>

    <div className="home-page">
    <ProductsGrid products={products} updateCart={updateCart}/>
    </div>
    
  </>
  );
}

