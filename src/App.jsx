import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Navbar from "./components/Navbar";
import axios from "axios";
import Footer from "./components/Footer";
import SingleProduct from "./Pages/SingleProduct";
import CategoryProduct from "./Pages/CategoryProduct";
import CartContext from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  const [location, setLocation] = useState();
  const [openDropDown, setOpenDropDown] = useState(false);
  const {cartItem,setCartItem}=useContext(CartContext)

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
     
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json
`;
      try {
        const location = await axios.get(url);
     
        const exactLocation = location.data.address;
        setLocation(exactLocation);
        setOpenDropDown(false);
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(() => {
    getLocation();
  }, []);


  // Load Cart from local storage on intial render


  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if(storedCart){
      setCartItem(JSON.parse(storedCart))
    }
  }, []);


  // Save Cart to local storage whenever it changes


  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }, [cartItem])





  return (
    <BrowserRouter>
      <Navbar
        location={location}
        getLocation={getLocation}
        openDropDown={openDropDown}
        setOpenDropDown={setOpenDropDown}
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:id" element={<SingleProduct/>}></Route>
        <Route path='/category/:category' element={<CategoryProduct/>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/cart" element={<ProtectedRoute>
          <Cart location={location} getLocation={getLocation} />
       </ProtectedRoute> }></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
