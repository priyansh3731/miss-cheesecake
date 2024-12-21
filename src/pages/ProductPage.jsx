import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactImageMagnify from 'react-image-magnify';
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";



import "../css/Product.css"
import { database, onValue, ref } from "../config";
import { ProductContext } from "../context/ProductContext";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const ProductPage = () => {
    const location = useLocation();
    const { id } = useParams(); // Extracting id from URL params
    const [product, setProduct] = useState(null); // Initialize as null for clarity
    const [products, setProducts] = useState([]);
    const [images,setImage] = useState([]);
    const navigate = useNavigate();
    const {Productsdata,setProductsData} = useContext(ProductContext)

    const clickhandler=()=>{
        // Find the index of the existing product in the Productsdata array
        const productIndex = Productsdata.findIndex(data => data.id === id);
    
        // Create a new array to avoid direct state mutation
        const updatedProductsData = [...Productsdata];
    
        if (productIndex !== -1) {
            // Product exists in the cart, so update its quantity
            updatedProductsData[productIndex] = {
                ...updatedProductsData[productIndex],
                qtn: updatedProductsData[productIndex].qtn + 1
            };
        } else {
            // Product does not exist in the cart, so add it with the given 1
            updatedProductsData.push({ ...product, qtn: 1 });
        }
    
        // Update the state with the new array
        setProductsData(updatedProductsData);

        navigate('/order')
      
      }

    useEffect(() => {
        const productRef = ref(database, `products/${id}`);
        onValue(productRef, (snapshot) => {
        const productData = snapshot.val();
        if (productData) {
            // Here you can handle the single product data as needed
            setProduct(productData);
            setImage(productData.images)
        } else {
            console.log(`Product with ID ${id} not found`);
        }
        });
    }, []); // Include products and id in the dependency array



    useEffect(() => {
        const productsRef = ref(database, 'products');
        onValue(productsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const productsArray = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
            setProducts(productsArray)
            console.log(productsArray)
            }
        });
      }, []);


      const navigateHandler=(id)=>{
        navigate(`/${id}`)
        window.location.reload();
      }

    return (
        <div>
            {product ? (
                <>
                <Navbar />
                    <div className="product-container">
                        <div className="product-image">
                        <Carousel showStatus={false} showIndicators={false} swipeable={true}>
                            {
                                images.map(({src})=>{
                                    if(src){
                                        return<ReactImageMagnify key={src} {...{
                                            smallImage: {
                                                alt: 'Wristwatch by Ted Baker London',
                                                isFluidWidth: true,
                                                src: src
                                            },
                                            largeImage: {
                                                src: src,
                                                width: 1200,
                                                height: 1800
                                            },
                                            lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                                            enlargedImagePosition: "over"
                                        }} />
                                    }
                                })
                            }
                            </Carousel>
                        </div>

                        <div style={{width:"10%"}}></div>

                        <div className="product-details">
                            <span className="product-title">{product.title}</span>
                            <p className="product-sitdesc" dangerouslySetInnerHTML={{ __html: product.vendor }} />
                            <div className="prices">
                                <span className="current-price">₹{+product.variants[0].price}</span>
                                <span className="old-price">₹{+product.variants[0].compare_at_price}</span>
                            </div>                            
                            <div style={{height:"10px"}}></div>
                            <button onClick={clickhandler} className="buy-button">Buy Now</button>
                            <div style={{height:"10px"}}></div>
                            <div className="product-sitdesc2" dangerouslySetInnerHTML={{ __html: `<h3>Description</h3>${product.body_html}` }} />
                            <div className="product-sitdesc2">
                                <h3>Shipping Details</h3>
                                <p>{`1) - Express shipping within 5 to 7 days`}</p>
                                <p>{`2) - 7 days return policy`}</p>
                                <p>{`3) - International shipping will be delivered in 20 days`}</p>
                            </div>    
                        </div>
                    </div>      
                    <div style={{height:"50px"}}></div>
                        <h2 style={{paddingLeft:"20px"}}>Top Products</h2>
                        <div className="top-products">
                        {
                            products.slice(0, 5).map((topProducts)=>{
                                if(topProducts && topProducts.images && topProducts.images[0] && topProducts.images[0].src){
                                    return <div key={topProducts.id} className="show-products">
                                    <img src={topProducts.images[0].src} onClick={()=>navigateHandler(topProducts.id)} />
                                    <p style={{fontSize:"10px"}}>{topProducts.title}</p>
                                    <div style={{fontSize:"14px",display:"flex", width:"100%"}}><span>₹ </span>{topProducts.variants[0].price} <span>₹ </span><span className='compare-price'>{topProducts.variants[0].compare_at_price}</span></div>
                                </div>
                                }
                            })
                        }
                    </div>     
                    <Footer />
                    </>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default ProductPage;
