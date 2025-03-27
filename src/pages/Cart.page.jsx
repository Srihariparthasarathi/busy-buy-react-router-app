
import CartItem from "../components/CartItme.component";
import CartPlaceOrder from "../components/CartPlaceOrder.component";

import useCartState from "../hooks/useCartState.hooks";

const Cart = () =>{
 const {cartItems, cartTotalPrice, handlePurchase} = useCartState();
    
    return(
        <div className="cart-page">
            <div className="card">
                <CartPlaceOrder cartTotalPrice={cartTotalPrice} handlePurchaseBtnClick={handlePurchase}/>
            </div>
            <div className="cart-items-container">
                {cartItems.map((item, index) => <CartItem data={item} key={index}/>)}
            </div>
        </div>
    )
}

export default Cart;