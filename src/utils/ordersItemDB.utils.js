import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 

import db from "../config/firestoreDB.config";

import UserDBUtils from "./usersDB.utils";

const ORDERS_COLLECTION_NAME = "orders";

const userDB = new UserDBUtils();

export default class OrdersDBUtils {

    async getPurchaseItemByUserId(userId){
        try{
            const data = [];
            const q = query(collection(db, ORDERS_COLLECTION_NAME), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                data.push({id: doc.id, ...doc.data()})
            });
            return data;

        }catch(error){
            console.error("Error getting purchase items:", error.message);
        }
    }

    async addPurchaseItemsByUserId(userId, purchaseData) {
        try {
            // Create purchase order
            const docRef = await addDoc(collection(db, ORDERS_COLLECTION_NAME), {
                userId,
                items: [...purchaseData],
                createdAt: new Date(),
            });
    
            // Clear cart from the user document
            await userDB.clearCartItemByUserId(userId)
    
        } catch (error) {
            console.error("Error adding purchase items:", error.message);
        }
    }
    
}