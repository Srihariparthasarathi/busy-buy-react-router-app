import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../contexts/App.context";
import DataDB from "../utils/dataDB.utils";

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

const shoppingItems = [
    { id: 1, name: "Silver Chain", category: "Jewelry", price: 2000, imageUrl: "https://images.unsplash.com/photo-1578973615934-8d9a9e6262b3" },
    { id: 2, name: "Gold Watch", category: "Accessories", price: 7000, imageUrl: "https://images.unsplash.com/photo-1596440751764-0c92d8a1a5d2" },
    { id: 3, name: "Leather Wallet", category: "Accessories", price: 1500, imageUrl: "https://images.unsplash.com/photo-1580910051072-6b6a18f9f15f" },
    { id: 4, name: "Men's Sneakers", category: "Footwear", price: 4500, imageUrl: "https://images.unsplash.com/photo-1618354691310-c855d5a11cdd" },
    { id: 5, name: "Women's Sandals", category: "Footwear", price: 3200, imageUrl: "https://images.unsplash.com/photo-1580902045698-5b4275553f65" },
    { id: 6, name: "Denim Jacket", category: "Clothing", price: 6800, imageUrl: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d" },
    { id: 7, name: "Casual T-Shirt", category: "Clothing", price: 1200, imageUrl: "https://images.unsplash.com/photo-1564584226991-fc2f4c5816fd" },
    { id: 8, name: "Gaming Mouse", category: "Electronics", price: 3500, imageUrl: "https://images.unsplash.com/photo-1619218504048-6a7d69820e6a" },
    { id: 9, name: "Wireless Earbuds", category: "Electronics", price: 7800, imageUrl: "https://images.unsplash.com/photo-1590658268038-fd54f2b3d4e2" },
    { id: 10, name: "Smartphone Stand", category: "Electronics", price: 1800, imageUrl: "https://images.unsplash.com/photo-1557434443-363d282db1ff" },
    { id: 11, name: "Sunglasses", category: "Accessories", price: 2500, imageUrl: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb" },
    { id: 12, name: "Backpack", category: "Bags", price: 4100, imageUrl: "https://images.unsplash.com/photo-1532562184606-ec1ff165fe4a" },
    { id: 13, name: "Leather Belt", category: "Accessories", price: 2100, imageUrl: "https://images.unsplash.com/photo-1580910051072-6b6a18f9f15f" },
    { id: 14, name: "Notebook", category: "Stationery", price: 600, imageUrl: "https://images.unsplash.com/photo-1522801086325-99a61f34b7d0" },
    { id: 15, name: "Wireless Keyboard", category: "Electronics", price: 5300, imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf70b12f6a" },
    { id: 16, name: "Perfume", category: "Fragrance", price: 2900, imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9f" },
    { id: 17, name: "Coffee Mug", category: "Kitchen", price: 800, imageUrl: "https://images.unsplash.com/photo-1599916924623-a31d6a9da130" },
    { id: 18, name: "Yoga Mat", category: "Fitness", price: 2700, imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1" },
    { id: 19, name: "Table Lamp", category: "Home Decor", price: 3400, imageUrl: "https://images.unsplash.com/photo-1563170423-18f482d82cc8" },
    { id: 20, name: "Wall Clock", category: "Home Decor", price: 2600, imageUrl: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2" }
];