"use client";

const HomePage = () => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Welcome to Next.js Learning</h1>
        <p className="mb-4">
          This site provides interactive tutorials and resources to help you master Next.js. Explore the fundamental concepts of building dynamic websites and server-side rendered applications with Next.js!
        </p>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Learn Next.js Fundamentals</h2>
          <p className="mb-4">
            Next.js is a React framework that enables you to build static and server-side rendered applications. It provides a powerful set of features for web development, such as automatic routing, static site generation, and API routes.
          </p>

          {/* Next.js Basics */}
          <h3 className="text-xl font-semibold mb-4">Basics of Next.js</h3>
          <p className="mb-4">
            Learn the basics of Next.js, including how to set up your first Next.js project, create pages, and configure routing.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`npx create-next-app@latest my-next-app
cd my-next-app
npm run dev`}</code>
          </pre>

          {/* Advanced Next.js Concepts */}
          <h3 className="text-xl font-semibold mb-4">Advanced Concepts</h3>
          <p className="mb-4">
            Once you're comfortable with the basics, dive into advanced topics like Server-Side Rendering (SSR), Static Site Generation (SSG), and API Routes in Next.js.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}

export default function Page({ data }) {
  return <div>{data}</div>;
}`}</code>
          </pre>
        </section>

        {/* Learn Pages & Routing */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Learn Pages & Routing</h2>
          <p className="mb-4">
            Pages in Next.js are automatically routed based on their file names in the `pages/` directory. Learn how to create dynamic routes, nested routes, and link between pages.
          </p>

          {/* Creating Pages */}
          <h3 className="text-xl font-semibold mb-4">Creating Pages</h3>
          <p className="mb-4">
            Create a page in Next.js by adding a JavaScript file inside the `pages/` folder. For example, to create a "Home" page, create a file named `index.js` in `pages/`.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/index.js
export default function Home() {
  return <h1>Welcome to Next.js!</h1>;
}`}</code>
          </pre>

          {/* Dynamic Routing */}
          <h3 className="text-xl font-semibold mb-4">Dynamic Routing</h3>
          <p className="mb-4">
            Learn how to create dynamic routes using square brackets in the file name, such as `[id].js`.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/[id].js
export default function Page({ params }) {
  return <h1>Page ID: {params.id}</h1>;
}`}</code>
          </pre>
        </section>

        {/* Interactive Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Interactive Exercises</h2>
          <p className="mb-4">
            Get hands-on practice by solving Next.js exercises directly in the browser.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// Try to solve this exercise!
export async function getStaticProps() {
  return { props: { message: "Hello, Next.js!" } };
}

export default function Page({ message }) {
  return <div>{message}</div>;
}`}</code>
          </pre>
        </section>

        {/* Final Thoughts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Keep Learning</h2>
          <p className="mb-4">
            Next.js is a powerful framework that offers much more than just static and server-side rendering. Explore features like API routes, custom error pages, and image optimization to further enhance your apps.
          </p>
        </section>

        <p className="italic text-blue-300">
          Happy coding! Enjoy the journey of becoming a Next.js expert.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
