import "../css/Footer.css"
import send from "../assets/send.png"
import { useNavigate } from "react-router-dom"


const Footer=()=>{

    const navigate = useNavigate();

return<div className="footer-container">

        <div className="newsletter">
            <p className="footer-title">Exclusive</p>
            <p className="normal-p">Subscribe</p>
            <p className="normal-p">Get 10% off your first order</p>
            <div className="input-container">
                <input className="input-field" placeholder="Enter Your Email" />
                <button className="input-button" >
                <img src={send} width={18} style={{backgroundColor:"transparent"}} />
                </button>
            </div>
        </div>


        <div className="contact-us">
            <p className="footer-title">Contact Us</p>
            <p className="normal-p"> Miss Cheesecake, 1st B Rd, opposite suncart bakery tools, Sardarpura, Jodhpur, Rajasthan 342003</p>
            <p className="normal-p">misscheesecakeofficial@gmail.com</p>
            <p className="normal-p">+919079713873 (10 AM to 8 PM)</p>
        </div>


        <div className="quick-links">
            <p className="footer-title">Account</p>
            <ul className="links-list">
                <li>My Account</li>
                <li>Login / Resgister</li>
                <li>Cart</li>
                <li>Wishlist</li>
                <li>Shop</li>
            </ul>
        </div>


        <div className="quick-links">
            <p className="footer-title">Quick Links</p>
            <ul className="links-list">
                <li onClick={()=>navigate('/privacy-and-policy')}>Privacy Policy</li>
                <li onClick={()=>navigate('/terms-and-conditions')}>Terms And Conditions</li>
                <li onClick={()=>navigate('/shiping-policy')}>Shipping Policy</li>
                <li>Contact</li>
            </ul>
        </div>
    </div>
}

export default Footer;