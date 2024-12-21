import React, { useContext, useEffect, useState } from 'react';
import '../css/home.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { ProductContext } from '../context/ProductContext';
import { database, onValue, ref } from '../config';
import Footer from '../component/Footer';
import { Helmet } from 'react-helmet';
import banner from '../assets/banner.png'


function App() {

  const navigate = useNavigate();
  const [products, setProduct] = useState([]);
  const [qty, setQty] = useState(1);
  const [qty1, setQty1] = useState(1);
  const [kashmiriProducts, setKashmiriProducts] = useState([]);
  const [iraniProducts, setIraniProducts] = useState([]);
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

  // Update kashmiriProducts whenever products changes
  useEffect(() => {
    const temp = products.filter((product) => product.product_type.toLowerCase().includes("kashmiri saffron"));
    setKashmiriProducts(temp);
  }, [products]); // This effect runs whenever products changes


  useEffect(() => {
    const temp = products.filter((product) => product.product_type.toLowerCase().includes("irani saffron"));
    setIraniProducts(temp);
  }, [products]); // This effect runs whenever products changes


  return products.length>0 && kashmiriProducts.length>0 ? <>
  <Helmet>
        <title>Miss Cheesecake</title>
        <meta name="description" content="Kashmiri saffron, also known as 'Kong,' is a highly prized variety from Kashmir, India. Renowned for its deep crimson color, intense aroma, and rich flavor, it is one of the finest saffron types in the world." />
        <meta name="keywords" content="Kashmiri saffron, Kong saffron, best saffron, deep crimson saffron, saffron aroma, saffron flavor, finest saffron" />
        <link rel="canonical" href={"https://www.misscheesecake.co.in/"} />
  </Helmet>
      
  <Navbar />
  <img src={banner} style={{width:"100%"}}/>
    {
      kashmiriProducts.slice(0, 1).map((product) => {
        // Check if product and its nested properties are defined
        if (product && product.images && product.images[0] && product.images[0].src) {
          return (
            <div key={product.id} className='kashmiri-kesar-product-container'>
              <img
                src={product.images[0].src}
                onClick={() => navigate(`/${product.id}`)}
                alt={product.title} // Adding an alt attribute for better accessibility
              />
              <div className='detail-container'>
              <p className='product-type'>{product.product_type}</p>
              <p style={{fontSize: "30px", fontWeight: "500"}}>{product.title}</p>
              <p>
                <span className='rupee-symbol'>₹ </span>{product.variants[0].price}.00
              </p>
              <div style={{height:"10px"}}></div>
              <p style={{fontSize:"12px"}}>Quantity</p>
              <div className='qty-container'>
                <p className='qty-button' onClick={qtyHandler}>-</p>{qty}<p className='qty-button' onClick={()=>setQty(qty => qty+1)}>+</p>
                </div>
              <button className='add-button' onClick={()=>orderHandler(product,qty)}>Add To Cart</button>
              <button
                className='buy-button2'
                onClick={() => {
                  orderHandler(product,qty)
                  navigate('/order');
                }}
              >
                Buy Now
              </button>
              </div>
            </div>
          );
        } else {
          // Handle cases where product is missing or has undefined properties
          return <div key="default">Product information is incomplete.</div>;
        }
      })      
    }
    <p className='heading'>Kashmiri Kesar</p>
    <div className="top-products">
    {
     kashmiriProducts.slice(0, 5).map((topProducts)=>{
      if(topProducts && topProducts.images && topProducts.images[0] && topProducts.images[0].src){
        return <div key={topProducts.id} className="show-products">
          <img src={topProducts.images[0].src} onClick={()=>navigate(`/${topProducts.id}`)} />
          <p style={{fontSize:"10px"}}>{topProducts.title}</p>
          <div className='product-card-price-container'><span>₹ </span>{topProducts.variants[0].price} <span>₹ </span><span className='compare-price'>{topProducts.variants[0].compare_at_price}</span></div>
      </div>
      }
  })
    }
    </div>



    {
      iraniProducts.slice(0, 1).map((product) => {
        // Check if product and its nested properties are defined
        if (product && product.images && product.images[0] && product.images[0].src) {
          return (
            <div key={product.id} className='kashmiri-kesar-product-container'>
              <img
                src={product.images[0].src}
                onClick={() => navigate(`/${product.id}`)}
                alt={product.title} // Adding an alt attribute for better accessibility
              />
              <div className='detail-container'>
              <p className='product-type'>{product.product_type}</p>
              <p style={{fontSize: "30px", fontWeight: "500"}}>{product.title}</p>
              <p>
                <span className='rupee-symbol'>₹ </span>{product.variants[0].price}.00
              </p>
              <div style={{height:"10px"}}></div>
              <p style={{fontSize:"12px"}}>Quantity</p>
              <div className='qty-container'>
                <p className='qty-button' onClick={qtyHandler1}>-</p>{qty1}<p className='qty-button' onClick={()=>setQty1(qty1 => qty1+1)}>+</p>
                </div>
              <button className='add-button' onClick={()=>orderHandler(product,qty1)}>Add To Cart</button>
              <button
                className='buy-button2'
                onClick={() => {
                  orderHandler(product,qty1)
                  navigate('/order');
                }}
              >
                Buy Now
              </button>
              </div>
            </div>
          );
        } else {
          // Handle cases where product is missing or has undefined properties
          return <div key="default">Product information is incomplete.</div>;
        }
      })      
    }
    <p className='heading'>Irani Kesar</p>
    <div className="top-products">
    {
     iraniProducts.slice(0, 5).map((topProducts)=>{
      if(topProducts && topProducts.images && topProducts.images[0] && topProducts.images[0].src){return <div key={topProducts.id} className="show-products">
          <img src={topProducts.images[0].src} onClick={()=>navigate(`/${topProducts.id}`)} />
          <p style={{fontSize:"10px"}}>{topProducts.title}</p>
          <div className='product-card-price-container'><span>₹ </span>{topProducts.variants[0].price} <span>₹ </span><span className='compare-price'>{topProducts.variants[0].compare_at_price}</span></div>
      </div>
      }
  })
    }
    </div>
    <div style={{height:"50px"}}></div>
    <Footer />
  </> : <div>Loading .....</div>
}

export default App;