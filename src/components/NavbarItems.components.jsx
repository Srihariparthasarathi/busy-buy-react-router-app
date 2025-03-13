import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";

const NavBarItem = (props) =>{
    const {data, onClick} = props;
    
    return(
        <>
            {data.name !== "SignOut" ?
            <NavLink className="controller-item" to={data.path}>
                <div className="name">{data.name}</div>
                <FontAwesomeIcon icon={data.icon} className="fa-bars"/>
            </NavLink>
            :
            <div className="controller-item" onClick={onClick}>
                <div className="name">{data.name}</div>
                <FontAwesomeIcon icon={data.icon} className="fa-bars"/>
            </div>
        }
        </>
        
    )
}

export default NavBarItem;