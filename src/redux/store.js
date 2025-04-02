import { configureStore } from '@reduxjs/toolkit';
import appReducer from "./slices/appSlice";
import homeReducer from "./slices/homeSlice";
import lodingReducer from "./slices/lodingSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
    reducer: {
        app: appReducer,
        home: homeReducer,
        loding: lodingReducer,
        cart: cartReducer,
        orders: orderReducer
    },
  })
  
  export default store;