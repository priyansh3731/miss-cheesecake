import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import OrderProduct from './pages/OrderProduct';
import ProductPage from './pages/ProductPage';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyAndPolicy from './pages/PrivacyAndPolicy';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs'; // Import the ContactUs page

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/order' element={<OrderProduct />} />
      <Route path='/:id' element={<ProductPage />} />
      <Route path='/shipping-policy' element={<ShippingPolicy />} />
      <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
      <Route path='/privacy-and-policy' element={<PrivacyAndPolicy />} />
      <Route path='/about-us' element={<AboutUs />} />
      <Route path='/contact-us' element={<ContactUs />} /> {/* Added Contact Us route */}
    </Routes>
  );
}

export default App;
