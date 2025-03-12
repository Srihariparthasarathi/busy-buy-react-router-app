import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBarItem = (props) =>{
    const {data} = props;
    return(
        <div className="controller-item">
            <div className="name">{data.name}</div>
            <FontAwesomeIcon icon={data.icon} className="fa-bars"/>
        </div>
    )
}

export default NavBarItem;