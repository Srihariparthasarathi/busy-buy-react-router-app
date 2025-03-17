import { collection, getDocs, query, where } from "firebase/firestore";
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
}