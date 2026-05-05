// src/pages/ProductDetails.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md flex flex-col md:flex-row gap-10 p-8">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className="text-primary-500 capitalize text-sm mb-2">{product.category}</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{product.title}</h2>
          <p className="text-primary-600 dark:text-primary-400 text-4xl font-bold mb-4">${product.price}</p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{product.description}</p>

          <div className="flex gap-3">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-primary-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`px-4 py-3 rounded-xl border-2 transition ${
                wishlisted
                  ? 'border-pink-400 text-pink-500 bg-pink-50 dark:bg-pink-900/20'
                  : 'border-gray-200 dark:border-gray-600 text-gray-400 hover:border-pink-400 hover:text-pink-500'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={wishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <Link to="/" className="mt-4 text-center text-primary-500 hover:underline text-sm">
            ← Back to shop
          </Link>
        </div>
      </div>
    </div>
  );
}
