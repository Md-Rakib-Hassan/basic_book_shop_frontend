import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlanProps {
  name: string;
  price: string;
  features: { text: string; included: boolean }[];
  isPopular?: boolean;
  delay: number;
}

const PlanCard: React.FC<PlanProps> = ({ name, price, features, isPopular, delay }) => {
  return (
    <motion.div 
      className={`card relative ${isPopular ? 'border-primary-600 shadow-md' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-primary-600 text-white text-sm font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          Most Popular
        </div>
      )}
      
      <div className="p-6 border-b">
        <h3 className="text-xl font-bold text-primary-900 mb-2">{name}</h3>
        <div className="flex items-end gap-1 mb-4">
          <span className="text-3xl font-bold text-primary-800">{price}</span>
          {price !== "Free" && <span className="text-gray-500">/month</span>}
        </div>
        <button 
          className={`w-full ${
            isPopular ? 'btn btn-primary' : 'btn btn-secondary'
          }`}
        >
          Get Started
        </button>
      </div>
      
      <div className="p-6">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              {feature.included ? (
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              )}
              <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const MembershipPlans: React.FC = () => {
  const plans = [
    {
      name: "Free",
      price: "Free",
      features: [
        { text: "Browse all available books", included: true },
        { text: "1 book exchange per month", included: true },
        { text: "Limited message exchanges", included: true },
        { text: "Basic recommendation algorithm", included: true },
        { text: "Access to monthly book club", included: false },
        { text: "Priority support", included: false },
        { text: "Early access to new releases", included: false },
        { text: "Unlimited exchanges", included: false }
      ],
      delay: 0.1
    },
    {
      name: "Premium",
      price: "$9.99",
      features: [
        { text: "Browse all available books", included: true },
        { text: "10 book exchanges per month", included: true },
        { text: "Unlimited message exchanges", included: true },
        { text: "Advanced recommendation algorithm", included: true },
        { text: "Access to monthly book club", included: true },
        { text: "Priority support", included: true },
        { text: "Early access to new releases", included: false },
        { text: "Unlimited exchanges", included: false }
      ],
      isPopular: true,
      delay: 0.2
    },
    {
      name: "Unlimited",
      price: "$19.99",
      features: [
        { text: "Browse all available books", included: true },
        { text: "Unlimited book exchanges", included: true },
        { text: "Unlimited message exchanges", included: true },
        { text: "Premium recommendation algorithm", included: true },
        { text: "Access to monthly book club", included: true },
        { text: "Priority support", included: true },
        { text: "Early access to new releases", included: true },
        { text: "Special author events access", included: true }
      ],
      delay: 0.3
    }
  ];

  return (
    <section id="pricing" className="section-container">
      <div className="text-center mb-16">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Choose Your Membership Plan
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Find the perfect plan to match your reading habits and budget.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <PlanCard key={index} {...plan} />
        ))}
      </div>
      
      <motion.p 
        className="text-center mt-10 text-gray-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        All plans include a 14-day free trial. No credit card required to start.
      </motion.p>
    </section>
  );
};

export default MembershipPlans;