import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ content, author, role, avatar, rating }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto"
    >
      <div className="flex justify-center mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 mx-0.5"
            fill={i < rating ? "#f7ca17" : "none"}
            stroke={i < rating ? "#f7ca17" : "#cbd5e1"}
          />
        ))}
      </div>
      <p className="text-gray-700 text-lg mb-6 italic text-center">{content}</p>
      <div className="flex items-center justify-center">
        <img src={avatar} alt={author} className="w-12 h-12 rounded-full object-cover mr-4" />
        <div>
          <h4 className="font-bold text-primary-900">{author}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      content: "BookNest has transformed how I discover new books. I've connected with readers who share my taste, and found gems I never would have discovered on my own. The community is supportive and passionate about literature.",
      author: "Sarah Johnson",
      role: "English Teacher",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5
    },
    {
      content: "As someone who moves frequently for work, maintaining a physical library was challenging. BookNest solved that problem! Now I can exchange books with locals wherever I go, expanding my reading horizons while keeping my shelves manageable.",
      author: "David Chen",
      role: "Software Engineer",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 4
    },
    {
      content: "I've saved hundreds of dollars on books since joining BookNest. The platform is intuitive, the exchange process is secure, and I've met incredible people who share my passion for science fiction and fantasy novels.",
      author: "Maria Rodriguez",
      role: "Graphic Designer",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((current) => 
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };
  
  const prevTestimonial = () => {
    setActiveIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-primary-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary-200 rounded-full opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-highlight rounded-full opacity-20 transform translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Our Community Says
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Thousands of book lovers are sharing their reading experiences on BookNest.
          </motion.p>
        </div>
        
        <div className="relative px-10">
          <AnimatePresence mode="wait">
            <Testimonial key={activeIndex} {...testimonials[activeIndex]} />
          </AnimatePresence>
          
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary-800 hover:bg-primary-50 focus:outline-none"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary-800 hover:bg-primary-50 focus:outline-none"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeIndex ? 'bg-primary-600 w-4' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;