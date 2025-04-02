import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import OrdersDB from "../../model/ordersItemDB.model";


const INITIAL_STATE = {
    orders: [],
}

const ordersDB = new OrdersDB();

const getOrderDataAsync = createAsyncThunk(
    "order/getOrderForUser",
    async (userId, ThunkAPI) =>{
        return await ordersDB.getPurchaseItemByUserId(userId);
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) =>{
        builder.addCase(getOrderDataAsync.fulfilled, (state, action) =>{

            state.orders = [...action.payload];
        })
    }
})

export default orderSlice.reducer;

export {getOrderDataAsync}

export const orderSelector = state => state.orders;