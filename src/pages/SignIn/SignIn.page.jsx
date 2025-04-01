import useSignInState from "./useSignIn.hooks";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup.component";
import { Link } from "react-router";

const SignIn = () =>{
    
    const {error, setError, emailRef, passwordRef, handleSignIn} = useSignInState();
    return(
        <div className="user-form">
            {error && <ErrorPopup message={error} onClose={()=> setError("")} />}
                
            <div className="sign-in">
                <h2>Sign-in</h2>
                <form onSubmit={(e)=> handleSignIn(e)}>
                    <input type="mail"
                     placeholder="Enter your Email" 
                     ref={emailRef}
                     required/>
                    <input type="password" 
                    placeholder="Enter your Password" 
                    ref={passwordRef}
                    required/>
                    <button>signIn</button>
                </form>
                <div className="sign-in-prompt">
                    <p>
                        Don't have an account? 
                        <Link to="/signup" className="sign-in-link">Sign up</Link>.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn;