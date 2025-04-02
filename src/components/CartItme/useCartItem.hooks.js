
import { useAppContext } from "../../contexts/App.context";
import { useSelector } from "react-redux";

import { appSelector } from "../../redux/slices/appSlice";

import UserDBUtils from "../../model/usersDB.model";

const userDB = new UserDBUtils();


const useCartItem = (data) => {
    const {userId} = useSelector(appSelector);
    
    async function increaseQuantity () {
        await userDB.addShoppingItemsInCart(userId, data.id)
    }

    async function decreaseQuantity () {
        await userDB.decreaseShoppingItemsInCart(userId, data.id)
    }
    async function removeItemFromCart(){
        await userDB.removeItmeFromCart(userId, data.id)
    }


    return { 
        increaseQuantity,
        decreaseQuantity,
        removeItemFromCart
    }
}

export default useCartItem;