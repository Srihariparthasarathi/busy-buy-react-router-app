import { useEffect, useState } from "react";

import { useAppContext } from "../contexts/App.context";
import UserDBUtils from "../utils/usersDB.utils";

const userDBUtils = new UserDBUtils();

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
    
    

    
    return {cartItems, cartTotalPrice};
}

export default useCartState;