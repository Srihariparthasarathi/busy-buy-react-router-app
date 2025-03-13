import db from "../config/firestoreDB.config";

import { collection, addDoc, query, where, getDocs, documentId } from "firebase/firestore";

const USER_COLLECTION_NAME = "users"

export default class UserDBUtils {
    async addUser(username, email, password){
        try{
            const isEmailExists = await this.checkEmailExists(email)
            
            if(isEmailExists) return {errorMessage: "Email already exists."};

            const docRef = await addDoc(collection(db, USER_COLLECTION_NAME), {
                username, email, password
            });

            return{documentId: docRef.id}
        }catch(err){
            console.log(err);
            
        }
    }

    async checkEmailExists(email){
        try {
           
            const q = query(collection(db, USER_COLLECTION_NAME), where("email", "==", email));
            const querySnapshot = await getDocs(q);

            return !querySnapshot.empty;

        } catch (err) {
            console.error("Error adding user: ", err);
        }

    }

    async checkUser(email, password){
        try {
            const q = query(
                collection(db, USER_COLLECTION_NAME),
                where("email", "==", email),
                where("password", "==", password)
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0]; 
                return {
                    isUser: true,
                    documentId: userDoc.id, 
                };
            } else {
                return { 
                    isUser: false
                 };
            }

        } catch (err) {
            console.error("Error checking user: ", err);
            return "Error occurred while checking user";
        }
    }   
}