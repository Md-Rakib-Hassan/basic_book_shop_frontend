import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1b8bcb] mb-6 text-center">About BookNest</h1>

        <p className="mb-6 text-lg leading-relaxed text-justify">
          <strong>BookNest</strong> is a modern, user-friendly online book shop platform that combines
          secure authentication, streamlined shopping experience, and intuitive interfaces.
          Whether you're a book lover or a casual reader, BookNest helps you explore, purchase, and
          manage your favorite reads with ease.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-[#1b8bcb] mb-2">🎯 Our Objective</h2>
            <p className="text-base text-justify">
              We aim to provide a responsive, secure, and visually pleasing platform where users
              can comfortably browse books, manage their profiles, and make purchases effortlessly.
              Admins can manage products, users, and orders through an efficient dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1b8bcb] mb-2">🛠️ Key Features</h2>
            <ul className="list-disc list-inside text-base space-y-2">
              <li>User Registration & JWT-based Authentication</li>
              <li>Role-based dashboards for Admins and Users</li>
              <li>Product listing, searching, filtering & detailed views</li>
              <li>Secure checkout with stock validation</li>
              <li>Integrated SurjoPay payment gateway</li>
              <li>Responsive design for all devices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1b8bcb] mb-2">🚀 Our Vision</h2>
            <p className="text-base text-justify">
              We envision BookNest as the go-to digital platform for Bangladeshi readers—where
              book lovers can not only purchase but also explore, review, and revisit their
              favorite titles. With AI-powered recommendations and a community-driven approach,
              we aim to revolutionize the reading culture in Bangladesh.
            </p>
          </section>
        </div>

        
      </div>
    </div>
  );
};

export default AboutUs;
