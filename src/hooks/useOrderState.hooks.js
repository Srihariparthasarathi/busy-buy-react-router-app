
import { useState, useEffect } from "react";
import OrdersDBUtils from "../utils/ordersItemDB.utils";
import {useAppContext} from "../contexts/App.context";



const ordersDB = new OrdersDBUtils();


const useOrderState = () =>{
    const [orders, setOrders] = useState([]);
    const {userId} = useAppContext();
    const[isLoding, setIsLoading] = useState(false);

    useEffect(() =>{
        getOrderDetails()
    }, [])

    const getOrderDetails = async() =>{
        try{
            setIsLoading(true)
            const orders = await ordersDB.getPurchaseItemByUserId(userId)
            setOrders([...orders]);
            setIsLoading(false)

        }catch(err){
            console.log(err.message)
        }
        
    }

    return {orders, isLoding}
}

export default useOrderState;