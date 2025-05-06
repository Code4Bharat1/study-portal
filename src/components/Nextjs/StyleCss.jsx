"use client";

const StylingWithCssPage = () => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Styling with CSS in Next.js</h1>
        <p className="mb-4">
          CSS (Cascading Style Sheets) is like the clothing of your website. It dresses up your pages, making them look nice and organized. In Next.js, you can style your app in different ways, but let’s start with CSS.
        </p>

        {/* CSS in Next.js */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Using Global CSS</h2>
          <p className="mb-4">
            Global CSS affects your entire application. You can define global styles for the whole app in one central place, like setting the background color or font styles that apply to all pages.
          </p>
          <p className="mb-4">
            To use global CSS, go to your <code>styles/</code> folder and open the <code>globals.css</code> file. You can add your styles there.
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`/* styles/globals.css */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}`}</code>
          </pre>

          <p className="mb-4">
            This will make the text on your website use the Arial font and set a light gray background color for the whole page.
          </p>
        </section>

        {/* Component-Level CSS */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Component-Level CSS</h2>
          <p className="mb-4">
            Sometimes, you want to style specific components differently. Instead of affecting the whole app, you can create styles that apply only to a specific component.
          </p>
          <p className="mb-4">
            In Next.js, you can use CSS Modules to achieve this. It’s like giving each component its own wardrobe.
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// components/Button.js
import styles from './Button.module.css';

export default function Button() {
  return <button className={styles.button}>Click me</button>;
}

// components/Button.module.css
.button {
  background-color: blue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}`}</code>
          </pre>

          <p className="mb-4">
            In the example above, we created a <code>Button.module.css</code> file for styling the button. The styles defined in this file only apply to the <code>Button</code> component, not to other components.
          </p>
        </section>

        {/* Inline CSS */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Inline CSS</h2>
          <p className="mb-4">
            You can also apply styles directly to elements within your component using inline CSS. This is like adding a quick accessory to a shirt.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`export default function InlineButton() {
  return <button style={{ backgroundColor: 'green', color: 'white' }}>Click me</button>;
}`}</code>
          </pre>
          <p className="mb-4">
            Inline styles are defined directly on the component. The downside is that you can’t use features like hover effects or media queries, but it’s fast for small changes.
          </p>
        </section>

        {/* Styled JSX */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Styled JSX</h2>
          <p className="mb-4">
            Styled JSX is a special feature in Next.js that lets you add scoped styles to your components. It’s like a unique outfit that only one component can wear.
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`export default function StyledButton() {
  return (
    <div>
      <button className="styled-button">Click me</button>

      <style jsx>{\`
        .styled-button {
          background-color: purple;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
        }
      \`}</style>
    </div>
  );
}`}</code>
          </pre>

          <p className="mb-4">
            With Styled JSX, the styles are scoped only to this component. This means that no other component will accidentally inherit these styles.
          </p>
        </section>

        {/* When to Use Which Method */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. When to Use Which Method?</h2>
          <p className="mb-4">
            Each method has its use case:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Global CSS:</strong> For global styles that affect the entire app, like font families and background colors.</li>
            <li><strong>CSS Modules:</strong> For component-specific styles that should not leak into other components.</li>
            <li><strong>Inline CSS:</strong> For small, one-time style adjustments.</li>
            <li><strong>Styled JSX:</strong> For scoped styles that are unique to each component.</li>
          </ul>
        </section>

        {/* Final Thoughts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Final Thoughts</h2>
          <p className="mb-4">
            Now that you know how to style your Next.js app, experiment with these different approaches to find what works best for you and your project.
          </p>
        </section>

        <p className="italic text-blue-300">
          Styling is like decorating your app. Make it look amazing and user-friendly!
        </p>
      </div>
    </div>
  );
};

export default StylingWithCssPage;
