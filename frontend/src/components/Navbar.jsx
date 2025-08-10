import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { getTotalItems } = useCart();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-md font-sans rounded-lg m-2">
      <Link to="/" className="text-white text-2xl font-bold no-underline hover:text-gray-300 transition duration-300">
        My eStore
      </Link>
      <div>
        <Link to="/" className="text-white ml-6 text-lg no-underline hover:text-gray-300 transition duration-300">
          Products
        </Link>
        <Link to="/admin" className="text-white ml-6 text-lg no-underline hover:text-gray-300 transition duration-300">
          Admin
        </Link> {/* Idinagdag mo ito */}
        <Link to="/cart" className="text-white ml-6 text-lg no-underline relative hover:text-gray-300 transition duration-300">
          Cart ({getTotalItems()})
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 rounded-full px-2 py-0.5 text-xs text-white">
              {getTotalItems()}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
