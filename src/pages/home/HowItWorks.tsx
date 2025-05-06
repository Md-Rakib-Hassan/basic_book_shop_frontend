import React from 'react';
import { UserPlus, Search, BookOpen, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: number;
}

const Step: React.FC<StepProps> = ({ icon, title, description, number }) => {
  return (
    <motion.div 
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: number * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="relative mb-4">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xl">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-highlight rounded-full flex items-center justify-center text-primary-900 font-bold text-sm shadow-sm">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold text-primary-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-xs mx-auto">{description}</p>
    </motion.div>
  );
};

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <UserPlus size={24} />,
      title: "Create Your Account",
      description: "Sign up for free and create your reading profile with your preferences and favorite genres.",
      number: 1
    },
    {
      icon: <Search size={24} />,
      title: "Discover Books",
      description: "Browse through our vast collection or use our smart search to find exactly what you're looking for.",
      number: 2
    },
    {
      icon: <BookOpen size={24} />,
      title: "Request Books",
      description: "Found a book you like? Request it from the owner and arrange the exchange details.",
      number: 3
    },
    {
      icon: <RefreshCw size={24} />,
      title: "Share & Exchange",
      description: "Meet up, exchange books, and rate your experience to help build our trusted community.",
      number: 4
    }
  ];

  return (
    <section id="how-it-works" className="section-container bg-gradient-to-b from-gray-50 to-primary-100">
      <div className="text-center mb-16">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          How BookNest Works
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Getting started with BookNest is easy. Follow these simple steps to begin your book sharing journey.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {steps.map((step, i) => (
          <Step key={i} {...step} />
        ))}
        
        {/* Connecting lines between steps (visible only on desktop) */}
        <div className="hidden lg:block absolute top-8 left-[25%] right-[25%] h-0.5 bg-primary-200">
          <div className="absolute left-1/3 w-0.5 h-2 bg-primary-200"></div>
          <div className="absolute right-1/3 w-0.5 h-2 bg-primary-200"></div>
        </div>
      </div>
      
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <button className="btn btn-primary px-6 py-3">
          Start Sharing Books Today
        </button>
      </motion.div>
    </section>
  );
};

export default HowItWorks;