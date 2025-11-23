import React from 'react';
import { Facebook, Twitter, Instagram, Book, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Book className="h-8 w-8 text-highlight" />
              <span className="ml-2 text-2xl font-bold">BookNest</span>
            </div>
            <p className="text-primary-200 mb-6">
              Building a community of book lovers, one shared story at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Features', 'How It Works', 'Pricing', 'FAQ', 'Contact', 'Blogs'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-primary-200 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Fiction', 'Mystery & Thriller', 'Science Fiction', 'Biography', 'Self-Help', 'Romance', 'Fantasy', 'Non-Fiction'].map((item) => (
                <li key={item}>
                  <a 
                    href="#"
                    className="text-primary-200 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-200 flex-shrink-0 mt-0.5" />
                <span className="text-primary-200">
                  123 Reading Lane<br />
                  Savar, Dhaka 1341
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-200" />
                <a href="tel:+8801957628489" className="text-primary-200 hover:text-white transition-colors">
                  (+880) 1576-28489
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-200" />
                <a href="mailto:info@booknest.com" className="text-primary-200 hover:text-white transition-colors">
                  info@booknest.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-300 text-sm">
            &copy; {new Date().getFullYear()} BookNest. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-primary-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-primary-300 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;