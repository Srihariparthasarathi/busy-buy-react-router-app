import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const appContext = createContext();

const useAppContext = () => useContext(appContext);

const AppProvider = ({children}) =>{

    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleError = (message) => setError(message);

    const handleLoginUser = (userId) =>{
        setIsLogin(true);
        setUserId(userId);
        navigate("/")
    }

    const handleLogoutUser = () =>{
        setIsLogin(false);
        setUserId(null);
    }
    return(
        <appContext.Provider value={{isLogin, userId, error, setError, handleError, handleLoginUser, handleLogoutUser}}>
            {children}
        </appContext.Provider>
    )
}

export default AppProvider;
export {useAppContext};