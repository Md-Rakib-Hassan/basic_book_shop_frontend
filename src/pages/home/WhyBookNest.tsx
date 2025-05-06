import React from 'react';
import { BookOpen, Users, RefreshCw, Map, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      className="card p-6 hover:shadow-md transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-primary-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const WhyBookNest: React.FC = () => {
  const features = [
    {
      icon: <BookOpen size={24} />,
      title: "Vast Book Collection",
      description: "Access thousands of books across genres, from classics to contemporary bestsellers.",
      delay: 0.1
    },
    {
      icon: <Users size={24} />,
      title: "Vibrant Community",
      description: "Connect with fellow readers, join book clubs, and participate in literary discussions.",
      delay: 0.2
    },
    {
      icon: <RefreshCw size={24} />,
      title: "Easy Exchanges",
      description: "Share and swap books with other members in a secure and reliable manner.",
      delay: 0.3
    },
    {
      icon: <Map size={24} />,
      title: "Local Connections",
      description: "Find readers and book events in your area to build your literary network.",
      delay: 0.4
    },
    {
      icon: <Shield size={24} />,
      title: "Secure Transactions",
      description: "Our platform ensures all book exchanges are safe, trackable, and verified.",
      delay: 0.5
    },
    {
      icon: <Star size={24} />,
      title: "Personalized Recommendations",
      description: "Discover new reads based on your preferences, history, and community ratings.",
      delay: 0.6
    }
  ];

  return (
    <section id="features" className="section-container bg-white">
      <div className="text-center mb-16">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Why Book Lovers Choose <span className="text-primary-600">BookNest</span>
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our platform is designed by readers, for readers, offering features that enhance your reading experience.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default WhyBookNest;