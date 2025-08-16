import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart, clearCart, getTotalAmount } = useCart();
  const navigate = useNavigate();

  return (
    <div className="p-10 max-w-4xl mx-auto my-10 border border-gray-200 rounded-lg shadow-xl bg-white font-sans">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-xl text-gray-600">
          Your cart is empty. <br />
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-lg font-semibold shadow-md"
          >
            Go to Products
          </button>
        </div>
      ) : (
        <div>
          {/* Cart Items List */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center mb-6 pb-4 border-b border-gray-200 last:border-b-0"
            >
              <img
                src={item.imageUrl || "https://placehold.co/100x100?text=No+Image"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md mr-6 shadow-sm"
              />
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-700 mb-1">{item.name}</h3>
                <p className="text-gray-600 mb-1">Quantity: {item.quantity}</p>
                <p className="text-xl font-bold text-blue-600">
                  Php {(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 shadow-md"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="mt-8 pt-6 border-t-2 border-blue-500 text-right">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Total: Php {getTotalAmount().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={clearCart}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 text-lg font-semibold shadow-md"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate('/checkout')}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 text-lg font-semibold shadow-md"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
