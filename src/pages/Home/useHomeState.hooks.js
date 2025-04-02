import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { appSelector } from "../../redux/slices/appSlice";

import DataDB from "../../model/dataDB.model";
import { getShoppingDataAsync, getShoppingDataByUserSearchAsync, homeSelector } from "../../redux/slices/homeSlice";
import { lodingSelector } from "../../redux/slices/lodingSlice";


const dataDB = new DataDB();



const useHomeState = () =>{
    const {isLogin} = useSelector(appSelector);
    const {items} = useSelector(homeSelector);
    const {isLoding} = useSelector(lodingSelector)

    const dispatcher = useDispatch()


    const searchRef = useRef();
    const debounceTimeout = useRef(null);

    useEffect(()=>{
        dispatcher(getShoppingDataAsync())

    }, []);

    async function handleSearchChange() {
        clearTimeout(debounceTimeout.current); 
        debounceTimeout.current = setTimeout(async () => {
            const searchText = searchRef.current.value.trim().toLowerCase();
            dispatcher(getShoppingDataByUserSearchAsync(searchText))
        }, 300); 
    }

    return {
        items, isLogin, isLoding, searchRef, handleSearchChange
    }

}

export default useHomeState;
