// src/context/WishlistContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { ToastContext } from './ToastContext';

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { addToast } = useContext(ToastContext);

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('pixelshop_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('pixelshop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        addToast('Removed from wishlist.', 'info');
        return prev.filter((item) => item.id !== product.id);
      }
      addToast('Saved to wishlist! 💜', 'wish');
      return [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}
