// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [count, setCount] = useState(5);

  // Auto-redirect countdown
  useEffect(() => {
    if (count <= 0) {
      window.location.href = '/';
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">

        {/* Big 404 */}
        <div className="relative mb-6">
          <h1 className="text-[10rem] font-black leading-none text-primary-100 dark:text-primary-900 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🔍</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-base leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
          <br />
          Redirecting to Home in{' '}
          <span className="text-primary-600 dark:text-primary-400 font-bold">{count}</span>s...
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition"
          >
            ← Back to Home
          </Link>
          <Link
            to="/wishlist"
            className="border-2 border-primary-300 dark:border-primary-700 text-primary-600 dark:text-primary-400 px-6 py-3 rounded-xl font-bold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition"
          >
            My Wishlist 💜
          </Link>
        </div>
      </div>
    </div>
  );
}
