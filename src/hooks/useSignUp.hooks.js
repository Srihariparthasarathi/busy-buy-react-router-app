import { useRef, useState } from "react";
import { useAppContext } from "../contexts/App.context";

import { checkEmail, checkPassword, checkUsername } from "../utils/users.util";
import UserDBUtils from "../utils/usersDB.utils";

const userDBUtils = new UserDBUtils();
const useSignUpState = () =>{
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    const {error, handleError, setError, handleLoginUser} = useAppContext();

    const handleSignIn = async (e) =>{
        e.preventDefault();

        let username = usernameRef.current.value.trim();
        let email = emailRef.current.value.trim();
        let password = passwordRef.current.value.trim()

        const isValidEmail = checkEmail(email);
        const isValidPassword = checkPassword(password);
        const isValidUsername = checkUsername(username);

        if(isValidEmail && isValidPassword && isValidUsername) {
            const {errorMessage, documentId} = await userDBUtils.addUser(username, email, password);

            if(errorMessage){
                handleError(errorMessage);
                clearInput();
                return;
            }

            if(documentId)  return handleLoginUser(documentId);   
            
        };

        if(!isValidUsername) return handleUsernameError();

        if(!isValidEmail) return handleEmailError();

        if(!isValidPassword) return handlePasswordError();
    }

    const handleEmailError = () =>{
        emailRef.current.value = "";
        handleError("Please enter a valid email address.");
        emailRef.current.focus();
        usernameRef.current.value = "";
        passwordRef.current.value = "";
        return;
    }

    const handlePasswordError = () =>{
        passwordRef.current.value = "";
        handleError("Password must be 8+ characters with uppercase, lowercase, number, and special character.");
        passwordRef.current.focus();
        return;
    }

    const handleUsernameError = () =>{
        usernameRef.current.value = "";
        handleError("Please enter a valid username.");
        usernameRef.current.focus();
        passwordRef.current.value = "";
        return;
    }

    const clearInput = () =>{
        emailRef.current.focus();
        emailRef.current.value = ""; 
        usernameRef.current.value = "";
        passwordRef.current.value = "";
        return;
    }


    return {
        error,
        setError,
        emailRef,
        passwordRef,
        usernameRef,
        handleSignIn
    }
}

export default useSignUpState;