import React from 'react';
import { ChevronRight, BookOpen, Users, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-28 pb-16 md:pt-10 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              The Book Sharing Community
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight mb-6">
              Find Your Next Read in Our <span className="text-primary-600">Literary Community</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Join thousands of book enthusiasts who share, discover, and connect through their love of reading. Expand your personal library and literary horizons.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="btn btn-primary px-6 py-3 text-lg">
                Get Started Free
                <ChevronRight size={20} />
              </button>
              <button className="btn btn-secondary px-6 py-3 text-lg">
                How It Works
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-primary-300 border-2 border-white flex items-center justify-center text-white font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-sm text-gray-600">Trusted by</div>
                <div className="font-bold text-primary-900">10,000+ book lovers</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative z-10">
              <img 
                src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Book sharing" 
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
            
            <motion.div 
              className="absolute -top-4 -left-4 bg-white p-4 rounded-lg shadow-lg flex items-center gap-2 z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
            >
              <BookOpen className="text-primary-600" />
              <div>
                <div className="font-bold text-primary-900">50,000+</div>
                <div className="text-xs text-gray-600">Books shared</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg flex items-center gap-2 z-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
            >
              <Users className="text-primary-600" />
              <div>
                <div className="font-bold text-primary-900">1,200+</div>
                <div className="text-xs text-gray-600">Active readers</div>
              </div>
            </motion.div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-highlight rounded-full opacity-20 blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;