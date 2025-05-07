// import {
//     Code,
//     FileCode,
//     Braces,
//     Database,
//     Globe,
//     Server,
//   } from "lucide-react"; // You can choose any relevant icons
  
//   const checklist = {
//     "HTML Best Practices": [
//       {
//         title: "Semantic HTML",
//         items: [
//           "Use semantic tags like <article>, <section>, <nav>, <header>, <footer> etc.",
//           "Improve accessibility using correct heading levels (h1-h6).",
//           "Use <label> with form inputs for better screen reader support.",
//           "Avoid using <div> and <span> excessively.",
//         ],
//       },
//       {
//         title: "Accessibility",
//         items: [
//           "Add alt attributes to all images.",
//           "Use roles and ARIA labels where needed.",
//           "Ensure good contrast ratio for text and background.",
//           "Make sure all interactive elements are keyboard accessible.",
//         ],
//       },
//       {
//         title: "Performance",
//         items: [
//           "Minimize HTML file size.",
//           "Defer non-critical scripts.",
//           "Lazy-load offscreen content.",
//           "Use async for external scripts when possible.",
//         ],
//       },
//       {
//         title: "SEO",
//         items: [
//           "Use proper meta tags (description, viewport, charset).",
//           "Use heading tags in proper order.",
//           "Use canonical URLs to prevent duplicate content.",
//           "Structure data with schema.org when possible.",
//         ],
//       },
//       {
//         title: "Forms",
//         items: [
//           "Always associate <label> with <input>.",
//           "Use required, minlength, and other validation attributes.",
//           "Group related inputs using <fieldset> and <legend>.",
//           "Provide helpful placeholder text.",
//         ],
//       },
//       {
//         title: "Responsive Design",
//         items: [
//           "Use viewport meta tag.",
//           "Utilize CSS media queries.",
//           "Avoid fixed width layout.",
//           "Use scalable units like %, em, rem.",
//         ],
//       },
//     ],
//   };
  
//   export default function HtmlBestPractices() {
//     return (
//       <div className="relative min-h-screen bg-white py-12 px-4 text-black overflow-hidden">
//         {/* Background Icons */}
//         <div className="absolute inset-0 z-0 pointer-events-none ">
//           <div className="absolute top-10 left-10">
//             <FileCode size={100} className="text-blue-100 rotate-12 z-34" />
//           </div>
//           <div className="absolute top-1/2 left-1/4">
//             <Braces size={100} className="text-green-200 -rotate-6 z-34" />
//           </div>
//           <div className="absolute bottom-10 right-10">
//             <Database size={100} className="text-purple-200 rotate-12 z-34" />
//           </div>
//           <div className="absolute top-20 right-43 z-54">
//             <Globe size={100} className="text-pink-200 -rotate-12 z-34" />
//           </div>
//           <div className="absolute bottom-23 left-34">
//             <Server size={100} className="text-yellow-100 rotate-6 z-34 " />
//           </div>
//         </div>
  
//         <div className="relative z-10 max-w-6xl mx-auto">
//           <div className="text-center mb-10">
//             <h1 className="text-3xl font-bold inline-block border-b-4 border-blue-500 pb-1">
//               HTML Best Practices
//             </h1>
//           </div>
  
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {checklist["HTML Best Practices"].map((section, index) => (
//               <div
//                 key={index}
//                 className=" cursor-pointer border border-gray-200 rounded-lg shadow-md p-5 bg-gradient-to-br from-white to-gray-50"
//               >
//                 <h2 className="text-lg font-semibold text-blue-600 mb-3 border-b pb-1">
//                   {section.title}
//                 </h2>
//                 <ul className="list-disc list-inside space-y-2 text-sm">
//                   {section.items.map((item, idx) => (
//                     <li key={idx}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
  


'use client';
import { CheckCircle } from "lucide-react";

export default function HtmlBestPractices() {
  const sections = [
    {
      title: "Semantic HTML",
      items: [
        "Use semantic elements like <header>, <main>, <article>, <section>, <footer>",
        "Avoid using <div> and <span> for structure when semantic tags are available",
        "Enhance accessibility and SEO with proper semantics"
      ]
    },
    {
      title: "Accessibility (a11y)",
      items: [
        "Use alt attributes on all <img> tags",
        "Ensure interactive elements are keyboard accessible",
        "Use ARIA roles only when necessary",
        "Label all form elements properly"
      ]
    },
    {
      title: "Performance",
      items: [
        "Minimize HTML file size",
        "Load critical content first (above the fold)",
        "Avoid deeply nested DOM structures",
        "Use lazy loading for images where applicable"
      ]
    },
    {
      title: "Responsive Design",
      items: [
        "Use meta viewport tag for mobile scaling",
        "Design using relative units (%, rem, em)",
        "Use media queries to adjust layout for devices"
      ]
    },
    {
      title: "Forms & Validation",
      items: [
        "Use appropriate input types (email, tel, number)",
        "Use built-in HTML5 validation features",
        "Associate <label> tags correctly with inputs",
        "Provide helpful placeholder or aria-describedby messages"
      ]
    },
    {
      title: "SEO Best Practices",
      items: [
        "Use proper heading structure (h1 → h6)",
        "Include meta tags for title, description, charset, etc.",
        "Ensure descriptive link text (avoid 'click here')"
      ]
    },
    {
      title: "Clean & Maintainable Code",
      items: [
        "Avoid inline styles; use classes instead",
        "Use indentation and consistent formatting",
        "Avoid unused or duplicate elements"
      ]
    }
  ];

  return (
    <div className="relative p-8 max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-lg">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12 tracking-tight">
       Best Practice For Html
      </h1>

      {/* Vertical timeline line */}
      <div className="absolute left-1/2 top-24 w-1 bg-blue-400 h-[calc(100%-8rem)] transform -translate-x-1/2" />

      {/* Top indicator dot */}
      <div className="absolute left-1/2 top-24 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full z-10" />

      {/* Bottom indicator dot */}
      <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full z-10" />

      {/* Timeline sections */}
      <div className="space-y-16">
        {sections.map((section, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={section.title}
              className={`flex flex-col md:flex-row ${isLeft ? "" : "md:flex-row-reverse"} items-start md:items-center`}
            >
              <div className="md:w-1/2 px-6">
                <div className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-blue-700 mb-4 tracking-tight">
                    {section.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-800 list-disc list-inside">
                    {section.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="hidden md:flex justify-center items-center w-1/2 relative">
                <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg absolute top-4">
                  <CheckCircle size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

