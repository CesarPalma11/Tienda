import React from 'react';
import { Link } from 'react-router-dom';

const Favoritos = ({ favoriteItems, toggleFavorite }) => {
  return (
    <div className='favorites'>
      <h2>Favoritos</h2>
      {favoriteItems.length === 0 ? (
        <p>No hay productos en favoritos.</p>
      ) : (
        favoriteItems.map((item) => (
          <div key={item.id} className='product mtop'>
            <div className='img'>
              <span className='discount'>{item.discount}% Off</span>
              <img src={item.cover} className="image-items" alt='' />
              <div className='product-like'>
                <i
                  className='fa fa-heart'
                  onClick={() => toggleFavorite(item.id)}
                  style={{ color: 'red' }}
                ></i>
              </div>
            </div>
            <div className='product-details'>
              <h3>{item.name}</h3>
              <div className='rate'>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
              </div>
              <div className='price'>
                <h4>${item.price}.00</h4>
                <button>
                  <Link to={`/product/${item.id}`}>
                    <i className='fa fa-plus'></i>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Favoritos;