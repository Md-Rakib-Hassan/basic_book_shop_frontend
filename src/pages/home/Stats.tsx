import React from 'react';
import { Book, Users, Target, Map } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const StatItem: React.FC<StatProps> = ({ icon, value, label, delay }) => {
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary-100 text-primary-600 rounded-full">
        {icon}
      </div>
      <h4 className="text-3xl md:text-4xl font-bold text-primary-900 mb-2">{value}</h4>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

const Stats: React.FC = () => {
  const stats = [
    {
      icon: <Book size={32} />,
      value: "11+",
      label: "Books Shared",
      delay: 0.1
    },
    {
      icon: <Users size={32} />,
      value: "20+",
      label: "Active Members",
      delay: 0.3
    },
    {
      icon: <Target size={32} />,
      value: "98%",
      label: "Satisfaction Rate",
      delay: 0.5
    },
    {
      icon: <Map size={32} />,
      value: "1",
      label: "Cities Covered",
      delay: 0.7
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;