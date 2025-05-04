'use client'

const CssPseudoClasses = () => {
  return (
    <div className="p-6 ml-80 mt-30 ">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">CSS Pseudo-Classes</h1>
        <p className="text-lg">Style elements based on their state or position.</p>
        <p>
          Pseudo-classes allow you to style elements based on user interactions (e.g., hover, focus) or their position in the document (e.g., first-child, nth-child).
        </p>

        <h2 className="text-2xl font-semibold">Common Pseudo-Classes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>:hover:</strong> Styles an element when hovered.</li>
          <li><strong>:active:</strong> Styles an element when clicked.</li>
          <li><strong>:focus:</strong> Styles an element when focused (e.g., input fields).</li>
          <li><strong>:first-child:</strong> Targets the first child of a parent.</li>
          <li><strong>:nth-child(n):</strong> Targets elements based on their position.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Example: Pseudo-Classes</h2>
        <pre className="bg-gray-100 text-[#FF7F50] p-4 rounded text-sm overflow-x-auto">
          <code>
{`/* Hover effect */
a:hover {
  color: red;
}

/* Focus effect */
input:focus {
  border-color: blue;
}

/* First child */
li:first-child {
  font-weight: bold;
}

/* HTML */
<a href="#">Link</a>
<input type="text" placeholder="Enter text">
<ul>
  <li>First</li>
  <li>Second</li>
</ul>`}
          </code>
        </pre>

        <p className="italic text-[#FF7F50]">
          Use pseudo-classes to enhance interactivity and structure-based styling.
        </p>
      </div>
    </div>
  );
};

export default CssPseudoClasses;