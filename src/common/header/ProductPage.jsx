import React from 'react';
import { useParams } from 'react-router-dom';
import Data from '../../components/Data'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import './ProductPage.css'
const ProductPage = () => {
  const { id } = useParams();
  const product = Data.productItems.find(item => item.id === parseInt(id));

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={product.cover} alt={product.name} className='image-product'/>
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <h2>Precio: ${product.price}</h2>
        <p>{product.description}</p>
        <h3>Especificaciones técnicas:</h3>
        <ul>
          {product.specifications.map(spec => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
        <h3>Reseñas:</h3>
        <div className="reviews">
          {product.reviews.map(review => (
            <div key={review.id}>
              <p>{review.author}</p>
              <p>{review.content}</p>
              <p>Puntuación: {review.rating}</p>
            </div>
          ))}
        </div>
        <div className='buttons'>
          <button className='btn-product'>Agregar al carrito</button>
          <button className='btn-product'>Comprar ahora</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;