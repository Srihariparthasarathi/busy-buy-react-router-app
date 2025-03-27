import { useEffect, useState } from "react";

import { useAppContext } from "../contexts/App.context";
import UserDBUtils from "../utils/usersDB.utils";
import OrdersDBUtils from "../utils/ordersItemDB.utils";

const userDBUtils = new UserDBUtils();
const ordersDBUtils = new OrdersDBUtils();

const useCartState = () => {
    const {userId} = useAppContext();
    const [cartItems, setCartItems] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    
    useEffect(() => {
        if (userId) {
            let unsubscribe;
            const fetchCartItems = async () => {
                unsubscribe = await userDBUtils.listenToUserCart(userId, (cartItems) => {
                    setCartItems(cartItems);
                });
            };

            fetchCartItems();

            return () => {
                if (unsubscribe) unsubscribe(); 
            };
        }
    }, [userId]);


    useEffect(()=>{
        const totalPrice = cartItems.reduce((acc, cur) =>{
            return acc + (cur.quantity * cur.price)
        }, 0)
        setCartTotalPrice(totalPrice)
    }, [cartItems])
    
    
    const handlePurchase = async () =>{

        if (!cartItems.length) return;

        const purchaseData = createPurchaseData();
        
        try {    
            await ordersDBUtils.addPurchaseItemsByUserId(userId, purchaseData);
        } catch (error) {
            console.error("Purchase failed:", error.message);

        }
    }

    const createPurchaseData = () =>{
        return cartItems.map(({ id, name, quantity, price }) => ({
            productId: id,
            productName: name,
            quantity,
            productPrice: price,
        }));
    }

    
    return {cartItems, cartTotalPrice, handlePurchase};
}

export default useCartState;