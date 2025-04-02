import { useRef, useEffect } from "react";
import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import { signUpUserAsync, setError, appSelector } from "../../redux/slices/appSlice";

import { checkEmail, checkPassword, checkUsername } from "../../utils/users.util";




const useSignUpState = () =>{
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    const navigate = useNavigate()
    const dispatcher = useDispatch();
    const {error} = useSelector(appSelector);
    

    useEffect(() => {
        if (error) clearInput();
    }, [error]);

    const handleSignIn = async (e) =>{
        e.preventDefault();

        let username = usernameRef.current.value.trim();
        let email = emailRef.current.value.trim();
        let password = passwordRef.current.value.trim()

        const isValidEmail = checkEmail(email);
        const isValidPassword = checkPassword(password);
        const isValidUsername = checkUsername(username);

        if(isValidEmail && isValidPassword && isValidUsername) {  
            try {
                const result = await dispatcher(signUpUserAsync({ username, email, password })).unwrap();
                if (result.documentId) navigate("/"); 
            } catch (error) {
                console.error("Sign-up failed:", error);
            }
            
        };

        if(!isValidUsername) return handleUsernameError();

        if(!isValidEmail) return handleEmailError();

        if(!isValidPassword) return handlePasswordError();
    }

    const handleEmailError = () =>{
        emailRef.current.value = "";
        dispatcher(setError("Please enter a valid email address."))
        emailRef.current.focus();
        usernameRef.current.value = "";
        passwordRef.current.value = "";
        return;
    }

    const handlePasswordError = () =>{
        passwordRef.current.value = "";
        dispatcher(setError("Password must be 8+ characters with uppercase, lowercase, number, and special character."));
        passwordRef.current.focus();
        return;
    }

    const handleUsernameError = () =>{
        usernameRef.current.value = "";
        dispatcher(setError("Please enter a valid username."));
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