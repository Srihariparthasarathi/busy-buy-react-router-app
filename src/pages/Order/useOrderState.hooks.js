
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { appSelector } from "../../redux/slices/appSlice";
import { orderSelector, getOrderDataAsync } from "../../redux/slices/orderSlice";
import { lodingSelector } from "../../redux/slices/lodingSlice";





const useOrderState = () =>{
    const {orders} = useSelector(orderSelector);
    const {userId} = useSelector(appSelector);
    const {isLoding} = useSelector(lodingSelector);

    const dispatcher = useDispatch();
    

    useEffect(() =>{
        dispatcher(getOrderDataAsync(userId))
    }, [])

   

    return {orders, isLoding}
}

export default useOrderState;