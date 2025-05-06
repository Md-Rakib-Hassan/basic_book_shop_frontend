import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa6';
import { Link } from 'react-router';


const faqs = [
  {
    question: 'What is BookNest?',
    answer: 'BookNest is a platform where you can buy, lend, or sell books with flexible return options, designed to make reading more affordable and accessible.',
  },
  {
    question: 'How does the lending system work?',
    answer: 'Subscribed users can lend books for a certain period and return them to borrow others, making it cost-effective for avid readers.',
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Absolutely. We use secure JWT authentication, hashed passwords, and best practices to keep your information safe.',
  },
  {
    question: 'Can I become a seller on BookNest?',
    answer: 'Yes, anyone can sell their books. You just need to register, and an admin will approve your request to start selling.',
  },
  {
    question: 'What payment methods are supported?',
    answer: 'Currently, we support SurjoPay for fast and secure transactions.',
  },
];


const FAQItem: React.FC<{
  question: string;
  answer: string;
}> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4 px-6">
      <button
        className="w-full flex justify-between items-center text-left focus:outline-none "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-[#1b8bcb]" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="text-gray-600 mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
 

  

  return (
    <section id="faq" className="section-container bg-gray-50">
      <div className="text-center mb-16">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Everything you need to know about BookNest and how it works.
        </motion.p>
      </div>
      
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm">
       
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.2 }}
               >
                 {faqs.map((faq, index) => (
                   <FAQItem
                     key={index}
                     question={faq.question}
                     answer={faq.answer}
                   />
                 ))}
               </motion.div>
      </div>
      
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-gray-600 mb-4">Still have questions? We're here to help!</p>
        <Link to={"/contact"}>
        <button className="btn btn-primary">
          Contact Support
          </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default FAQ;