"use client";

const DataFetchingPage = () => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Data Fetching in Next.js</h1>
        <p className="mb-4">
          Data fetching is a crucial part of building dynamic websites. It allows your app to get information from external sources (like APIs or databases) and display it to users. Let’s go through how you can fetch data in Next.js.
        </p>

        {/* Fetching Data */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Fetching Data in Next.js</h2>
          <p className="mb-4">
            In Next.js, you can fetch data in different ways depending on whether you want to fetch the data on the server (before the page loads) or in the browser (after the page loads).
          </p>
          <p className="mb-4">
            Let’s start with some simple ways to fetch data.
          </p>
        </section>

        {/* Static Generation (getStaticProps) */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Static Generation with getStaticProps</h2>
          <p className="mb-4">
            Static Generation (SSG) is like preparing a meal in advance and keeping it ready for guests. You fetch the data before the page is built and save it, so when users visit, everything is served instantly.
          </p>
          <p className="mb-4">
            In Next.js, you can fetch data at build time using the <code>getStaticProps</code> function.
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/posts.js
export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();

  return {
    props: {
      posts: data,
    },
  };
}

export default function Posts({ posts }) {
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}`}</code>
          </pre>

          <p className="mb-4">
            In this example, the <code>getStaticProps</code> function fetches the posts from an external API and returns the data as props. The posts are then displayed when the page is loaded.
          </p>
        </section>

        {/* Server-Side Rendering (getServerSideProps) */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Server-Side Rendering with getServerSideProps</h2>
          <p className="mb-4">
            Server-Side Rendering (SSR) is like cooking a meal for each guest when they arrive. Instead of preparing everything in advance, you fetch the data every time the user visits the page.
          </p>
          <p className="mb-4">
            In Next.js, you can use the <code>getServerSideProps</code> function to fetch data on every request, which is useful for pages where the content changes often.
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/user.js
export async function getServerSideProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();

  return {
    props: {
      users: data,
    },
  };
}

export default function Users({ users }) {
  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}`}</code>
          </pre>

          <p className="mb-4">
            In this example, the <code>getServerSideProps</code> function fetches the users' data on every request and displays it. This is useful if you want to always display the most up-to-date information.
          </p>
        </section>

        {/* Client-Side Data Fetching */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Client-Side Data Fetching</h2>
          <p className="mb-4">
            Client-Side Data Fetching is like cooking a meal while your guests are already sitting at the table. You fetch the data after the page is loaded, making it perfect for dynamic content that doesn’t need to be fetched in advance.
          </p>
          <p className="mb-4">
            You can use <code>useEffect</code> and <code>fetch</code> in React to fetch data once the component is mounted.
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`import { useEffect, useState } from 'react';

export default function ClientSidePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}`}</code>
          </pre>

          <p className="mb-4">
            In this example, data is fetched when the component is mounted using the <code>useEffect</code> hook. This is client-side rendering, which fetches data after the page has loaded.
          </p>
        </section>

        {/* Final Thoughts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Final Thoughts</h2>
          <p className="mb-4">
            In Next.js, you can fetch data in many ways depending on how fast you need the data to be available:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Static Generation (SSG):</strong> Fetch data at build time.</li>
            <li><strong>Server-Side Rendering (SSR):</strong> Fetch data on each request.</li>
            <li><strong>Client-Side Rendering (CSR):</strong> Fetch data after the page has loaded.</li>
          </ul>
        </section>

        <p className="italic text-blue-300">
          Now, you can choose the right data-fetching method for your Next.js app based on the needs of your project!
        </p>
      </div>
    </div>
  );
};

export default DataFetchingPage;
