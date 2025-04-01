import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../contexts/App.context";
import DataDB from "../../model/dataDB.model";

const dataDB = new DataDB();


const useHomeState = () =>{
    const [items, setItems] = useState([]);
    const {isLogin} = useAppContext();
    const[isLoding, setIsLoading] = useState(false);
    const searchRef = useRef();
    const debounceTimeout = useRef(null);

    useEffect(()=>{
        getShoppingData();
    }, []);

    async function handleSearchChange() {
        clearTimeout(debounceTimeout.current); 
        debounceTimeout.current = setTimeout(async () => {
            setIsLoading(true);
            const allData = await dataDB.getShoppingItems();
            const searchText = searchRef.current.value.trim().toLowerCase();

            const filteredData = allData.filter(item =>
                item.name.toLowerCase().includes(searchText)
            );

            setItems(filteredData);
            setIsLoading(false);
        }, 300); 
    }

    async function getShoppingData() {
        setIsLoading(true);
        const data = await dataDB.getShoppingItems();
        setItems(data);
        setIsLoading(false)
    }

    return {
        items, isLogin, isLoding, searchRef, handleSearchChange
    }

}

export default useHomeState;
