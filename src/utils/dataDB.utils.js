import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import db from "../config/firestoreDB.config";

const SHOPPING_ITEMS_COLLECTION_NAME = "shoppingItmes";
export default class DataDB {

    async getShoppingItems(){
        try{
            let data = [];
            const querySnapshot = await getDocs(collection(db, SHOPPING_ITEMS_COLLECTION_NAME));
            querySnapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()})
            });
            return data;
        }catch(err){
            console.log(err.message);
            
        }
    }

    
    async getShoppingItemsByUserSearch (searchText){
        try{
            let data = [];
            const q = query(
                collection(db, SHOPPING_ITEMS_COLLECTION_NAME),
                where("name", ">=", searchText), 
                where("name", "<", searchText + "\uf8ff") 
              );
              
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                data.push({id: doc.id, ...doc.data()})
              });
              return data;

        }catch(err){
            console.log(err.message);
            
        }
    }

    async getCartItemById(id) {
        try {
            const docRef = doc(db, SHOPPING_ITEMS_COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() }; 
            } else {
                console.log("No such document!");
                return null;
            }
        } catch (err) {
            console.log("Error fetching document:", err.message);
        }
    }


    async getAllCartItemsById(itemIds){
        try {
            const itemsCollectionRef = collection(db, SHOPPING_ITEMS_COLLECTION_NAME); 
        const q = query(itemsCollectionRef, where("__name__", "in", itemIds)); 

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        } catch (err) {
            console.log("Error fetching document:", err.message);
        }

    }
}