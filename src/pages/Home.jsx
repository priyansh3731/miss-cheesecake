import "../css/home.css"; // Include your CSS styles
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import cookie from '../assets/cookie.webp'
import chocochips from '../assets/choco-chips.png'
import peanut from '../assets/peanut.png'
import gem from '../assets/gem.png'
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { database, onValue, ref } from '../config';  

gsap.registerPlugin(ScrollTrigger);

const App = () => {


  const navigate = useNavigate();
  const [products, setProduct] = useState([]);
  const [qty, setQty] = useState(1);
  const [qty1, setQty1] = useState(1);
  const { Productsdata, setProductsData } = useContext(ProductContext);

  const qtyHandler=()=>{
    if(qty != 1){
      setQty(qty => qty-1)
    }
  }

  const qtyHandler1=()=>{
    if(qty1 != 1){
      setQty1(qty1 => qty1-1)
    }
  }

  const orderHandler=(product, quantity)=>{
    // Find the index of the existing product in the Productsdata array
    const productIndex = Productsdata.findIndex(data => data.id === product.id);

    // Create a new array to avoid direct state mutation
    const updatedProductsData = [...Productsdata];

    if (productIndex !== -1) {
        // Product exists in the cart, so update its quantity
        updatedProductsData[productIndex] = {
            ...updatedProductsData[productIndex],
            qtn: updatedProductsData[productIndex].qtn + quantity
        };
    } else {
        // Product does not exist in the cart, so add it with the given quantity
        updatedProductsData.push({ ...product, qtn: quantity });
    }

    // Update the state with the new array
    setProductsData(updatedProductsData);
  
  }

  // Fetch products from database
  useEffect(() => {
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setProduct(productsArray);
        console.log(productsArray)
      }
    });
  }, []); // This effect runs once on component mount



  useEffect(() => {
    const scrollContainer = document.querySelector(".smooth-scroll");

  if (!scrollContainer) return;

  const locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    multiplier: 1,
    smartphone: {
      smooth: true,
    },
    tablet: {
      smooth: true,
    },
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.defaults({ scroller: scrollContainer });
  ScrollTrigger.refresh();
  
    // GSAP Animations with Breakpoints
    if(window.innerWidth<768){
      ScrollTrigger.matchMedia({
        "all": function () {
          // Small screens animation
          const tlSmall = gsap.timeline({
            scrollTrigger: {
              trigger: ".second-section",
              start: "-10% 100%",
              end: "-20% 50%",
              scrub: true,
            },
          });
    
          tlSmall.to("#cookie", { top: "120%", left: "10%", rotate: "30%", width:"80vw" }, "cookie");
          tlSmall.to("#chips", { width: "10vw", top: "130%", left: "75%" }, "cookie");
  
        },
      });
    }else{
      ScrollTrigger.matchMedia({
        "all": function () {
          // Common settings for all screen sizes if needed
          const tlSmall = gsap.timeline({
            scrollTrigger: {
              trigger: ".second-section",
              start: "-10% 100%",
              end: "30% 50%",
              scrub: true,
            },
          });
    
          tlSmall.to("#cookie", { top: "140%", left: "10%", rotate: "30%" }, "cookie");
          tlSmall.to("#chips", { width: "10vw", top: "120%", left: "90%" }, "cookie");
    
        }
      });
    }
  
    return () => {
      locoScroll.destroy();
      ScrollTrigger.killAll();
    };
  }, []);
  

  return (
    <div className="smooth-scroll">
      <Navbar />
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Cookie</h1>
            <img src={cookie} alt="Cookie" className="cookie" id="cookie" />
            <img src={chocochips} alt="Choco Chips" className="choco-chips" id="chips" />
            <img src={peanut} alt="Peanut" className="peanut" />
            <img src={gem} alt="Gem" className="gem" />
          </div>
        </div>
      </section>

      <section className="second-section">
        <div className="container">
          <div className="content-wrapper">
            <div className="img-section"></div>
            <div className="content-section">
              <h2>TASTE THE DIFFERENCE.</h2>
              <div className="sub-heading">Real Eggs, Real Butter, Real Sugar.</div>
              <p>
              Miss Cheesecake is a delightful dessert brand founded by two passionate individuals, Pooja Balani and Narpat Singh Rathore. Pooja, with her love for fine desserts and a keen eye for detail, brings a creative touch to every cheesecake she crafts. Narpat, on the other hand, brings his extensive knowledge of business and operations, ensuring that each customer experiences the highest quality and service.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* <h1 className="product-heading">Best Products</h1>


      <div className="top-products">
     {
     products.map((topProducts)=>{
      if(topProducts && topProducts.images && topProducts.images[0] && topProducts.images[0].src){return <div key={topProducts.id} className="show-products">
          <img src={topProducts.images[0].src} onClick={()=>navigate(`/${topProducts.id}`)} />
          <p style={{fontSize:"10px"}}>{topProducts.title}</p>
          <div className='product-card-price-container'><span>₹ </span>{topProducts.variants[0].price} <span>₹ </span><span className='compare-price'>{topProducts.variants[0].compare_at_price}</span></div>
      </div>
      }
  })
    }
    </div> */}

    <div style={{height:"50px"}}></div>
    <Footer />
    </div>
  );
};

export default App;
