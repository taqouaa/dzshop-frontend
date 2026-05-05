// src/components/ProductCard.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="bg-white dark:bg-gray-800 border border-silver-200 dark:border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-lg transition flex flex-col relative">

      {/* Heart Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white dark:bg-gray-700 shadow hover:scale-110 transition"
        title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transition ${wishlisted ? 'text-pink-500' : 'text-gray-300 dark:text-gray-500'}`}
          fill={wishlisted ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Product Image & Info */}
      <Link to={`/product/${product.id}`} className="flex-1">
        <div className="h-48 flex items-center justify-center overflow-hidden mb-4">
          <img src={product.image} alt={product.title} className="max-h-full object-contain" />
        </div>
        <h3 className="text-sm font-semibold truncate text-gray-800 dark:text-white">{product.title}</h3>
        <p className="text-gray-400 text-xs mt-1 capitalize">{product.category}</p>

        {/* ⭐ Star Rating */}
        {product.rating && (
          <StarRating rate={product.rating.rate} count={product.rating.count} />
        )}
      </Link>

      <div className="flex justify-between items-center mt-3">
        <span className="text-primary-600 dark:text-primary-400 font-bold">${product.price}</span>
        <button
          onClick={() => addToCart(product)}
          className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-lg text-xs font-bold hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
