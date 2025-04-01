import useShoppingItmestate from "./useShoppingItem.hooks";

const ShoppingItem = (props) =>{
    const {itemDetail, isLogin} = props;
    const {isItemInCart, handleAddToCart, removeItemFromCart} = useShoppingItmestate(itemDetail);
   
    return(
        <div className="item">
                        <img src={itemDetail.imageUrl} alt={itemDetail.name} />
                        <div className="discrption">
                            <h3>{itemDetail.name}</h3>
                            <div className="price">
                                &#8377; {itemDetail.price}
                            </div>
                        </div>
                        {isLogin ? 
                        isItemInCart ?
                         <button onClick={() =>removeItemFromCart(itemDetail.id)}>Remove from cart</button>
                        : <button onClick={() =>handleAddToCart(itemDetail.id)}>Add to cart</button>
                    : null}
                    </div>
    )
}

export default ShoppingItem;