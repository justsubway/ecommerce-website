import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const urlApi = `https://fakestoreapi.com/products/${id}`;
        const response = await fetch(urlApi);
        const data = await response.json();
        setProductInfo(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = useCallback(() => {
    for (let i = 0; i < quantity; i++) {
      addToCart(productInfo);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [addToCart, productInfo, quantity]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!productInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-slate-900 to-blue-900">
      <div className="max-w-7xl mx-auto">
        <motion.button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-blue-200 hover:text-amber-300 transition-colors glass-morphism px-4 py-2 rounded-xl border border-blue-400/30"
          whileHover={{ x: -5, scale: 1.05 }}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-morphism rounded-3xl p-8 shadow-2xl border border-blue-400/20 neon-glow">
              <div className="aspect-square relative overflow-hidden rounded-2xl">
                <img
                  src={productInfo.image}
                  alt={productInfo.title}
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-blue-100 mb-4 leading-tight tracking-wide">
                {productInfo.title}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text text-transparent">
                  ${productInfo.price}
                </span>
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">(4.5)</span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg text-blue-200 max-w-none">
              <p className="text-lg leading-relaxed tracking-wide">{productInfo.description}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-blue-200 tracking-wide">QUANTITY:</span>
                <div className="flex items-center border border-blue-400/30 rounded-lg glass-morphism">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-blue-200 hover:text-amber-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-4 py-2 text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-blue-200 hover:text-amber-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>

              <motion.button
                onClick={handleAddToCart}
                className={`w-full py-4 px-8 rounded-2xl text-lg font-bold tracking-wider transition-all duration-300 ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'glass-morphism text-blue-100 hover:text-white border border-blue-400/30 hover:border-amber-400/50'
                } shadow-2xl hover:shadow-3xl transform hover:scale-105 neon-glow`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {addedToCart ? (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart!
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    Add to Cart
                  </div>
                )}
              </motion.button>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
