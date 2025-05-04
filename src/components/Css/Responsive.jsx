'use client'

const CssResponsiveDesign = () => {
  return (
    <div className="p-6 ml-80 mt-30 ">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Responsive Design</h1>
        <p className="text-lg">Create websites that adapt to all devices.</p>
        <p>
          Responsive design ensures your website looks great on any screen size, from mobile phones to desktops, using techniques like relative units, media queries, and flexible layouts.
        </p>

        <h2 className="text-2xl font-semibold">Key Techniques</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Relative Units:</strong> Use <code>%, vw, vh, rem, em</code> instead of fixed pixels.</li>
          <li><strong>Media Queries:</strong> Apply styles based on screen size or device features.</li>
          <li><strong>Fluid Layouts:</strong> Use Flexbox or Grid for adaptive grids.</li>
          <li><strong>Responsive Images:</strong> Use <code>max-width: 100%</code> or <code>srcset</code>.</li>
          <li><strong>Mobile-First Approach:</strong> Start with base styles, then enhance for larger screens.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Example: Media Query</h2>
        <pre className="bg-gray-100 text-[#FF7F50] p-4 rounded text-sm overflow-x-auto">
          <code>
{`/* Base styles */
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Desktop styles */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}

/* HTML */
<div class="container">
  <div style="background: coral; padding: 20px;">Box 1</div>
  <div style="background: teal; padding: 20px;">Box 2</div>
</div>`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">Responsive Images</h2>
        <pre className="bg-gray-100 text-[#FF7F50] p-4 rounded text-sm overflow-x-auto">
          <code>
{`/* Responsive image */
img {
  max-width: 100%;
  height: auto;
}

/* HTML */
<img src="example.jpg" alt="Responsive image">`}
          </code>
        </pre>

        <p className="italic text-[#FF7F50]">
          Test your design across devices using browser dev tools to ensure responsiveness.
        </p>
      </div>
    </div>
  );
};

export default CssResponsiveDesign;