import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/App.context";
import UserDBUtils from "../utils/usersDB.utils";

const userDBUtils = new UserDBUtils();


const useShoppingItmestate = (itemDetail) =>{
    const {userId} = useAppContext();
    const [isItemInCart, setIsItemInCart] = useState(false);

    useEffect(()=>{
        if(userId){
            checkIsItemInUserCart();
        }
    },[userId])

    async function handleAddToCart(ShoppingItemId){
        await userDBUtils.addShoppingItemsInCart(userId, ShoppingItemId);
        setIsItemInCart(true);
    }

    async function checkIsItemInUserCart(){
        const isItemExistsInCart = await userDBUtils.checkCartItemExists(userId, itemDetail.id);
        if(isItemExistsInCart) {
            setIsItemInCart(true)
        }
    }
    async function removeItemFromCart(ShoppingItemId){
        await userDBUtils.removeItmeFromCart(userId, ShoppingItemId);
        setIsItemInCart(false);
    }

    return {
        isItemInCart, handleAddToCart, removeItemFromCart
    }
}

export default useShoppingItmestate;