import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const handleQuickAdd = useCallback((e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }, [addToCart]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }), []);

  return (
    <div className="min-h-screen">
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden parallax-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.005 }}
        style={{
          background: 'linear-gradient(135deg, #325aa8 0%, #c48833 50%, #debd90 100%)'
        }}
      >
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/E_commerce_Fashion_Video_Background_Generation.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            Discover
            <motion.span 
              className="block bg-gradient-to-r from-blue-300 via-amber-300 to-yellow-200 bg-clip-text text-transparent floating-animation"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.05, 1],
                textShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                  '0 0 40px rgba(245, 158, 11, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.5)'
                ]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              FUTURE FASHION
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl mb-8 text-blue-100 px-4 tracking-wide"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            NEXT-GEN COLLECTION • CRAFTED FOR THE FUTURE • PREMIUM EXPERIENCE
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={() => {
                const element = document.getElementById('products');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block glass-morphism neon-glow text-blue-100 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-bold tracking-wider hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl border border-blue-400/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EXPLORE NOW
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <section id="products" className="py-20 px-4 bg-gradient-to-b from-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-100 mb-4 tracking-wider">
              PRODUCT CATALOG
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto tracking-wide">
              NEXT-GENERATION COLLECTION • PREMIUM QUALITY • FUTURE-READY
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="glass-morphism rounded-2xl p-6 shimmer h-80 border border-blue-400/20"></div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="group"
                >
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="glass-morphism rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:scale-105 border border-blue-400/20 hover:border-amber-400/40 neon-glow h-96 flex flex-col">
                      <div className="relative overflow-hidden flex-1 flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-64 object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <motion.button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="absolute top-4 right-4 glass-morphism text-blue-100 p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-white hover:scale-110 border border-blue-400/30"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </motion.button>
                      </div>
                      
                      <div className="p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-semibold text-blue-100 mb-2 line-clamp-2 group-hover:text-amber-300 transition-colors duration-200 tracking-wide">
                          {product.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xl sm:text-2xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text">
                            ${product.price}
                          </span>
                          <div className="flex items-center text-amber-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-xs sm:text-sm text-blue-200">4.5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
