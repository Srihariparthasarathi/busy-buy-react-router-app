import db from "../config/firestoreDB.config";

import { collection, addDoc, query, where, getDocs, documentId , doc, setDoc, getDoc, updateDoc} from "firebase/firestore";

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

    async addShoppingItemsInCart(userId, cartItemId) {
        try {
            const user = await this.getUserData(userId);
            if (!user) throw new Error("User not found");
    
            const cart = this.#addItemInCart(user, cartItemId);
          
            await updateDoc(doc(db, USER_COLLECTION_NAME, userId), { cartItems: cart });
    
        } catch (err) {
            console.error("Error adding item to cart:", err.message);
        }
    }

    async checkCartItemExists(userId, cartItemId){
        try {
            const user = await this.getUserData(userId);
            if (!user) throw new Error("User not found");
            
           if(!user.cartItems) return false;
           const isItemInCart = this.#getCartItemIndex(user.cartItems, cartItemId);

           return (isItemInCart === -1) ? false : true;

    
        } catch (err) {
            console.error("Error adding item to cart:", err.message);
        }
    }
    
    async getUserData(userId) {
        try {
            const docRef = doc(db, USER_COLLECTION_NAME, userId);  
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) return docSnap.data();
            else return false;
    
        } catch (err) {
            console.error("Error fetching user data:", err.message);
        }
    }

    async removeItmeFromCart(userId, cartItemId){
        try{
            const user = await this.getUserData(userId);
            if (!user) throw new Error("User not found");

            const cart = this.#removeItemInCart(user, cartItemId);
          
            await updateDoc(doc(db, USER_COLLECTION_NAME, userId), { cartItems: cart });
    
        }catch(err){
            console.error("Error removing item from cart:", err.message)
        }
    }

    #getCartItemIndex(cart, cartItemId){
        return cart.findIndex((item) => item.itemId === cartItemId);
    }



    #addItemInCart(user, cartItemId){
        let cart = user.cartItems || [];
        const itemIndex = this.#getCartItemIndex(cart, cartItemId)
    
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ itemId: cartItemId, quantity: 1 });
        }

        return cart;
    }

    #removeItemInCart(user, cartItemId){
        let cart = user.cartItems || [];
        const itemIndex = this.#getCartItemIndex(cart, cartItemId)

        if (itemIndex === -1) return cart;
        else cart.splice(itemIndex, 1);

        return cart;
    }

}
