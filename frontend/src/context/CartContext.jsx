import React, { createContext, useState, useEffect, useContext } from 'react';

// Gumawa ng Cart Context
export const CartContext = createContext();

// Gumawa ng Cart Provider component
export const CartProvider = ({ children }) => {
  // Kunin ang cart state mula sa localStorage kapag naglo-load ang app
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem('cartItems');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return [];
    }
  });

  // I-update ang localStorage tuwing nagbabago ang cartItems
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function para magdagdag ng item sa cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Kung existing na ang item, dagdagan lang ang quantity
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Kung bago ang item, idagdag ito na may quantity na 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Function para mag-alis ng item sa cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Function para i-clear ang buong cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Kalkulahin ang total quantity ng items sa cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Kalkulahin ang total amount ng mga item sa cart
  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook para madaling gamitin ang cart context
export const useCart = () => {
  return useContext(CartContext);
};
