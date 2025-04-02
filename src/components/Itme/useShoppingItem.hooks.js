import { useEffect, useState } from "react";

import UserDBUtils from "../../model/usersDB.model";
import { useSelector } from "react-redux";
import { appSelector } from "../../redux/slices/appSlice";

const userDBUtils = new UserDBUtils();


const useShoppingItmestate = (itemDetail) =>{
    const {userId} = useSelector(appSelector);
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
        await userDBUtils.removeItmeFromCart(userId, ShoppingItemId)
    }

    return {
        isItemInCart, handleAddToCart, removeItemFromCart
    }
}

export default useShoppingItmestate;