import { useEffect, useState } from "react";

import { useAppContext } from "../../contexts/App.context";
import UserDBUtils from "../../model/usersDB.model";
import OrdersDBUtils from "../../model/ordersItemDB.model";

const userDBUtils = new UserDBUtils();
const ordersDBUtils = new OrdersDBUtils();

const useCartState = () => {
    const {userId} = useAppContext();
    const [cartItems, setCartItems] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const[isLoding, setIsLoading] = useState(false);
    
    useEffect(() => {

        if(!userId) return;

        setIsLoading(true)
        let unsubscribe;
        const fetchCartItems = async () => {
            try {
                unsubscribe = await userDBUtils.listenToUserCart(userId, (cartItems) => {
                    setCartItems(cartItems);
                    setIsLoading(false); 
                });
            } catch (error) {
                console.error("Error fetching cart items:", error);
                setIsLoading(false); 
            }
        };
    
        fetchCartItems();
    }, []);


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

    
    return {cartItems, cartTotalPrice, isLoding, handlePurchase};
}

export default useCartState;