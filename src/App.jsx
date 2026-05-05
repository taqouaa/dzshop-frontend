// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider }    from './context/ToastContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { SearchProvider }   from './context/SearchContext';
import { CartProvider }     from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar          from './components/Navbar';
import Footer          from './layouts/Footer';
import Home            from './pages/Home';
import ProductDetails  from './pages/ProductDetails';
import Cart            from './pages/Cart';
import Wishlist        from './pages/Wishlist';
import Login           from './pages/Login';
import Admin           from './pages/Admin';
import NotFound        from './pages/NotFound';

export default function App() {
  return (
    <DarkModeProvider>
      <ToastProvider>
        <SearchProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/"           element={<Home />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/cart"        element={<Cart />} />
                      <Route path="/wishlist"    element={<Wishlist />} />
                      <Route path="/login"       element={<Login />} />
                      <Route path="/admin"       element={<Admin />} />
                      <Route path="*"            element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </WishlistProvider>
          </CartProvider>
        </SearchProvider>
      </ToastProvider>
    </DarkModeProvider>
  );
}
