"use client";

const HomePage = () => {
  return (
    <div >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Welcome to Next.js Learning</h1>
        <p className="mb-4">
          This site provides interactive tutorials and resources to help you master Next.js. Explore the fundamental concepts of building dynamic websites and server-side rendered applications with Next.js!
        </p>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Learn Next.js Fundamentals</h2>
          <p className="mb-4">
            Next.js is a powerful framework built on top of React that enables developers to create highly optimized web applications. It allows you to build both static and dynamic websites with ease, including support for server-side rendering (SSR) and static site generation (SSG).
          </p>

          {/* Next.js Basics */}
          <h3 className="text-xl font-semibold mb-4">Basics of Next.js</h3>
          <p className="mb-4">
            Next.js simplifies the process of developing React applications by providing built-in functionalities such as automatic routing, server-side rendering, and API routes. You'll start by learning how to create a basic Next.js project and build your first page.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`npx create-next-app@latest my-next-app
cd my-next-app
npm run dev`}</code>
          </pre>

          {/* Advanced Next.js Concepts */}
          <h3 className="text-xl font-semibold mb-4">Advanced Concepts</h3>
          <p className="mb-4">
            As you progress, you will dive into more advanced Next.js features, such as Server-Side Rendering (SSR), Static Site Generation (SSG), and API routes. These features allow you to fetch data from external sources, generate dynamic content, and optimize your web applications.
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
            One of the powerful features of Next.js is automatic routing. Each file in the `pages/` directory automatically becomes a route, making navigation seamless. Learn how to create pages, nested routes, and dynamic routes to organize your app efficiently.
          </p>

          {/* Creating Pages */}
          <h3 className="text-xl font-semibold mb-4">Creating Pages</h3>
          <p className="mb-4">
            In Next.js, creating a page is as simple as adding a file in the `pages/` directory. For example, to create a "Home" page, simply add an `index.js` file inside the `pages/` folder.
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
            Next.js also supports dynamic routing. You can create routes that accept parameters by using square brackets in the file name, such as `[id].js`.
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
            Test your knowledge and enhance your skills by solving Next.js exercises directly in the browser.
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
            Next.js is a powerful and versatile framework that supports many advanced features, including custom error pages, image optimization, and API routes. Keep exploring and building apps to deepen your understanding and improve your Next.js skills.
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
