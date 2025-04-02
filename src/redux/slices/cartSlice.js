import { createSlice } from "@reduxjs/toolkit";

import UserDBUtils from "../../model/usersDB.model";

const INIIAL_STATE ={
    cartItems: [],
    cartTotalPrice: 0,

}


const userDBUtils = new UserDBUtils();


const cartSlice = createSlice({
    name: "cart",
    initialState: INIIAL_STATE,
    reducers: {
        setCartData: (state, action) => {
            state.cartItems = [...action.payload];
            state.cartTotalPrice = action.payload.reduce((acc, cur) => acc + cur.quantity * cur.price, 0);
        }
    },
})

const getCartRealTimeData = (userId) => (dispatch) =>{
    try{
        userDBUtils.listenToUserCart(userId, (cartItems) =>{
            console.log(cartItems);
            
            dispatch(cartSlice.actions.setCartData(cartItems))
        })
    }catch(err){
        console.log(err.message);
        
    }
}


export default cartSlice.reducer;



export {getCartRealTimeData};

export const cartSelector = state => state.cart;