import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Data from './components/Data';
import SearchResultsList from "./common/header/SearchResultsList";
import Search from './common/header/Search';
import Footer from './common/footer/Footer';
import Pages from "./pages/Pages";
import ProductPage from './common/header/ProductPage';
import Header from './common/header/Header';
import Sdata from "./components/shops/Sdata";
import Cart from "./common/Cart/Cart";

function App() {
  const [results, setResults] = useState([]);

  const { productItems } = Data;
  const { shopItems } = Sdata;

  const [CartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)));
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)));
    }
  };

  const removeProduct = (product) => {
    const productExist = CartItem.find((item) => item.id === product.id);

    if (productExist) {
      if (productExist.qty === 1) {
        setCartItem(CartItem.filter((item) => item.id !== product.id));
      } else {
        setCartItem(
          CartItem.map((item) =>
            item.id === product.id ? { ...productExist, qty: productExist.qty - 1 } : item
          )
        );
      }
    }
  };

  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <Routes>
          <Route path="/" element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} removeProduct={removeProduct} />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path='/cart' element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} removeProduct={removeProduct} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;