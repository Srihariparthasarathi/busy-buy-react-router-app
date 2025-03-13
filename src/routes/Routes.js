import { Routes, Route } from "react-router";
import PrivateRoute from "./PrivateRoute";

import Navbar from "../components/Navbar.component";
import Home from "../pages/Home.page";
import SignIn from "../pages/SignIn.page";
import SignUp from "../pages/SignUp.page";
import Cart from "../pages/Cart.page";
import Order from "../pages/Order.page";

const Router = () =>{

    return(
        <div className="App">
            <Routes>
                <Route path="/" element={<Navbar />} >
                    <Route index element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    <Route path="/orders" element={
                        <PrivateRoute>
                            <Order />
                        </PrivateRoute>
                    } />
                    <Route path="/Cart" element={
                        <PrivateRoute>
                            <Cart />
                        </PrivateRoute>
                    } />
                </Route>
             </Routes>
        </div>
    )
}

export default Router;