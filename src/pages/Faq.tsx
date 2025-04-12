import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

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
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left focus:outline-none"
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

const Faq: React.FC = () => {
  return (
    <div className=" bg-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-[#1b8bcb] mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h1>

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
    </div>
  );
};

export default Faq;
