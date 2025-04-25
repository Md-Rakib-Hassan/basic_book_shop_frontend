import React from 'react';
import { motion } from 'framer-motion';
const CustomerReview = () => {
    return (
        <div>
            {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">
              Hear from our satisfied customers about their shopping experience with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "BookShop has completely transformed my reading experience. Their recommendations are spot on!",
                author: "Sarah J.",
                role: "Avid Reader"
              },
              {
                quote: "I love the curated collections and how easy it is to discover new authors. Outstanding service!",
                author: "Michael T.",
                role: "Book Collector"
              },
              {
                quote: "The fastest shipping and best prices. BookShop is now my go-to place for all my reading needs.",
                author: "Emily R.",
                role: "Literature Professor"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
        </div>
    );
};

export default CustomerReview;