import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";
import FeaturedProducts from "./Components/FeaturedProducts";
import Testimonals from "./Components/Testimonals";
import Offers from "./Components/Offers";
import Newsletter from "./Components/Newsletter";
import NewArrivals from "./Components/NewArrivals";
import Categories from "./Components/Categories";
import Login from "./Components/Login";
import Register from "./Components/Register";
import CartProduct from "./Components/CartProduct";
import "./App.css";
import { CartProvider } from "./Components/CartContext";

function App() {
  return (
    <CartProvider>
      <Header />
      <HeroSection />
      <BrowserRouter>
        <Routes>
          <Route path="/cart" element={<CartProduct />} />
          <Route path="/product" element={<FeaturedProducts />} />
          <Route path="/new-arrivals" element={<NewArrivals />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Categories />
      <Offers />
      <Newsletter />
      <NewArrivals />
      <Testimonals />
      <Footer />
    </CartProvider>
  );
}

export default App;
