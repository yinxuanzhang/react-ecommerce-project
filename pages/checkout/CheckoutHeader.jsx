import './checkout-header.css';
import { Link } from 'react-router-dom';
export function CheckoutHeader(){
  return(<>
  
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
         <Link href="/">
            <img class="logo" src="images/logo.png" />
            <img class="mobile-logo" src="images/mobile-logo.png" />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<Link className="return-to-home-link"
            href="/">3 items</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" />
        </div>
      </div>
</div>
</>);
}


