import { useRef} from "react";
import { useAppContext } from "../contexts/App.context";

import { checkEmail, checkPassword } from "../utils/users.util";
import UserDBUtils from "../utils/usersDB.utils";


const userDBUtils = new UserDBUtils();

const useSignInState = () =>{
    const emailRef = useRef();
    const passwordRef = useRef();

    const {error, handleError, setError, handleLoginUser} = useAppContext();

    const handleSignIn = async (e) =>{
        e.preventDefault();

        let email = emailRef.current.value.trim();
        let password = passwordRef.current.value.trim()

        const isValidEmail = checkEmail(email);
        const isValidPassword = checkPassword(password);

        if(isValidEmail && isValidPassword) {
            const {isUser, documentId} = await userDBUtils.checkUser(email, password);
            
            if(!isUser) {
                handleError( "Invalid email or password" );
                clearInput();
                return;
            }

            if(isUser) return handleLoginUser(documentId);
            
        };

        if(!isValidEmail) return handleEmailError();

        if(!isValidPassword) return handlePasswordError();
    }


    const handleEmailError = () =>{
        emailRef.current.value = "";
        handleError("Please enter a valid email address.");
        emailRef.current.focus();
        passwordRef.current.value = "";
        return;
    }

    const handlePasswordError = () =>{
        passwordRef.current.value = "";
        handleError("Password must be 8+ characters with uppercase, lowercase, number, and special character.");
        passwordRef.current.focus();
        return;
    }

    const clearInput = () =>{
        emailRef.current.focus();
        emailRef.current.value = ""; 
        passwordRef.current.value = "";
        return;
    }


    return {
        error,
        setError,
        emailRef,
        passwordRef,
        handleSignIn
    }
}

export default useSignInState;