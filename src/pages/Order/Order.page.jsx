
import useOrderState from "./useOrderState.hooks";

import OrderItem from "../../components/OrderIem/OrderItem.component";
import Loading from "../../components/Loading/Loading.component";

const Order = () =>{

    const {orders, isLoding} = useOrderState()

    if(isLoding) return <Loading />
        
    return(
        <div className="order-main-container">
            <h1>Your Orders</h1>
            <div className="order-container">
                {orders.map((order) => <OrderItem data = {order}/>)}
            </div>
        </div>
    )
}

export default Order;