// src/components/Navbar.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { DarkModeContext } from '../context/DarkModeContext';
import { SearchContext } from '../context/SearchContext';

export default function Navbar() {
  const { totalItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { dark, toggleDark } = useContext(DarkModeContext);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Navigate to home if not already there
    if (window.location.pathname !== '/') navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary-700 dark:bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide shrink-0">
          Pixel<span className="text-silver-300">Shop</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-full text-sm bg-primary-600 dark:bg-gray-700 text-white placeholder-primary-200 dark:placeholder-gray-400 border border-primary-500 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-silver-300"
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4 text-white font-semibold shrink-0">

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDark}
            className="p-2 rounded-full hover:bg-primary-600 dark:hover:bg-gray-700 transition"
            title="Toggle Dark Mode"
          >
            {dark ? (
              // Sun icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              // Moon icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative hover:text-silver-300 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={wishlist.length > 0 ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-silver-300 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Admin */}
          <Link to="/login" className="text-sm hover:text-silver-300 transition">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
