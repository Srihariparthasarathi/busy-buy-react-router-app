import { useRef} from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { signInUserAsync, setError, appSelector } from "../../redux/slices/appSlice";

import { checkEmail, checkPassword } from "../../utils/users.util";


const useSignInState = () =>{
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const dispatcher = useDispatch();

    const {error} = useSelector(appSelector);

    const handleSignIn = async (e) =>{
        e.preventDefault();

        let email = emailRef.current.value.trim();
        let password = passwordRef.current.value.trim()

        const isValidEmail = checkEmail(email);
        const isValidPassword = checkPassword(password);

        if(isValidEmail && isValidPassword) {
           try{
                const result = await dispatcher(signInUserAsync({ email, password })).unwrap();
                if(result.documentId) navigate("/");
                clearInput()
           }catch(err){

           }
            
        };

        if(!isValidEmail) return handleEmailError();

        if(!isValidPassword) return handlePasswordError();
    }


    const handleEmailError = () =>{
        emailRef.current.value = "";
        dispatcher(setError("Please enter a valid email address."))
        emailRef.current.focus();
        passwordRef.current.value = "";
        return;
    }

    const handlePasswordError = () =>{
        passwordRef.current.value = "";
        dispatcher(setError("Password must be 8+ characters with uppercase, lowercase, number, and special character."));
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