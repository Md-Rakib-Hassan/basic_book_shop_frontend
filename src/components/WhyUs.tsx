import React from 'react';
import { motion } from 'framer-motion';
import {  TrendingUp, Award, BookOpen } from 'lucide-react';
const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-amber-500" />,
      title: 'Extensive Collection',
      description: 'Discover thousands of books across all genres, from bestsellers to rare finds.'
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-amber-500" />,
      title: 'New Releases',
      description: 'Stay updated with the latest publications and pre-order upcoming releases.'
    },
    {
      icon: <Award className="h-10 w-10 text-amber-500" />,
      title: 'Award Winners',
      description: 'Explore critically acclaimed and award-winning books from around the world.'
    }
  ];
const WhyUs = () => {
    return (
        <div>
             {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BookShop?</h2>
            <p className="text-lg text-gray-600">
              We're dedicated to providing the best book shopping experience with a curated selection, expert recommendations, and excellent service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        </div>
    );
};

export default WhyUs;