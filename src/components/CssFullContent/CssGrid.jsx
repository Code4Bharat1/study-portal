'use client'

const CssGrid = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-black space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-xl space-y-6 ml-10">
        <h1 className="text-4xl font-bold">CSS Grid</h1>
        <p className="text-lg">Build complex, two-dimensional layouts with CSS Grid.</p>
        <p>
          CSS Grid is a powerful layout system for creating two-dimensional grid-based layouts. It’s ideal for designing complex webpage structures with rows and columns.
        </p>

        <h2 className="text-2xl font-semibold">Key Grid Properties</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>display: grid;</strong> Enables grid layout on a container.</li>
          <li><strong>grid-template-columns/rows:</strong> Defines the grid structure.</li>
          <li><strong>grid-gap (or gap):</strong> Sets spacing between grid cells.</li>
          <li><strong>grid-area:</strong> Places items in specific grid areas.</li>
          <li><strong>justify/align-items:</strong> Aligns grid content.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Example: Grid Layout</h2>
        <pre className="bg-gray-100 text-[#FF7F50] p-4 rounded text-sm overflow-x-auto">
          <code>
{`/* Grid container */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Grid items */
.item {
  background-color: teal;
  padding: 20px;
  text-align: center;
  color: white;
}

/* HTML */
<div class="grid">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>`}
          </code>
        </pre>

        <p className="italic text-[#FF7F50]">
          Use CSS Grid for magazine-style layouts or dashboard designs.
        </p>
      </div>
    </div>
  );
};

export default CssGrid;