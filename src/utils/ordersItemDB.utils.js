import { collection, addDoc } from "firebase/firestore"; 

import db from "../config/firestoreDB.config";

import UserDBUtils from "./usersDB.utils";

const ORDERS_COLLECTION_NAME = "orders";

const userDB = new UserDBUtils();

export default class OrdersDBUtils {

    async getPurchaseItemByUserId(){

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