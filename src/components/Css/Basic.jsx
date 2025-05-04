'use client'

const CssBasicSelectors = () => {
  return (
    <div className="p-6 ml-80 mt-30 ">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Basic CSS Selectors</h1>
        <p className="text-lg">Master the foundational selectors for styling web elements.</p>
        <p>
          Basic selectors are the building blocks of CSS, allowing you to target elements by their tag name, class, or ID. They are simple yet powerful for applying styles across your website.
        </p>

        <h2 className="text-2xl font-semibold">Key Basic Selectors</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Element Selector:</strong> Targets all elements of a specific tag (e.g., <code>h1</code>, <code>div</code>).</li>
          <li><strong>Class Selector:</strong> Targets elements with a specific class attribute (e.g., <code>.btn</code>).</li>
          <li><strong>ID Selector:</strong> Targets a single element with a unique ID (e.g., <code>#header</code>).</li>
        </ul>

        <h2 className="text-2xl font-semibold">Example: Basic Selectors</h2>
        <pre className="bg-gray-100 text-[#FF7F50] p-4 rounded text-sm overflow-x-auto">
          <code>
{`/* Element selector */
h1 {
  color: navy;
}

/* Class selector */
.alert {
  border: 2px solid red;
}

/* ID selector */
#footer {
  background-color: #333;
  color: white;
}

/* HTML */
<h1>Welcome</h1>
<div class="alert">Warning!</div>
<div id="footer">Footer Content</div>`}
          </code>
        </pre>

        <p className="italic text-[#FF7F50]">
          Use these selectors to style different parts of your webpage efficiently.
        </p>
      </div>
    </div>
  );
};

export default CssBasicSelectors;