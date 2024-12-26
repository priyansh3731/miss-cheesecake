import logo from "../assets/logo.png";
import "../css/navbar.css";



const NavImage = () => {
    return (
        <div className="nav-image">
            <img src={logo} alt="logo" />
        </div>
    );
}

export default NavImage;