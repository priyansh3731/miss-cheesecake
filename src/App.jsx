import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import OrderProduct from './pages/OrderProduct'
import ProductPage from './pages/ProductPage'
import ShippingPolicy from './pages/ShippingPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyAndPolicy from './pages/PrivacyAndPolicy'

function App() {

  return (
   <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/order' element={<OrderProduct />} > </Route>
    <Route path='/:id' element={<ProductPage />} ></Route>
    <Route path='/shiping-policy' element={<ShippingPolicy />} ></Route>
    <Route path='/terms-and-conditions' element={<TermsAndConditions />} ></Route>
    <Route path='/privacy-and-policy' element={<PrivacyAndPolicy />} ></Route>
   </Routes>
  )
}

export default App
