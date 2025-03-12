import { useState } from "react";
import useNavbarState from "../hooks/useNavbarState.hooks";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavBarItem from "./NavbarItems.components";

const Navbar = (props) => {

    const {isMenuOpen, menuItems,toggleMenu} = useNavbarState();
    const [isLogin, setIsLogin] = useState(false);

    return(
        <nav>
            <div className="nav-bar">
            <div className="logo">
                <div className="logo-item">BusyBuy</div>
            </div>

            <div className="hamburgger" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} className="fa-bars"/>
            </div>
            <div className={`controller ${isMenuOpen ? 'active' : ''}`}>

                {isLogin ?
                menuItems.filter((item) => item.showIfLogin || item.name === "Home")
                .map((item, index) => <NavBarItem data={item} key={index}/>)
                :
                menuItems.filter((item) => !item.showIfLogin || item.name === "Home")
                .map((item, index) => <NavBarItem data={item} key={index}/>)
                }
    
            </div>
        </div>
        </nav>
    )
}

export default Navbar;
