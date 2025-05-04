'use client'

const CssBoxModel = () => {
  return (
    <div className="p-6 ml-80 mt-30 ">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">CSS Box Model</h1>
        <p className="text-lg">Understand how elements are sized and spaced.</p>
        <p>
          The CSS box model describes how elements are rendered as rectangular boxes, consisting of content, padding, borders, and margins. Understanding the box model is key to controlling layout and spacing.
        </p>

        <h2 className="text-2xl font-semibold">Components of the Box Model</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Content:</strong> The actual content (text, images, etc.).</li>
          <li><strong>Padding:</strong> Space between content and border.</li>
          <li><strong>Border:</strong> Surrounds the padding.</li>
          <li><strong>Margin:</strong> Space outside the border.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Example: Box Model</h2>
        <pre className="bg-gray-100 text-[#FF7F50] p-4 rounded text-sm overflow-x-auto">
          <code>
{`/* Box model styling */
.box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
  margin: 30px;
  background-color: lightblue;
}

/* HTML */
<div class="box">Box Model Example</div>`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">Box-Sizing Property</h2>
        <p>
          The <code>box-sizing</code> property controls how width and height are calculated:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>content-box:</strong> Default, width/height exclude padding and border.</li>
          <li><strong>border-box:</strong> Width/height include padding and border (often preferred).</li>
        </ul>

        <p className="italic text-[#FF7F50]">
          Use <code>box-sizing: border-box;</code> globally for predictable layouts.
        </p>
      </div>
    </div>
  );
};

export default CssBoxModel;