'use client'

const CssHomePage = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-black space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-xl space-y-6 ml-10">
        <h1 className="text-4xl font-bold">Welcome to CSS Home</h1>
        <p className="text-lg">What is CSS and why should you learn it?</p>
        <p>
          CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML. It controls the layout, colors, fonts, and overall visual appearance of web pages, making them engaging and user-friendly.
        </p>
        
        <h2 className="text-2xl font-semibold">CSS Ecosystem</h2>
        <p>
          CSS is more than just a styling language; it’s part of a rich ecosystem that includes frameworks like Tailwind CSS and Bootstrap, preprocessors like Sass and Less, and tools for responsive design. This ecosystem empowers developers to create visually stunning and responsive websites efficiently.
        </p>
        
        <h2 className="text-2xl font-semibold">Key Features of CSS</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Styling Flexibility:</strong> Control colors, fonts, layouts, and animations.</li>
          <li><strong>Responsive Design:</strong> Media queries for adaptive layouts across devices.</li>
          <li><strong>Cascading Rules:</strong> Predictable style application with specificity and inheritance.</li>
          <li><strong>Modular:</strong> Supports frameworks and preprocessors for scalable styling.</li>
          <li><strong>Browser Compatibility:</strong> Works across all modern browsers with vendor prefixes.</li>
        </ul>

        <h2 className="text-2xl font-semibold">What You Can Build With CSS</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Visually appealing website layouts</li>
          <li>Responsive designs for mobile and desktop</li>
          <li>Interactive UI components like buttons and menus</li>
          <li>Animations and transitions for dynamic effects</li>
          <li>Custom themes and design systems</li>
        </ul>

        <h2 className="text-2xl font-semibold">First Example: CSS Styling</h2>
        <pre className="bg-gray-100 text-[#FF7F50] p-4 rounded text-sm overflow-x-auto">
          <code>
{`/* Styling a button with hover effect */
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}

/* HTML to use the styled button */
<button class="button">Click Me</button>`}
          </code>
        </pre>

        <p className="italic text-[#FF7F50]">Add this CSS to a <code>&lt;style&gt;</code> tag or a <code>.css</code> file and include the HTML in your page.</p>
      </div>
    </div>
  );
};

export default CssHomePage;