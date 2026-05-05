// src/pages/Cart.jsx
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function Cart() {
  const { cart, totalPrice, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // 'success' | 'error'
  const [orderMessage, setOrderMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({ name: '', email: '', address: '', card: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.address.trim()) newErrors.address = 'Shipping address is required.';
    if (!form.card.trim()) {
      newErrors.card = 'Card number is required.';
    } else if (!/^\d{16}$/.test(form.card.replace(/\s/g, ''))) {
      newErrors.card = 'Card number must be exactly 16 digits.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setOrderStatus(null);

    try {
      // Get the logged-in user from localStorage
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!userData || !token) {
        setOrderStatus('error');
        setOrderMessage('You must be logged in to place an order.');
        setLoading(false);
        return;
      }

      const user = JSON.parse(userData);

      // Build the items array for the backend
      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id, items }),
      });

      const data = await response.json();

      if (!response.ok) {
        setOrderStatus('error');
        setOrderMessage(data.error || 'Order failed. Please try again.');
        setLoading(false);
        return;
      }

      // Success!
      clearCart();
      setIsModalOpen(false);
      setForm({ name: '', email: '', address: '', card: '' });
      setOrderStatus('success');
      setOrderMessage(`🎉 Order #${data.id} placed successfully! Total: $${data.totalPrice?.toFixed(2)}`);
    } catch (err) {
      setOrderStatus('error');
      setOrderMessage('Cannot connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && orderStatus !== 'success') {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Your Cart is Empty</h2>
          <Link to="/" className="text-primary-600 font-bold hover:underline">← Go back to shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto p-8 mt-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Shopping Cart</h2>

        {/* Order status messages */}
        {orderStatus === 'success' && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 text-green-700 dark:text-green-400 p-4 rounded-xl mb-6 text-center font-semibold">
            {orderMessage}
            <div className="mt-3">
              <Link to="/" className="text-primary-600 font-bold hover:underline">← Continue Shopping</Link>
            </div>
          </div>
        )}
        {orderStatus === 'error' && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-center font-semibold">
            {orderMessage}
          </div>
        )}

        {cart.length > 0 && (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row items-center justify-between border-b dark:border-gray-700 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0 gap-4">
                  <div className="flex items-center gap-4 w-full md:w-2/5">
                    <img src={item.image} alt={item.title} className="h-16 w-16 object-contain" />
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-2">{item.title}</h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 font-bold text-gray-600 dark:text-gray-300 transition">
                      -
                    </button>
                    <span className="font-bold w-6 text-center dark:text-white">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 font-bold text-gray-600 dark:text-gray-300 transition">
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg text-primary-600 dark:text-primary-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm font-bold bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-lg hover:bg-red-100 transition">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                Grand Total: <span className="text-3xl text-primary-600 dark:text-primary-400">${totalPrice.toFixed(2)}</span>
              </span>
              <button onClick={() => setIsModalOpen(true)}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-green-700 transition w-full md:w-auto">
                Checkout Now
              </button>
            </div>
          </>
        )}

        {/* Checkout Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Secure Checkout</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Total: <strong className="text-primary-600">${totalPrice.toFixed(2)}</strong>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Full Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe"
                    className={`w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com"
                    className={`w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Shipping Address</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="123 Main St, Mila, Algeria"
                    className={`w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 ${errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Card Number (16 digits)</label>
                  <input type="text" name="card" value={form.card} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength={16}
                    className={`w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-400 ${errors.card ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                  {errors.card && <p className="text-red-500 text-xs mt-1">{errors.card}</p>}
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg font-bold hover:bg-gray-300 transition">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition disabled:opacity-60">
                    {loading ? 'Placing Order...' : 'Confirm & Pay'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
