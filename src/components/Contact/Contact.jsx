// 'use client';
// import React from 'react';
// import { Phone, MapPin, Mail } from 'lucide-react'; // ✅ Mail icon imported

// const Contact = () => {
//   return (
//     <div className="bg-white min-h-screen flex flex-col">
//       {/* CONTACT HEADING */}
//       <section className="text-center py-14 px-4">
//         <h2 className="text-4xl font-bold text-black mb-3">Contact Us</h2>
//         <p className="text-gray-600 mb-8 text-lg">
//           Any questions or remarks? Just write us a message!
//         </p>

//         {/* FORM */}
//         <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="email"
//             placeholder="Enter a valid email address"
//             className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Enter your Name"
//             className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
//           />
//              <textarea
//             type="text"
//             name="subject"
//             placeholder="Enter your message here"
//             className="px-4 py-4 h-[150px] border border-gray-300 rounded-md focus:outline-none md:col-span-2"
//           />
//         </div>

//         {/* SUBMIT BUTTON */}
//         <button className=" cursor-pointer mt-6 px-12 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-cyan-600 transition">
//           SUBMIT
//         </button>
//       </section>

//       {/* SPACING AFTER SUBMIT */}
//       <div className="mb-33"></div>

//       {/* LAYERED BACKGROUND SECTION */}
//       <div className="relative w-full h-[260px] bg-blue-300">
//         <div className="absolute top-[-80px] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[85%] bg-gray-100 rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

//           {/* EMAIL */}
//           <div className="relative pt-10">
//             {/* Floating Icon */}
//             <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2">
//               <Mail className="w-17 h-14 bg-gray-50 text-blue-600 p-2 rounded-full shadow-md" />
//             </div>
//             <h4 className="text-2xl font-medium text-black mb-1 mt-6">EMAIL</h4>
//             <p className="text-gray-700">ourclub55@email.com <br /> support678@email.com</p>
//           </div>

//           {/* PHONE */}
//           <div className="relative pt-10">
//             <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
//               <Phone className="w-16 h-14 bg-gray-50 text-blue-600 p-2 rounded-full shadow-md" />
//             </div>
//             <h4 className="text-xl font-bold text-black mb-1 mt-6">PHONE (LANDLINE)</h4>
//             <p className="text-gray-700">
//               + 912 3 567 8987 <br /> + 912 5 252 3336
//             </p>
//           </div>

//           {/* LOCATION */}
//           <div className="relative pt-10">
//             <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
//               <MapPin className="w-14 h-14 bg-gray-50 text-blue-600 p-2 rounded-full shadow-md" />
//             </div>
//             <h4 className="text-xl font-bold text-black mb-1 mt-6">OUR OFFICE LOCATION</h4>
//             <p className="text-gray-700">
//               The Interior Design Studio Company <br />
//               The Courtyard, Al Quoz 1, Colorado, USA
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

"use client";
import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { Phone, MapPin, Mail } from "lucide-react";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_smnpiin", // Replace with your EmailJS service ID
        "template_adraiig", // Replace with your EmailJS template ID
        form.current,
        "87HJM06ooM2QWLPal" // Replace with your EmailJS public key
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset(); // Clear form
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message, try again.");
        }
      );
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
          onSubmit={sendEmail}
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
            className="md:col-span-2 cursor-pointer mt-4 px-12 py-3 bg-blue-400 text-white font-semibold rounded-full hover:bg-blue-600 transition"
          >
            SUBMIT
          </button>
        </form>
      </section>

      {/* SPACING AFTER SUBMIT */}
      <div className="mb-33"></div>

      {/* CONTACT INFO SECTION */}
      <div className="relative w-full h-[260px] bg-blue-400">
        <div className="absolute top-[-80px] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[85%] bg-gray-100 rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="relative pt-10">
            <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2">
              <Mail className="w-17 h-14 bg-gray-50 text-blue-600 p-2 rounded-full shadow-md" />
            </div>
            <h4 className="text-2xl font-medium text-black mb-1 mt-6">EMAIL</h4>
            <p className="text-gray-700">
              ourclub55@email.com <br /> support678@email.com
            </p>
          </div>

          <div className="relative pt-10">
            <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
              <Phone className="w-16 h-14 bg-gray-50 text-blue-600 p-2 rounded-full shadow-md" />
            </div>
            <h4 className="text-xl font-bold text-black mb-1 mt-6">
              PHONE (LANDLINE)
            </h4>
            <p className="text-gray-700">
              + 912 3 567 8987 <br /> + 912 5 252 3336
            </p>
          </div>

          <div className="relative pt-10">
            <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
              <MapPin className="w-14 h-14 bg-gray-50 text-blue-600 p-2 rounded-full shadow-md" />
            </div>
            <h4 className="text-xl font-bold text-black mb-1 mt-6">
              OUR OFFICE LOCATION
            </h4>
            <p className="text-gray-700">
              The Interior Design Studio Company <br />
              The Courtyard, Al Quoz 1, Colorado, USA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
