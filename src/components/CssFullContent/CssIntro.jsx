'use client'

const CssIntro = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-black space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-xl space-y-6 ml-10">
        <h1 className="text-4xl font-bold">Introduction to CSS</h1>
        <p className="text-lg">What is CSS and why is it essential for web development?</p>
        <p>
          CSS, or Cascading Style Sheets, is a styling language used to control the presentation of HTML or XML documents. It defines how elements like text, images, and layouts appear on a webpage, including colors, fonts, spacing, and responsiveness. CSS separates content (HTML) from design, making websites visually appealing and maintainable.
        </p>

        <h2 className="text-2xl font-semibold">Why Learn CSS?</h2>
        <p>
          CSS is a cornerstone of web development. It enables developers to create user-friendly, responsive, and aesthetically pleasing websites. With CSS, you can customize layouts, add animations, and ensure compatibility across devices, making it a critical skill for front-end developers.
        </p>

        <h2 className="text-2xl font-semibold">Key Benefits of CSS</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Separation of Concerns:</strong> Keeps styling separate from HTML structure.</li>
          <li><strong>Consistency:</strong> Apply uniform styles across multiple pages.</li>
          <li><strong>Flexibility:</strong> Supports a wide range of styling options, from basic colors to complex animations.</li>
          <li><strong>Responsiveness:</strong> Adapts designs for different screen sizes and devices.</li>
          <li><strong>Community and Tools:</strong> Rich ecosystem with frameworks (e.g., Tailwind, Bootstrap) and preprocessors (e.g., Sass).</li>
        </ul>

        <h2 className="text-2xl font-semibold">How CSS Works</h2>
        <p>
          CSS uses rules consisting of selectors and declarations to style HTML elements. Selectors target elements, and declarations define the styles (e.g., `color: blue;`). These rules cascade, meaning styles can inherit or override based on specificity and order.
        </p>

        <h2 className="text-2xl font-semibold">Example: Basic CSS Styling</h2>
        <pre className="bg-gray-100 text-[#FF7F50] p-4 rounded text-sm overflow-x-auto">
          <code>
{`/* Styling a paragraph */
p {
  color: #333;
  font-size: 16px;
  line-height: 1.5;
  font-family: Arial, sans-serif;
}

/* HTML to apply the style */
<p>This is a styled paragraph.</p>`}
          </code>
        </pre>

        <p className="italic text-[#FF7F50]">
          Add this CSS to a <code>&lt;style&gt;</code> tag or a <code>.css</code> file, and include the HTML in your page.
        </p>
      </div>
    </div>
  );
};

export default CssIntro;
