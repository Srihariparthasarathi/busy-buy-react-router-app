import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


import OrdersDBUtils from "../../model/ordersItemDB.model";
import { appSelector } from "../../redux/slices/appSlice";
import { cartSelector, getCartRealTimeData } from "../../redux/slices/cartSlice";
import { lodingSelector } from "../../redux/slices/lodingSlice";

const ordersDBUtils = new OrdersDBUtils();

const useCartState = () => {
    const {userId} = useSelector(appSelector);
    const {cartItems, cartTotalPrice} = useSelector(cartSelector);
    const {isLoding} = useSelector(lodingSelector)

    const dispatcher = useDispatch();

    useEffect(() => {

        if(!userId) return;

        dispatcher(getCartRealTimeData(userId));
        
    }, []);


    
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