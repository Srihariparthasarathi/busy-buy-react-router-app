import useSignUpState from "./useSignUp.hooks";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup.component";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { clearError } from "../../redux/slices/appSlice";

const SignUp = () =>{
    const {error,
        emailRef,
        passwordRef,
        usernameRef,
        handleSignIn} = useSignUpState();
        const dispatcher = useDispatch()

    return(
        <div className="user-form">
            {error && <ErrorPopup message={error} onClose={()=> dispatcher(clearError())} />}

            <div className="sign-up">
                <h2>Sign-up</h2>
                <form onSubmit={(e)=> handleSignIn(e)}>
                    <input type="text" placeholder="Enter your Email" ref={emailRef} required/>
                    <input type="text" placeholder="Enter your Name" ref={usernameRef} required/>
                    <input type="password" name="" id="" placeholder="Enter your Password" ref={passwordRef} required/>
                    <button>signUp</button>
                </form>
                <div className="sign-in-prompt">
                    <p>
                        Already have an account? 
                        <Link to="/signin" className="sign-in-link">Sign in</Link>.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;