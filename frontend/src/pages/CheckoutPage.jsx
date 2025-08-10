import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const { cartItems, getTotalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  // State para sa form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  // State para sa loading at success messages
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.zip) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call for order submission
      // In a real app, you would send formData and cartItems to your backend
      // await axios.post('http://localhost:3001/api/orders', { customerInfo: formData, items: cartItems, total: getTotalAmount() });

      // Simulate a delay for network request
      await new Promise(resolve => setTimeout(resolve, 1500));

      setOrderPlaced(true); // Ipakita ang success message
      clearCart(); // I-clear ang cart pagkatapos ng successful order
    } catch (err) {
      console.error('Error placing order:', err);
      setError('May problema sa pag-place ng order. Pakisubukang muli.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
          <h1 className="text-4xl font-bold text-green-600 mb-6">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-700 mb-8">
            Thank you for your purchase. Your order has been confirmed and will be processed soon.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md text-lg font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-2xl mx-auto my-10 border border-gray-200 rounded-lg shadow-xl bg-white font-sans">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-xl text-gray-600">
          Your cart is empty. Please add items to proceed to checkout. <br />
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-lg font-semibold shadow-md"
          >
            Go to Products
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Information</h2>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="john.doe@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="123 Main St"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Manila"
                required
              />
            </div>
            <div>
              <label htmlFor="zip" className="block text-gray-700 text-sm font-bold mb-2">Zip Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="1000"
                required
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Order Summary</h2>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                <span className="font-semibold text-gray-800">
                  Php {(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center py-2 mt-2 font-bold text-lg text-gray-900">
              <span>Total:</span>
              <span>Php {getTotalAmount().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 text-lg font-semibold shadow-md"
            >
              Back to Cart
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 text-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CheckoutPage;