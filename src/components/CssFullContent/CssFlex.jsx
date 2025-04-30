'use client'

const CssFlexbox = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-black space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-xl space-y-6 ml-10">
        <h1 className="text-4xl font-bold">CSS Flexbox</h1>
        <p className="text-lg">Create flexible and responsive layouts with ease.</p>
        <p>
          Flexbox is a CSS layout module designed for one-dimensional layouts, making it ideal for aligning and distributing items within a container, either horizontally or vertically.
        </p>

        <h2 className="text-2xl font-semibold">Key Flexbox Properties</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>display: flex;</strong> Enables flexbox on a container.</li>
          <li><strong>flex-direction:</strong> Defines the main axis (row or column).</li>
          <li><strong>justify-content:</strong> Aligns items along the main axis.</li>
          <li><strong>align-items:</strong> Aligns items along the cross axis.</li>
          <li><strong>flex:</strong> Controls item growth, shrinkage, and basis.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Example: Flexbox Layout</h2>
        <pre className="bg-gray-100 text-[#FF7F50] p-4 rounded text-sm overflow-x-auto">
          <code>
{`/* Flexbox container */
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

/* Flex items */
.item {
  flex: 1;
  background-color: coral;
  padding: 20px;
  text-align: center;
}

/* HTML */
<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>`}
          </code>
        </pre>

        <p className="italic text-[#FF7F50]">
          Use flexbox for responsive navigation bars, card layouts, and more.
        </p>
      </div>
    </div>
  );
};

export default CssFlexbox;