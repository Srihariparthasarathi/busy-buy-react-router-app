import { useState } from "react";
import { faHome, faBagShopping, faCartShopping, faRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const useNavbarState = () =>{
     const [isMenuOpen, setIsMenuOpen] = useState(false);

     const menuItems = [
        {
            name: "Home",
            icon: faHome
        },
        {
            name: "Orders",
            icon: faBagShopping,
            showIfLogin: true,
        },
        {
            name: "Cart",
            icon: faCartShopping,
            showIfLogin: true,
        },
        {
            name: "SignIn",
            icon: faRightToBracket,
            showIfLogin: false,
        },
        {
            name: "SignOut",
            icon: faRightFromBracket,
            showIfLogin: true,
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