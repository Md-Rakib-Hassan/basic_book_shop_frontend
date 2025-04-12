import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#1b8bcb] mb-8">Contact Us</h1>

        <p className="text-center text-lg text-gray-600 mb-10">
          Have questions, feedback, or need support? Feel free to reach out to us.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img src="./images/contactUs.jpg" alt="" />
          </div>

          <form className="space-y-5 bg-gray-50 p-6 rounded-xl shadow-sm">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b8bcb]"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b8bcb]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-1">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b8bcb]"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1b8bcb] text-white py-2 rounded-lg font-semibold hover:bg-[#167ab0] transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

    
      </div>
    </div>
  );
};

export default ContactUs;
