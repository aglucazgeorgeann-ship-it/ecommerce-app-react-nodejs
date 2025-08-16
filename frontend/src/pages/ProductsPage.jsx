import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import useCart

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Gamitin ang addToCart mula sa context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // BINAGO DITO: Gamitin ang live backend URL
        const response = await axios.get('https://ecommerce-app-react-nodejs-1.onrender.com/api/products');
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Hindi makakonekta sa server. Pakisigurado na tumatakbo ang backend.'); // Mas specific na error message
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-5 text-xl">Loading products...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-5 text-xl text-red-600">{error}</div>
    );
  }

  return (
    <div className="p-5 font-sans">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">Our Products</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg p-4 w-64 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center bg-white cursor-pointer"
          >
            <Link to={`/products/${product.id}`} className="no-underline text-inherit w-full text-center">
              <img
                src={product.imageUrl || "https://placehold.co/600x400?text=No+Image"} // Fallback image
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-700 mb-1">{product.name}</h3>
              <p className="text-xl font-bold text-blue-600 mb-3">
                Php {product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </Link>
            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
