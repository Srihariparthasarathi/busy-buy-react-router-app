import { Outlet, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { appSelector, signOutUser} from "../../redux/slices/appSlice";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useNavbarState from "./useNavbarState.hooks";


import NavBarItem from "../NavbarItme/NavbarItems.components";


const Navbar = (props) => {

    const {isMenuOpen, menuItems,toggleMenu} = useNavbarState();
    const {isLogin} = useSelector(appSelector);
    const navigate = useNavigate();

    const dispatcher = useDispatch();

    const handleSignOut = (menu) => {
        if(menu.name === "SignOut"){
            dispatcher(signOutUser());
            navigate(menu.path)
        }
    }

    return(
        <>
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
                .map((item, index) => <NavBarItem data={item} key={index} 
                onClick={item.name === "SignOut" ? () =>handleSignOut(item) : null} />)
                :
                menuItems.filter((item) => !item.showIfLogin || item.name === "Home")
                .map((item, index) => <NavBarItem data={item} key={index}/>)
                }
    
            </div>
        </div>
        </nav>
        <div className="main">
            <Outlet />
        </div>
        </>
    )
}

export default Navbar;
