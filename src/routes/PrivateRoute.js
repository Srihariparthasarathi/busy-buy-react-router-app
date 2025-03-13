import { Navigate } from "react-router";
import { useAppContext } from "../contexts/App.context";  

const PrivateRoute = ({ children }) => {
    const { isLogin } = useAppContext();

    return isLogin ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;