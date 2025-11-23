import React, { useState } from "react";
import { useSendMessageMutation } from "../redux/features/contact/contactApi";
import { toast } from "sonner";
// make sure you installed sooner: npm i sooner

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage(formData).unwrap();
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#1b8bcb] mb-8">Contact Us</h1>

        <p className="text-center text-lg text-gray-600 mb-10">
          Have questions, feedback, or need support? Feel free to reach out to us.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img src="./images/contactUs.jpg" alt="Contact Us" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-gray-50 p-6 rounded-xl shadow-sm"
          >
            <div>
              <label htmlFor="name" className="block font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b8bcb]"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b8bcb]"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-1">Message</label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b8bcb]"
                placeholder="Your message..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1b8bcb] text-white py-2 rounded-lg font-semibold hover:bg-[#167ab0] transition duration-300 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
