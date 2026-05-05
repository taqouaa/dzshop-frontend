// src/layouts/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-primary-900 dark:bg-gray-950 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h2 className="text-2xl font-bold">Pixel<span className="text-silver-300">Shop</span></h2>
          <p className="text-primary-300 mt-2 text-sm">
            Your premium e-commerce destination. Built with React & Tailwind.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-silver-300">Quick Links</h3>
          <ul className="text-primary-300 text-sm space-y-1">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Wishlist</li>
            <li className="hover:text-white cursor-pointer">Cart</li>
            <li className="hover:text-white cursor-pointer">Admin Login</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-silver-300">Contact Us</h3>
          <p className="text-primary-300 text-sm">Email: contact@pixelshop.dz</p>
          <p className="text-primary-300 text-sm">Phone: +213 555 00 00 00</p>
        </div>
      </div>
      <div className="border-t border-primary-800 mt-8 pt-4 text-center text-primary-400 text-xs">
        © 2026 University of Mila - Master STIC. All rights reserved.
      </div>
    </footer>
  );
}
