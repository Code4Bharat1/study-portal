"use client";

import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 py-16" style={{ backgroundImage: "url('/exercise1.png')" }}>
      <div className="bg-transparent bg-opacity-60 w-full max-w-6xl rounded-xl shadow-lg flex flex-col md:flex-row p-8">
        {/* Left - Contact Info */}
        <div className="text-black flex-1 space-y-6 mb-8 md:mb-0 md:mr-12 text-2xl">
          <h2 className="text-3xl font-bold">Contact Us</h2>6
          <p className="text-xl text-black">
            We’d love to hear from you. Please reach out with any questions, feedback, or ideas.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white text-black rounded-full p-2">
                <MapPin />
              </div>
              <div>
                <h4 className="font-semibold text-cyan-400">Address</h4>
                <p className="text-sm">4671 Sugar Camp Road, Owatonna, Minnesota, 55060</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white text-black rounded-full p-2">
                <Phone />
              </div>
              <div>
                <h4 className="font-semibold text-cyan-400">Phone</h4>
                <p className="text-sm">561-456-2321</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white text-black rounded-full p-2">
                <Mail />
              </div>
              <div>
                <h4 className="font-semibold text-cyan-400">Email</h4>
                <p className="text-sm">example@email.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="bg-white rounded-xl p-6 w-full md:w-[400px] shadow-md">
          <h3 className="text-xl font-bold mb-4">Send Message</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-cyan-500 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-cyan-500 py-2"
            />
            <textarea
              rows="4"
              placeholder="Type your Message..."
              className="w-full border-b border-gray-300 focus:outline-none focus:border-cyan-500 py-2 resize-none"
            />
            <button
              type="submit"
              className="bg-cyan-500 text-white px-4 py-2 rounded-md w-full hover:bg-cyan-600 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
