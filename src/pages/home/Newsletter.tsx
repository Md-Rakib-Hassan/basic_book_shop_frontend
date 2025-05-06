import React from 'react';
import { Send, Book } from 'lucide-react';
import { motion } from 'framer-motion';

const Newsletter: React.FC = () => {
  return (
    <section className="py-20 bg-primary-600 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full opacity-30 transform translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Book className="w-6 h-6" />
              <span className="text-sm font-bold uppercase tracking-wider">BookNest Curated</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-primary-100 mb-6 max-w-lg">
              Join our community of book lovers and get personalized recommendations, reading lists, and exclusive content delivered straight to your inbox.
            </p>
            
            <div className="bg-white p-1 rounded-lg flex flex-col sm:flex-row shadow-lg">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 bg-transparent text-gray-800 focus:outline-none sm:border-0 border-b sm:border-b-0 border-gray-200"
              />
              <button className="btn btn-highlight whitespace-nowrap mt-2 sm:mt-0">
                Subscribe
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-sm text-primary-200 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-primary-500 p-5 rounded-lg">
              <h3 className="font-bold mb-2">Monthly Book Picks</h3>
              <p className="text-primary-100 text-sm">Curated selections across genres from our literary experts.</p>
            </div>
            
            <div className="bg-primary-500 p-5 rounded-lg">
              <h3 className="font-bold mb-2">Author Interviews</h3>
              <p className="text-primary-100 text-sm">Exclusive conversations with your favorite writers.</p>
            </div>
            
            <div className="bg-primary-500 p-5 rounded-lg">
              <h3 className="font-bold mb-2">Reading Challenges</h3>
              <p className="text-primary-100 text-sm">Fun challenges to expand your literary horizons.</p>
            </div>
            
            <div className="bg-primary-500 p-5 rounded-lg">
              <h3 className="font-bold mb-2">Early Access</h3>
              <p className="text-primary-100 text-sm">Be the first to know about new features and events.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;