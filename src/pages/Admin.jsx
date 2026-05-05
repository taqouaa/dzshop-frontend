// src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    fetch(`${API_URL}/products?limit=100`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products from backend.');
        setLoading(false);
      });
  }, [navigate]);

  const deleteProduct = async (id) => {
    if (!window.confirm(`Delete product #${id}?`)) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || 'Delete failed.');
      }
    } catch {
      alert('Cannot connect to server.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Admin Dashboard
            <span className="text-sm font-normal text-gray-400 ml-3">DZ-Shop</span>
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-600 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-primary-700 text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-4 text-gray-500 dark:text-gray-400">{p.id}</td>
                  <td className="p-4">
                    <img src={p.image} className="h-10 w-10 object-contain" alt={p.title} />
                  </td>
                  <td className="p-4 text-sm truncate max-w-xs text-gray-800 dark:text-white">{p.title}</td>
                  <td className="p-4 font-bold text-primary-600 dark:text-primary-400">${p.price}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{p.stock}</td>
                  <td className="p-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition">
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
