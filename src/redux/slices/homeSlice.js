import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import DataDB from "../../model/dataDB.model";

const dataDB = new DataDB();

const INITIAL_STATE = {
    items: []
}

const getShoppingDataAsync = createAsyncThunk(
    "home/getData",
    async ( ) =>{
        try{
            return await dataDB.getShoppingItems();
        }catch(err){
            console.log(err.message);
            
        }
    }
)

const getShoppingDataByUserSearchAsync = createAsyncThunk(
    "home/getDateByUserSearch",
    async(searchText) =>{
        try{
            const data = await dataDB.getShoppingItems();
            return data.filter(item => item.name.toLowerCase().includes(searchText)) || [];
        }catch(err){
            console.log(err.message);
            
        }
    }
) 

const homeSlice = createSlice({
    name: "home",
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers: (builder) =>{
        builder
        .addCase(getShoppingDataAsync.fulfilled, (state, action)=>{
            state.items = action.payload;
        })
        .addCase(getShoppingDataByUserSearchAsync.fulfilled, (state, action)=>{
            state.items = action.payload;
        })
    }

})

export default homeSlice.reducer;
export {getShoppingDataAsync, getShoppingDataByUserSearchAsync};

export const homeSelector = state => state.home;