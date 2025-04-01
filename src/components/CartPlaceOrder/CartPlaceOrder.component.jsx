

const CartPlaceOrder =({cartTotalPrice, handlePurchaseBtnClick}) =>(
    <div className="place-order-container">
            <h3>Place Order</h3>
            <p>Total Price: {cartTotalPrice}</p>
            <button onClick={handlePurchaseBtnClick}>Purchase</button>
        </div>
)

export default CartPlaceOrder;