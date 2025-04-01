import { useState } from "react";
import { faHome, faBagShopping, faCartShopping, faRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const useNavbarState = () =>{
     const [isMenuOpen, setIsMenuOpen] = useState(false);

     const menuItems = [
        {
            name: "Home",
            icon: faHome,
            path: "/"
        },
        {
            name: "Orders",
            icon: faBagShopping,
            showIfLogin: true,
            path: "/orders"
        },
        {
            name: "Cart",
            icon: faCartShopping,
            showIfLogin: true,
            path: "/cart"
        },
        {
            name: "SignIn",
            icon: faRightToBracket,
            showIfLogin: false,
            path: "/signin"
        },
        {
            name: "SignOut",
            icon: faRightFromBracket,
            showIfLogin: true,
            path: "/"
        }
    ]

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return {
        isMenuOpen, 
        menuItems,
        toggleMenu
    }
         
}



export default useNavbarState;