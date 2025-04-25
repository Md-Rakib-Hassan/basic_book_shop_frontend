import React from 'react';
import Button from './ui/Button';
import { BookIcon } from 'lucide-react';

const NewsLater = () => {
    return (
        <div className='mt-10'>
            {/* Newsletter Section */}
      <section className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <BookIcon className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Stay updated with new releases, author interviews, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-primary text-gray-900"
              />
              <Button variant="primary" size="md">Subscribe</Button>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
        </div>
    );
};

export default NewsLater;