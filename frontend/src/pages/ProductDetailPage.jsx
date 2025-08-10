import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        setProduct(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Hindi makita ang produkto o may problema sa server.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center p-5 text-xl">Loading product details...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-5 text-xl text-red-600">{error}</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center p-5 text-xl">Product not found.</div>
    );
  }

  return (
    <div className="p-10 max-w-3xl mx-auto my-10 border border-gray-200 rounded-lg shadow-xl bg-white flex flex-col items-center font-sans">
      <img
        src={product.imageUrl || "https://placehold.co/600x400?text=No+Image"}
        alt={product.name}
        className="w-full max-w-md h-auto rounded-lg mb-8 object-cover shadow-md"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">{product.name}</h1>
      <p className="text-3xl font-extrabold text-blue-600 mb-6">
        Php {product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
        {product.description}
      </p>
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => addToCart(product)}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md text-lg font-semibold"
        >
          Add to Cart
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md text-lg font-semibold"
        >
          Back to Products
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;