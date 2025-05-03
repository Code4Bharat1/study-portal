// "use client";

// import React, { useState } from "react";
// import { Mail, MapPin, Phone } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// const Contact = () => {
//   const [isFlipped, setIsFlipped] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsFlipped(true);
//     toast.success(
//       <div className="flex items-center gap-2">
//         <span></span>
//         <span>Message sent successfully!</span>
//       </div>
//     );

//     setTimeout(() => setIsFlipped(false), 3000); // flip back after 3 seconds
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 py-16 "
//       style={{ backgroundImage: "url('/background2.png')" }}
//     >
//       {/* Toast container */}
//       <Toaster position="top-right" reverseOrder={false} />

//       <div className="bg-transparent bg-opacity-60 w-full max-w-6xl rounded-xl shadow-lg flex flex-col md:flex-row p-8">

//         {/* Flip Card */}
//         <div
//           className="relative w-full md:w-[400px] mb-8 md:mb-0 md:mr-12"
//           style={{ perspective: "1000px" }}
//         >
//           <div
//             style={{
//               transformStyle: "preserve-3d",
//               transition: "transform 0.8s",
//               transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
//               position: "relative",
//               width: "100%",
//               height: "430px"
//             }}
//           >
//             {/* Front */}
//             <div
//               style={{
//                 backfaceVisibility: "hidden",
//                 position: "absolute",
//                 width: "100%",
//                 height: "100%"
//               }}
//               className="bg-white rounded-xl p-6 shadow-md"
//             >
//               <h3 className="text-xl font-bold mb-4">Send Message</h3>
//               <form className="space-y-4" onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-200 py-2"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
//                 />
//                 <textarea
//                   rows="4"
//                   placeholder="Type your Message..."
//                   className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 resize-none"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-cyan-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition"
//                 >
//                   Send
//                 </button>
//               </form>
//             </div>

//             {/* Back */}
//             <div
//               style={{
//                 backfaceVisibility: "hidden",
//                 transform: "rotateY(180deg)",
//                 position: "absolute",
//                 width: "100%",
//                 height: "100%"
//               }}
//               className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center"
//             >
//               <h3 className="text-xl font-bold text-green-600">Message Sent! ✅</h3>
//             </div>
//           </div>
//         </div>

//         {/* Contact Info */}
//         <div className="text-white flex-1 space-y-6 text-2xl">
//           <h2 className="text-3xl font-bold">Contact Us</h2>
//           <p className="text-xl">
//             We’d love to hear from you. Please reach out with any questions, feedback, or ideas.
//           </p>

//           <div className="space-y-6">
//             <div className="flex items-start space-x-4">
//               <div className="bg-white text-black rounded-full p-2">
//                 <MapPin />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-gray-300">Address</h4>
//                 <p className="text-sm text-white">
//                   Fueled by heart, crafted with soul,<br />
//                   a piece of you in every goal.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start space-x-4">
//               <div className="bg-white text-black rounded-full p-2">
//                 <Phone />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-gray-300">Phone</h4>
//                 <p className="text-sm text-white">0000-0000-0000</p>
//               </div>
//             </div>

//             <div className="flex items-start space-x-4">
//               <div className="bg-white text-black rounded-full p-2">
//                 <Mail />
//               </div>
//               <div>
//                 <h4 className="font-semibold text-gray-300">Email</h4>
//                 <p className="text-sm text-white">askme@skillbridge.com</p>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Contact;



'use client';
import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react'; // ✅ Mail icon imported

const Contact = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* CONTACT HEADING */}
      <section className="text-center py-14 px-4">
        <h2 className="text-4xl font-bold text-black mb-3">Contact Us</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Any questions or remarks? Just write us a message!
        </p>

        {/* FORM */}
        <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Enter a valid email address"
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
          />
          <input
            type="text"
            placeholder="Enter your Name"
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button className=" cursor-pointer mt-6 px-12 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-cyan-600 transition">
          SUBMIT
        </button>
      </section>

      {/* SPACING AFTER SUBMIT */}
      <div className="mb-33"></div>

      {/* LAYERED BACKGROUND SECTION */}
      <div className="relative w-full h-[260px] bg-blue-300">
        <div className="absolute top-[-80px] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[85%] bg-gray-100 rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

          {/* EMAIL */}
          <div className="relative pt-10">
            {/* Floating Icon */}
            <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2">
              <Mail className="w-17 h-14 bg-gray-50 text-blue-600 p-2 rounded-full shadow-md" />
            </div>
            <h4 className="text-2xl font-medium text-black mb-1 mt-6">EMAIL</h4>
            <p className="text-gray-700">ourclub55@email.com <br /> support678@email.com</p>
          </div>

          {/* PHONE */}
          <div className="relative pt-10">
            <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
              <Phone className="w-16 h-14 bg-gray-50 text-blue-600 p-2 rounded-full shadow-md" />
            </div>
            <h4 className="text-xl font-bold text-black mb-1 mt-6">PHONE (LANDLINE)</h4>
            <p className="text-gray-700">
              + 912 3 567 8987 <br /> + 912 5 252 3336
            </p>
          </div>

          {/* LOCATION */}
          <div className="relative pt-10">
            <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
              <MapPin className="w-14 h-14 bg-gray-50 text-blue-600 p-2 rounded-full shadow-md" />
            </div>
            <h4 className="text-xl font-bold text-black mb-1 mt-6">OUR OFFICE LOCATION</h4>
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





