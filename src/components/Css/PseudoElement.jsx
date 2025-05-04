'use client'

const CssPseudoElements = () => {
  return (
    <div className="p-6 ml-80 mt-30 ">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">CSS Pseudo-Elements</h1>
        <p className="text-lg">Style specific parts of an element.</p>
        <p>
          Pseudo-elements allow you to style specific parts of an element, such as the first line, first letter, or content before/after an element.
        </p>

        <h2 className="text-2xl font-semibold">Common Pseudo-Elements</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>::before:</strong> Inserts content before an element.</li>
          <li><strong>::after:</strong> Inserts content after an element.</li>
          <li><strong>::first-line:</strong> Styles the first line of text.</li>
          <li><strong>::first-letter:</strong> Styles the first letter of text.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Example: Pseudo-Elements</h2>
        <pre className="bg-gray-100 text-[#FF7F50] p-4 rounded text-sm overflow-x-auto">
          <code>
{`/* Before pseudo-element */
p::before {
  content: "★ ";
  color: gold;
}

/* First letter */
p::first-letter {
  font-size: 2em;
  color: red;
}

/* HTML */
<p>Lorem ipsum dolor sit amet.</p>`}
          </code>
        </pre>

        <p className="italic text-[#FF7F50]">
          Use pseudo-elements to add decorative or structural styling.
        </p>
      </div>
    </div>
  );
};

export default CssPseudoElements;