'use client'

const CssAnimations = () => {
  return (
    <div className="p-6 ml-80 mt-30 ">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">CSS Animations</h1>
        <p className="text-lg">Add dynamic effects to your web elements.</p>
        <p>
          CSS animations and transitions allow you to create smooth, engaging effects like fades, slides, or rotations, enhancing user experience.
        </p>

        <h2 className="text-2xl font-semibold">Transitions vs. Animations</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Transitions:</strong> Smooth changes between two states (e.g., hover effects).</li>
          <li><strong>Animations:</strong> Custom keyframes for complex, multi-step effects.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Example: Transition</h2>
        <pre className="bg-gray-100 text-[#FF7F50] p-4 rounded text-sm overflow-x-auto">
          <code>
{`/* Transition */
.box {
  width: 100px;
  height: 100px;
  background-color: purple;
  transition: all 0.3s ease;
}

.box:hover {
  width: 150px;
  background-color: orange;
}

/* HTML */
<div class="box"></div>`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">Example: Animation</h2>
        <pre className="bg-gray-100 text-[#FF7F50] p-4 rounded text-sm overflow-x-auto">
          <code>
{`/* Animation keyframes */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}

/* Apply animation */
.box {
  width: 100px;
  height: 100px;
  background-color: green;
  animation: bounce 1s infinite;
}

/* HTML */
<div class="box"></div>`}
          </code>
        </pre>

        <p className="italic text-[#FF7F50]">
          Use transitions for simple effects and animations for complex sequences.
        </p>
      </div>
    </div>
  );
};

export default CssAnimations;