import { useContext, useEffect, useState } from "react";
import "../css/OrderProduct.css";
import { ProductContext } from "../context/ProductContext";
import { database, onValue, ref } from "../config";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { set } from "firebase/database";
import logo from '../assets/logo.png';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const OrderProduct = () => {
    const { Productsdata } = useContext(ProductContext);
    const [price, setPrice] = useState(0);
    const [country, setCountry] = useState([]);
    const [states, setStates] = useState([]);
    const [city, setCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
    const [selectedcountry, setSelectedCountry] = useState('');
    const [selectState, setSelectedState] = useState('');
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [address, setaddress] = useState("");
    const [apt, setapt] = useState("");
    const [contact, setContact] = useState('');
    const [pincode, setPincode] = useState('');
    const [totalOrders, setTotalOrders] = useState(0);

    const handleChange = () => {
        setChecked(!checked);
    };

    const loadScript = async (url) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = url;
    
          script.onload = () => {
            resolve(true);
          };
    
          script.onerror = () => {
            resolve(false);
          };
    
          document.body.appendChild(script);
        });
      };


    useEffect(() => {
        const ordersRef = ref(database, 'orders');
        onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const ordersArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                console.log(ordersArray.length);
                setTotalOrders(ordersArray.length);
            }
        });
    }, []); // This effect runs once on component mount


    const displayPhonePe = async () => {
        if (firstname.length > 0 && selectedcountry.length > 0 && selectState.length > 0 && selectedCity.length > 0 && lastname.length > 0 && address.length > 0 && contact.length > 0 && pincode.length > 0) {
            if (!checked) {
                if (price) {

                    const temp = await axios.post("https://paymentapi-bice.vercel.app/create-order",{amount: price+70})

                    console.log(temp)

                    const res = await loadScript(
                      "https://checkout.razorpay.com/v1/checkout.js"
                    );
              
                    if (!res) {
                      alert("Razorpay SDK failed to load, check you connection", "error");
                      return;
                    }
              
                    const options = {
                      key: "rzp_live_r5coHHOL60N8GR",
                      amount: (price+70) * 100,
                      currency: "INR",
                      name: "Miss Cheesecake",
                      description: "Thank you for shopping with us",
                      image: logo,
                      order_id : temp.data.order.id,
                      handler: async function (response) {
                        console.log(response);
                        const data = {
                            firstname: firstname,
                            lastname: lastname,
                            address: address,
                            apartment: apt,
                            phonenumber: contact,
                            city: selectedCity,
                            state: selectState,
                            country: selectedcountry,
                            pincode: pincode,
                            products: Productsdata,
                            ordermethod: "paid",
                            date: new Date().toISOString(),
                            payment_details : response,
                            price: (price + 70),
                            trackingid: ""
                        };
        
                        const orderid = totalOrders + 1001;
        
                        await set(ref(database, `orders/${orderid}`), data);
        
                        navigate('/');
                    
                      },
                      prefill: {
                        name: `${firstname} ${lastname}`,
                        email: "demo@gmail.com",
                        contact: contact,
                      },
                      theme: {
                        color: "#392F5A",
                      },
                    };
                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();
                  
            } else {
                    alert("Please Select Address");
                }
            } else {
                const data = {
                    firstname: firstname,
                    lastname: lastname,
                    address: address,
                    apartment: apt,
                    phonenumber: contact,
                    city: selectedCity,
                    state: selectState,
                    country: selectedcountry,
                    pincode: pincode,
                    products: Productsdata,
                    ordermethod: "cod",
                    date: new Date().toISOString(),
                    price: (price + 70),
                    trackingid: ""
                };

                const orderid = totalOrders + 1001;

                await set(ref(database, `orders/${orderid}`), data);

                navigate('/');
            }
        }else{
            alert("Please Select Address");
        } 
    };
    
  
  
    useEffect(() => {
        document.body.style.overflow = "";

        const sumofarray = Productsdata.map(({ variants, qtn }) => parseInt(variants[0].price) * qtn);
        const sum = sumofarray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setPrice(sum);

        const productsRef = ref(database, 'country');
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            setCountry(data);
        });
    }, [Productsdata]);

    const onchangeHandler = (selectedcountry) => {
        if (selectedcountry !== "") {
            setSelectedCountry(selectedcountry);
            const res = country.filter(({ name }) => name === selectedcountry);
            setStates(res[0].states);
        }
    };

    const onchangeHandler2 = (selectedstate) => {
        if (selectedstate !== "") {
            setSelectedState(selectedstate);
            const res = states.filter(({ name }) => name === selectedstate);
            setCity(res[0].cities);
        }
    };

    return (
        <>
            <Navbar />
            {
                country ? Productsdata.length === 0 ? (
                    <div style={{ height: "100%", width: "100%" }}>
                        <div className="empty-container">
                            <div className="design-empty-container">
                                <h2>Your cart is empty</h2>
                                <button style={{ color: "white" }} onClick={() => navigate('/')}>Continue shopping</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container">
                        {
                            Productsdata.length !== 0 ? (
                                <div className="sidebar">
                                    {Productsdata.map(({ images, title, variants, qtn }, index) => (
                                        <div className="product-price-container" key={index}>
                                            <img width={50} src={images[0].src} alt={title} />
                                            <h4>{title}</h4>
                                            <h4>* {qtn}</h4>
                                            <h4>₹{variants[0].price}</h4>
                                        </div>
                                    ))}

                                    <div className="price-container">
                                        <div className="total-container"><h4>Subtotal</h4><h4>₹{price}</h4></div>
                                        <div className="total-container"><h4>Shipping</h4><h4>₹70</h4></div>
                                        <div className="total-container"><h4>Total</h4><h4>₹{price + 70}</h4></div>
                                    </div>
                                </div>
                            ) : <div>No Product</div>
                        }

                        <div className="content">
                            <h2>Shipping Address</h2>
                            <form className="address-form">
                                {
                                    country ? <div className="select-container"><select className="select-section" onChange={(e) => { onchangeHandler(e.target.value) }}>
                                        <option value="">Select Country</option>
                                        {country.map(({ id, name }) => {
                                            return <option key={id} value={name}>{name}</option>
                                        })}
                                    </select></div> : <select className="select-country">
                                        <option value="">Select Country</option>
                                    </select>
                                }

                                <div className="name-section">
                                    <input className="address-input" placeholder="First name" type="text" onChange={(e) => setFirstName(e.target.value)} />
                                    <input className="address-input" placeholder="Last name" type="text" onChange={(e) => setLastName(e.target.value)} />
                                </div>

                                <input className="address-input" placeholder="Address" type="text" onChange={(e) => setaddress(e.target.value)} />
                                <input className="address-input" placeholder="Apartment, suite, etc (optional)" type="text" onChange={(e) => setapt(e.target.value)} />
                                <input className="address-input" placeholder="Phone" type="number" onChange={(e) => setContact(e.target.value)} />

                                <div className="select-container">
                                    {
                                        states ? <select className="select-section" onChange={(e) => { onchangeHandler2(e.target.value) }}>
                                            <option value="">Select State</option>
                                            {states.map(({ id, name }) => {
                                                return <option key={id} value={name}>{name}</option>
                                            })}
                                        </select> : <select className="select-section">
                                            <option value="">Select State</option>
                                        </select>
                                    }

                                    <div style={{ height: "10px" }}></div>

                                    {
                                        city ? <select className="select-section" onChange={(e) => { setSelectedCity(e.target.value) }}>
                                            <option value="">Select City</option>
                                            {city.map(({ id, name }) => {
                                                return <option key={id} value={name}>{name}</option>
                                            })}
                                        </select> : <select className="select-section">
                                            <option value="">Select City</option>
                                        </select>
                                    }

                                    <div style={{ height: "10px" }}></div>

                                    <input className="address-input" placeholder="Pincode" type="number" onChange={(e) => setPincode(e.target.value)} />
                                </div>
                            </form>

                            <h2>Shipping method</h2>
                            <div>
                                {/* <div className="checkbox-container">
                                    <input
                                        className="checkbox-section"
                                        type="checkbox"
                                        checked={checked}
                                        onChange={handleChange}
                                    />
                                    <p>Cash on Delivery <br />This shipping option is eligible for Cash on Delivery.</p>
                                </div> */}
                                <div className="checkbox-container">
                                    <input
                                        className="checkbox-section"
                                        type="checkbox"
                                        checked={!checked}
                                        onChange={handleChange}
                                    />
                                    <p>Standard</p>
                                </div>
                            </div>

                            <h2>Payment</h2>
                            <div style={{ height: "10px" }}></div>
                            <p>All transactions are secure and encrypted.</p>

                            {
                                checked ? <div className="payment-section">Cash on Delivery (COD)</div> : <div className="payment-section">Online Payment</div>
                            }

                            <button className="complete-button" onClick={displayPhonePe}>Complete Order</button>
                        </div>
                    </div>
                ) : <div>loading...</div>
            }
            <Footer />
        </>
    );
}

export default OrderProduct;
