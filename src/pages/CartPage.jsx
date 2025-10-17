import React, { useState, useCallback, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function CartPage() {
  const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);

  const total = useMemo(() => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0), [cartItems]);
  const totalItems = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

  const handleClearCart = useCallback(async () => {
    setIsClearing(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    clearCart();
    setIsClearing(false);
  }, [clearCart]);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    const item = cartItems.find(cartItem => cartItem.id === itemId);
    if (item) {
      const currentQuantity = item.quantity;
      const difference = newQuantity - currentQuantity;
      
      if (difference > 0) {
        for (let i = 0; i < difference; i++) {
          addToCart(item);
        }
      } else if (difference < 0) {
        for (let i = 0; i < Math.abs(difference); i++) {
          removeFromCart(itemId);
        }
      }
    }
  }, [cartItems, addToCart, removeFromCart]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-slate-900 to-blue-900">
        <motion.div 
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 glass-morphism rounded-full flex items-center justify-center neon-glow border border-blue-400/30">
              <motion.div
                className="relative"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6L5 9z" />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="20" cy="20" r="1" />
                </svg>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
            <h2 className="text-3xl font-bold text-blue-100 mb-4 tracking-wider">CART EMPTY</h2>
            <p className="text-blue-200 mb-8 tracking-wide">No items in your cart yet. Start exploring our collection!</p>
          </div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/" 
              className="inline-block glass-morphism neon-glow text-blue-100 px-8 py-4 rounded-2xl text-lg font-bold tracking-wider hover:text-white transition-all duration-300 shadow-2xl hover:shadow-3xl border border-blue-400/30"
            >
              EXPLORE COLLECTION
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-slate-900 to-blue-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-100 mb-4 tracking-wider">SHOPPING CART</h1>
          <p className="text-xl text-blue-200 tracking-wide">
            {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'} IN YOUR CART
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="glass-morphism rounded-2xl shadow-2xl mb-6 overflow-hidden border border-blue-400/20 neon-glow"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-24 h-24 object-contain rounded-xl"
                        />
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg font-semibold text-blue-100 mb-2 line-clamp-2 tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-blue-400/30 rounded-lg glass-morphism">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-blue-200 hover:text-amber-300 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="px-4 py-2 text-lg font-semibold min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-blue-200 hover:text-amber-300 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-100">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <motion.button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              className="glass-morphism rounded-2xl shadow-2xl p-6 sticky top-24 border border-blue-400/20 neon-glow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-blue-100 mb-6 tracking-wider">ORDER SUMMARY</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-blue-200">
                  <span className="tracking-wide">SUBTOTAL ({totalItems} ITEMS)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-blue-200">
                  <span className="tracking-wide">SHIPPING</span>
                  <span className="text-green-400 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-blue-200">
                  <span className="tracking-wide">TAX</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-blue-400/30 pt-4">
                  <div className="flex justify-between text-xl font-bold text-blue-100">
                    <span className="tracking-wider">TOTAL</span>
                    <span className="bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text text-transparent">${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <motion.button
                className="w-full glass-morphism text-blue-100 py-4 rounded-2xl text-lg font-bold tracking-wider hover:text-white transition-all duration-300 shadow-2xl hover:shadow-3xl mb-4 border border-blue-400/30 neon-glow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                PROCEED TO CHECKOUT
              </motion.button>

              <motion.button
                onClick={handleClearCart}
                disabled={isClearing}
                className="w-full border-2 border-red-400/50 text-red-400 py-3 rounded-xl font-bold tracking-wider hover:bg-red-500/20 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isClearing ? 'CLEARING...' : 'CLEAR CART'}
              </motion.button>

              <div className="mt-6 text-center">
                <Link 
                  to="/" 
                  className="text-blue-300 hover:text-amber-300 font-medium transition-colors tracking-wide"
                >
                  ← CONTINUE SHOPPING
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
