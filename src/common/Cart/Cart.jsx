import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const Cart = ({ CartItem, addToCart, decreaseQty, removeProduct }) => {
  // Step: 7 calculate total of items
  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0);

  // Calculate total quantity of items
  const totalItems = CartItem.reduce((total, item) => total + item.qty, 0);

  // product qty total
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago('TEST-5b5b7d16-52d0-49be-afbb-903fff115ba1', {
    locale: "es-AR"
  });

  const createPreference = async (items) => {
    try {
      console.log("Items to create preference", items);
      const response = await axios.post("http://localhost:3000/create_preference", {
        items: items.map(item => ({
          title: item.name,
          quantity: item.qty,
          unit_price: item.price,
        }))
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference(CartItem);
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <>
      <section className='cart-items'>
        <div className='container d_flex'>
          <div className='cart-details'>
            {CartItem.length === 0 && (
              <h1 className='no-items product'>No hay productos en el carrito <a href="/" className="btn-buy">Empezar a comprar!</a></h1>
            )}
            {CartItem.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className='cart-list product d_flex' key={item.id}>
                  <div className='img'>
                    <img src={item.cover} alt={item.name} />
                  </div>
                  <div className='cart-details'>
                    <h3>{item.name}</h3>
                    <h4>
                      <span>Productos ({item.qty})</span>
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button className='removeCartButton' onClick={() => removeProduct(item)}>
                        <i className='fa-solid fa-xmark'></i>
                      </button>
                    </div>
                    <div className='cartControl d_flex'>
                      <button className='incCart' onClick={() => addToCart(item)}>
                        <i className='fa-solid fa-plus'></i>
                      </button>
                      <button className='desCart' onClick={() => decreaseQty(item)}>
                        <i className='fa-solid fa-minus'></i>
                      </button>
                    </div>
                  </div>
                  <div className='cart-item-price'></div>
                </div>
              );
            })}
          </div>
          {CartItem.length > 0 && (
            <div className='cart-total product'>
              <h2>Resumen de la compra</h2>
              <div className='d_flex'>
                <h4>Productos</h4>
                <h3>{totalItems}</h3>
              </div>
              <div className='d_flex'>
                <h4>Total</h4>
                <h3>${totalPrice}.00</h3>
              </div>
              <button className="btn-comprar" onClick={handleBuy}>Iniciar Compra</button>
              {preferenceId && (
                <Wallet
                  initialization={{ preferenceId }}
                  customization={{ texts: { valueProp: 'smart_option' } }}
                />
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
