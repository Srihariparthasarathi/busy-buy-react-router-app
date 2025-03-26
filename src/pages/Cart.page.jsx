
import CartItem from "../components/CartItme.component";
import useCartState from "../hooks/useCartState.hooks";

const Cart = () =>{
 const {cartItems} = useCartState();
    
    return(
        <div className="cart-page">
            <div className="card"></div>
            <div className="cart-items-container">
                {cartItems.map((item, index) => <CartItem data={item} key={index}/>)}
            </div>
        </div>
    )
}

export default Cart;