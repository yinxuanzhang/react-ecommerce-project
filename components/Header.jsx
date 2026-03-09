import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
import { useSearchParams,useNavigate } from 'react-router-dom';


 export function Header({carts}){
  const cartsQuantity =carts ?carts.reduce((total,item)=>total+=item.quantity,0): 0;
  const navigate=useNavigate();
  const[searchParams]=useSearchParams(); //why?
  const searchFromUrl=searchParams.get('search');//why?
  const [search,setSearch]=useState(searchFromUrl || '');
  

    return(
    <>
      <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo"
            src="images/logo-white.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" 
          value={search} onChange={(event)=>{
            setSearch(event.target.value);
          }}
        />

        <button className="search-button" onClick={()=>{
          navigate(`/?search=${search}`)
        }}>
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{cartsQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
    </>);
  }
  
  
  
  