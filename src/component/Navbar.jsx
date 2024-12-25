import "../css/navbar.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import bag from "../assets/shopping-bag.png";
import menu from "../assets/menu.png";
import send from "../assets/search-interface-symbol.png";

const Navbar = () => {
    const navigate = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="nav-container">
            {screenWidth < 700 ? (
                <>
                    <nav className="navbar">
                        <img
                            className="sideimage"
                            src={menu}
                            width={20}
                            onClick={toggleSidebar}
                            alt="Menu"
                        />
                        <div className="logo">
                            <img
                                src={logo}
                                width={80}
                                alt="Logo"
                                onClick={() => { navigate("/") }}
                            />
                            <p className="logo-name">Miss Cheesecake</p>
                        </div>
                        <div className="cart-icon" onClick={() => { navigate("/order") }}>
                            <img src={bag} width={25} alt="Cart" />
                        </div>
                    </nav>
                    <div className={`${isSidebarOpen ? 'open' : 'sidebar2'}`}>
                        <button className="close-btn" onClick={toggleSidebar}>X</button>
                        <ul className="nav-lists">
                            <li onClick={() => { navigate("/") }}>Home</li>
                            <li onClick={() => { navigate("/order") }}>Order</li>
                            <li onClick={() => { navigate("/shiping-policy") }}>Shipping Policy</li>
                            <li onClick={() => { navigate("/terms-and-conditions") }}>Terms And Conditions</li>
                            <li onClick={() => { navigate("/privacy-and-policy") }}>Privacy And Policy</li>
                            <li><Link to="/about-us">About Us</Link></li> {/* About Us link */}
                            <li><Link to="/contact-us">Contact Us</Link></li> {/* Contact Us link */}
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <nav className="navbar">
                        <div className='logo'>
                            <img
                                src={logo}
                                width={80}
                                alt="Logo"
                                onClick={() => { navigate("/") }}
                            />
                            <div className="logo-name">Miss Cheesecake</div>
                        </div>

                        <ul className="link-list">
                            <li><Link to="/">Home</Link></li> {/* Use Link for navigation */}
                            <li><Link to="/about-us">About Us</Link></li> {/* About Us link */}
                            <li><Link to="/contact-us">Contact Us</Link></li> {/* Link to Contact page */}
                            <li><Link to="/signup">Sign Up</Link></li> {/* Link to Sign Up page */}
                        </ul>

                        <div className="cart-icon">
                            {screenWidth > 1000 ? (
                                <div className="input-container2">
                                    <input className="input-field2" placeholder="What Are You Looking For?" />
                                    <button className="input-button2">
                                        <img src={send} width={15} />
                                    </button>
                                </div>
                            ) : null}
                            <img src={bag} className="addtocart" onClick={() => { navigate("/order") }} width={25} alt="Cart" />
                        </div>
                    </nav>
                    <div className={`${isSidebarOpen ? 'open' : 'sidebar2'}`}>
                        <button className="close-btn" onClick={toggleSidebar}>X</button>
                        <ul className="nav-lists">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/order">Order</Link></li>
                            <li><Link to="/shiping-policy">Shipping Policy</Link></li>
                            <li><Link to="/terms-and-conditions">Terms And Conditions</Link></li>
                            <li><Link to="/privacy-and-policy">Privacy And Policy</Link></li>
                            <li><Link to="/about-us">About Us</Link></li> {/* About Us link */}
                            <li><Link to="/contact-us">Contact Us</Link></li> {/* Contact Us link */}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

export default Navbar;
