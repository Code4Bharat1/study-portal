'use client';
import { CheckCircle } from "lucide-react"; // Removed ArrowRightCircle
import { useState } from "react";

export default function PerformanceChecklistAlternating() {
  const sections = [
        {
          title: "Use a Consistent Naming Convention",
          items: [
            "BEM (Block, Element, Modifier) is a popular naming convention that helps maintain clarity in large projects.",
            "By using a consistent and descriptive naming system, it becomes easier to understand and maintain the code, especially in larger teams."
          ]
        },
        {
          title: "Keep CSS DRY (Don’t Repeat Yourself)",
          items: [
            "Avoid repeating the same styles in multiple places.",
            "Instead, group common styles into reusable classes or use inheritance when appropriate.",
            "Utilize utility classes (e.g., .text-center, .m-2 for margin) for reusable styles."
          ]
        },
        {
          title: "Use External Stylesheets",
          items: [
            "Link to external stylesheets instead of using inline styles or embedding styles within HTML.",
            "This helps with code separation, improves performance, and allows the CSS file to be cached by the browser."
          ]
        },
        {
          title: "Minimize the Use of IDs for Styling",
          items: [
            "IDs have higher specificity, making the code more difficult to manage.",
            "Use classes for styling to avoid specificity issues.",
            "IDs should be used for unique elements, like a single header, not for styling purposes."
          ]
        },
        {
          title: "Use CSS Variables (Custom Properties)",
          items: [
            "CSS variables allow you to store values that can be reused throughout your stylesheet.",
            "This makes it easier to manage themes, colors, and other repetitive values across your CSS."
          ]
        },
        {
          title: "Avoid Inline Styles",
          items: [
            "Inline styles can add extra weight to your HTML and make it harder to manage and override styles.",
            "Use them sparingly, if at all."
          ]
        },
        {
          title: "Use Flexbox and Grid for Layouts",
          items: [
            "Rather than relying on floats or other outdated methods for layouts, use Flexbox or Grid.",
            "These modern layout systems offer greater flexibility and ease of use for building responsive designs."
          ]
        },
        {
          title: "Keep CSS Specificity Low",
          items: [
            "Avoid overly complex CSS selectors, as they can make your styles harder to override and lead to unexpected results.",
            "Simpler, more straightforward selectors are usually easier to manage."
          ]
        },
        {
          title: "Optimize for Performance",
          items: [
            "Minify your CSS to remove unnecessary characters like spaces and comments, reducing file size and improving page load times.",
            "Avoid overly complex selectors, as they can negatively impact browser performance."
          ]
        },
        {
          title: "Mobile-First and Responsive Design",
          items: [
            "Start your design with mobile devices in mind and then use media queries to adjust styles for larger screens.",
            "This ensures your design is responsive and works well across different devices."
          ]
        },
        {
          title: "Use Comments Wisely",
          items: [
            "Comments help explain why certain decisions were made, especially in complex or unclear code.",
            "Use comments to clarify the intention behind the code, rather than how things work (which should be evident from the code itself)."
          ]
        },
        {
          title: "Avoid `!important`",
          items: [
            "Using `!important` can make debugging and maintaining styles more difficult.",
            "It can also break the natural cascading behavior of CSS.",
            "Instead, focus on managing specificity and cascading rules properly."
          ]
        },
        {
          title: "Organize Your Stylesheets",
          items: [
            "Split your CSS into logical sections or files, such as:",
            "Base styles (e.g., resets, typography)",
            "Layout styles (e.g., grid, header, footer)",
            "Component styles (e.g., buttons, cards)",
            "Theme styles (e.g., colors, fonts)",
            "This modular approach helps keep the codebase organized and easier to manage."
          ]
        },
        {
          title: "Use CSS Resets or Normalize.css",
          items: [
            "Different browsers have different default styles.",
            "Using a reset or normalize stylesheet ensures consistency across all browsers and helps prevent unexpected styling issues."
          ]
        },
        {
          title: "Leverage CSS Transitions and Animations",
          items: [
            "CSS transitions and animations provide a way to add interactivity and improve the user experience without relying on JavaScript.",
            "They are powerful tools for creating dynamic, responsive designs."
          ]
        },
        {
          title: "Be Mindful of Accessibility",
          items: [
            "Make sure that your styles and designs comply with accessibility guidelines.",
            "Pay attention to color contrast, ensuring that text is readable for users with visual impairments.",
            "Also, make sure interactive elements are focusable and operable via keyboard."
          ]
        },
        {
          title: "Test on Different Devices and Browsers",
          items: [
            "Always test your styles across various screen sizes and browsers to ensure your design works as expected.",
            "Tools like BrowserStack or using the responsive design mode in your browser’s developer tools can help with testing."
          ]
        }
      
      
  ];

  return (
    <div className="relative p-8 max-w-8xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-lg">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-12 tracking-tight">
        Best Practice for CSS
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
