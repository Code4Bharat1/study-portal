'use client'

const CssCombinators = () => {
  return (
    <div className="p-6 ml-80 mt-30 ">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">CSS Combinators</h1>
        <p className="text-lg">Learn how to combine selectors to target specific elements.</p>
        <p>
          Combinators allow you to target elements based on their relationships, such as descendants, children, or siblings, providing precise control over styling.
        </p>

        <h2 className="text-2xl font-semibold">Types of Combinators</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Descendant Combinator (space):</strong> Targets elements nested within another (e.g., <code>div p</code>).</li>
          <li><strong>Child Combinator :</strong> Targets direct children (e.g., <code>ul  li</code>).</li>
          <li><strong>Adjacent Sibling Combinator (+):</strong> Targets the next sibling (e.g., <code>h2 + p</code>).</li>
          <li><strong>General Sibling Combinator (~):</strong> Targets all subsequent siblings (e.g., <code>h2 ~ p</code>).</li>
        </ul>

        <h2 className="text-2xl font-semibold">Example: Combinators</h2>
        <pre className="bg-gray-100 text-[#FF7F50] p-4 rounded text-sm overflow-x-auto">
          <code>
{`/* Descendant combinator */
div p {
  color: green;
}

/* Child combinator */
ul > li {
  list-style: none;
}

/* Adjacent sibling combinator */
h2 + p {
  font-weight: bold;
}

/* HTML */
<div>
  <p>Nested paragraph</p>
</div>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
<h2>Title</h2>
<p>Adjacent paragraph</p>`}
          </code>
        </pre>

        <p className="italic text-[#FF7F50]">
          Experiment with combinators to target specific element relationships.
        </p>
      </div>
    </div>
  );
};

export default CssCombinators;