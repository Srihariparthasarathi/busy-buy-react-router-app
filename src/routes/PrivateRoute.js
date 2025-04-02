import { Navigate } from "react-router"; 
import { useSelector } from "react-redux";
import { appSelector } from "../redux/slices/appSlice";

const PrivateRoute = ({ children }) => {
    const { isLogin } = useSelector(appSelector);

    return isLogin ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;