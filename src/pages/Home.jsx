// src/pages/Home.jsx
import { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import Carousel from '../components/Carousel';
import { SearchContext } from '../context/SearchContext';

const API_URL = import.meta.env.VITE_API_URL;

const categories = ['all', "men's clothing", "women's clothing", "electronics", "jewelery"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { searchQuery } = useContext(SearchContext);

  useEffect(() => {
    setLoading(true);

    // Build query string with pagination + category filter
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('limit', 8);
    if (category !== 'all') params.set('category', category);

    fetch(`${API_URL}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, [category, page]);

  // Reset to page 1 when category changes
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  let filtered = products;

  if (searchQuery.trim()) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  if (sortBy === 'price-asc')  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'alpha')      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Carousel />
      <div className="p-8 max-w-7xl mx-auto">

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full capitalize font-semibold text-sm transition ${
                category === cat
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-silver-200 dark:border-gray-700 hover:border-primary-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort + Count */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {searchQuery ? `Results for "${searchQuery}"` : 'Explore Our Collection'}
            {!loading && (
              <span className="text-sm font-normal text-gray-400 dark:text-gray-500 ml-2">
                ({filtered.length} products)
              </span>
            )}
          </h2>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-silver-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="alpha">Alphabetical (A–Z)</option>
          </select>
        </div>

        {/* Grid: Skeletons or Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
              ? (
                <div className="col-span-full text-center py-20 text-gray-400 dark:text-gray-500 text-xl">
                  No products found.
                </div>
              )
              : filtered.map((item) => <ProductCard key={item.id} product={item} />)
          }
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 disabled:opacity-40 hover:border-primary-400 transition"
            >
              ← Previous
            </button>
            <span className="px-4 py-2 font-semibold text-gray-600 dark:text-gray-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 disabled:opacity-40 hover:border-primary-400 transition"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
