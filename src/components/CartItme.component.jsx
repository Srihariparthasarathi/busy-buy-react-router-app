import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import useCartItem from "../hooks/useCartItem.hooks";


const CartItem = ({data}) => {
    const {increaseQuantity, decreaseQuantity, removeItemFromCart} = useCartItem(data);

    return(
        <div className="cart-item">
            <img src={data.imageUrl} alt={data.name} />
                        <div className="discrption">
                            <h3>{data.name}</h3>
                        </div>
                        <div className="controller">
                        <button onClick={decreaseQuantity}> <FontAwesomeIcon icon={faMinus} /></button>
                        <input type="text" value={data.quantity}/>
                        <button onClick={increaseQuantity}><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                        <button onClick={removeItemFromCart}>Remove from cart</button>
        </div>
    )
}

export default CartItem;