import {  createSlice } from "@reduxjs/toolkit";
import { getShoppingDataAsync, getShoppingDataByUserSearchAsync } from "./homeSlice";
import { getOrderDataAsync } from "./orderSlice";


const INITIAL_STATE = {
    isLoding: false
}


const lodingSlice = createSlice({
    name: "loding",
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) =>{
        builder.addCase(getShoppingDataAsync.pending, (state)=>{
            state.isLoding = true;
        })
        .addCase(getShoppingDataAsync.rejected, (state)=>{
            state.isLoding = false;
        })
        .addCase(getShoppingDataAsync.fulfilled, (state)=>{
            state.isLoding = false;
        })
        .addCase(getShoppingDataByUserSearchAsync.pending, (state)=>{
            state.isLoding = true;
        })
        .addCase(getShoppingDataByUserSearchAsync.rejected, (state)=>{
            state.isLoding = false;
        })
        .addCase(getShoppingDataByUserSearchAsync.fulfilled, (state)=>{
            state.isLoding = false;
        })
        .addCase(getOrderDataAsync.pending, (state)=>{
            state.isLoding = true;
        })
        .addCase(getOrderDataAsync.rejected, (state)=>{
            state.isLoding = false;
        })
        .addCase(getOrderDataAsync.fulfilled, (state)=>{
            state.isLoding = false;
        })
    }

})

export default lodingSlice.reducer;

export const lodingSelector = state => state.loding;