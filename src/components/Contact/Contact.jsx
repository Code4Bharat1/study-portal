"use client";
import React, { useRef } from "react";
import { Phone, MapPin, Mail } from "lucide-react";

const Contact = () => {
  const form = useRef();

  const sendWhatsAppMessage = (e) => {
    e.preventDefault();
    
    const formData = new FormData(form.current);
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const message = formData.get('message');
    
    // Format the message for WhatsApp
    const whatsappMessage = `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Your WhatsApp number (include country code without '+' or '00')
    const whatsappNumber = '9594430295'; // Replace with your actual number
    
    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset the form
    form.current.reset();
    
    // Show success message
    alert("You'll be redirected to WhatsApp to send your message!");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <section className="text-center py-14 px-4">
        <h2 className="text-4xl font-bold text-black mb-3">Contact Us</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Any questions or remarks? Just write us a message!
        </p>

        {/* FORM */}
        <form
          ref={form}
          onSubmit={sendWhatsAppMessage}
          className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="email"
            name="user_email"
            placeholder="Enter a valid email address"
            required
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
          />
          <input
            type="text"
            name="user_name"
            placeholder="Enter your Name"
            required
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
          />
          <textarea
            name="message"
            placeholder="Enter your message here"
            required
            className="px-4 py-4 h-[150px] border border-gray-300 rounded-md focus:outline-none md:col-span-2"
          />
          <button
            type="submit"
            className="md:col-span-2 cursor-pointer mt-4 px-12 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition"
          >
            SEND VIA WHATSAPP
          </button>
        </form>
      </section>

      {/* SPACING AFTER SUBMIT */}
      <div className="mb-33"></div>

      {/* CONTACT INFO SECTION */}
      <div className="relative w-full h-[260px] bg-blue-400">
        <div className="absolute top-[-80px] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[85%] bg-gray-100 rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* EMAIL */}
          <div className="relative pt-10">
            <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gray-50 text-blue-400 rounded-full shadow-md flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-black mb-1 mt-6">EMAIL</h4>
            <p className="text-gray-700">
              nexcorealliance@gmail.com
            </p>
          </div>

          {/* PHONE */}
          <div className="relative pt-10">
            <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gray-50 text-blue-600 rounded-full shadow-md flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-black mb-1 mt-6">
              PHONE 
            </h4>
            <p className="text-gray-700">
               +91 95944 30295
            </p>
          </div>

          {/* LOCATION */}
          <div className="relative pt-10">
            <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gray-50 text-blue-700 rounded-full shadow-md flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-black mb-1 mt-6">
              OUR OFFICE LOCATION
            </h4>
            <p className="text-gray-700">
             Off BKC, Mumbai, India 400070
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;