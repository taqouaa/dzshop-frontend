// src/pages/Wishlist.jsx
import { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (wishlist.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤍</div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Your Wishlist is Empty</h2>
          <Link to="/" className="text-primary-600 font-bold hover:underline">← Discover products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          My Wishlist
          <span className="text-sm font-normal text-gray-400 ml-2">({wishlist.length} items)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 border border-silver-200 dark:border-gray-700 p-4 rounded-xl shadow-sm flex flex-col">
              <Link to={`/product/${product.id}`}>
                <div className="h-48 flex items-center justify-center mb-4">
                  <img src={product.image} alt={product.title} className="max-h-full object-contain" />
                </div>
                <h3 className="text-sm font-semibold truncate text-gray-800 dark:text-white">{product.title}</h3>
                <p className="text-gray-400 text-xs mt-1 capitalize">{product.category}</p>
              </Link>

              <p className="text-primary-600 dark:text-primary-400 font-bold mt-2">${product.price}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-primary-600 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-primary-700 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="px-3 py-1.5 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs font-bold transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
