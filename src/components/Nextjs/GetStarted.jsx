"use client";

const GetStartedPage = () => {
  return (
    <div className="p-6 ">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Get Started with Next.js</h1>
        <p className="mb-4">
          Next.js is an exciting framework that makes it easier to build fast, scalable, and SEO-friendly web applications. Think of it like a toolbox for web developers, providing everything you need to create modern websites. Let’s walk through the steps to build your very first Next.js project!
        </p>

        {/* Setting Up Next.js */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Setting Up Your First Next.js Project</h2>
          <p className="mb-4">
            To start with Next.js, we need to set up our project. Setting up a project in Next.js is as simple as setting up a new game – you just need to run a few commands and everything is ready!
          </p>

          {/* Installation */}
          <h3 className="text-xl font-semibold mb-4">Install Next.js</h3>
          <p className="mb-4">
            To create your first Next.js app, open your terminal (like a command center for your computer) and run the following commands:
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`npx create-next-app@latest my-next-app
cd my-next-app
npm run dev`}</code>
          </pre>
          <p className="mb-4">
            After running these commands, you can open your web browser and go to <code>http://localhost:3000</code> to see your Next.js app running locally – it’s like previewing your work before showing it to the world!
          </p>
        </section>

        {/* Project Structure */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Next.js Project Structure</h2>
          <p className="mb-4">
            A Next.js project is organized in a simple way, making it easy to find things. It's like having a well-organized bookshelf where each book (or file) has a clear place.
          </p>

          {/* Folder Overview */}
          <h3 className="text-xl font-semibold mb-4">Folder Overview</h3>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>pages/</strong>: This folder is where you create the pages of your website. Each file in this folder becomes a new page. For example, `about.js` creates the "About" page!</li>
            <li><strong>public/</strong>: Store images, fonts, or other files here that need to be available to anyone visiting your site.</li>
            <li><strong>styles/</strong>: This folder contains your styling files (like CSS), which you use to make your website look good.</li>
            <li><strong>next.config.js</strong>: This is like a settings page where you can customize Next.js to work just how you want it.</li>
          </ul>
        </section>

        {/* Adding New Pages */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Adding New Pages</h2>
          <p className="mb-4">
            Just like adding new pages to a book, you can create new pages for your Next.js app by adding a new file in the `pages/` folder.
          </p>

          {/* Creating a Page */}
          <h3 className="text-xl font-semibold mb-4">Creating a Page</h3>
          <p className="mb-4">
            If you want to create a "About Us" page, for example, just add a file called `about.js` in the `pages/` folder. Here’s how to do it:
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/about.js
export default function About() {
  return <h1>About Us</h1>;
}`}</code>
          </pre>
          <p className="mb-4">
            Now, if you go to <code>http://localhost:3000/about</code>, you'll see your "About Us" page! It’s like opening a new chapter in your book.
          </p>
        </section>

        {/* Linking Pages */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Linking Pages</h2>
          <p className="mb-4">
            When you're reading a book, you can jump to any chapter by following links. In the same way, you can link between pages in Next.js using the <code>Link</code> component.
          </p>

          {/* Using the Link Component */}
          <h3 className="text-xl font-semibold mb-4">Using the Link Component</h3>
          <p className="mb-4">
            Let’s say you want to create a link from your home page to the "About" page. You can do that like this:
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <Link href="/about">Go to About Page</Link>
    </div>
  );
}`}</code>
          </pre>
          <p className="mb-4">
            Now, when you visit <code>http://localhost:3000</code>, you’ll see a link that says "Go to About Page." Clicking it will take you straight to your "About Us" page. It's like adding a bookmark to a chapter in your book!
          </p>
        </section>

        {/* Final Thoughts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Keep Building</h2>
          <p className="mb-4">
            Congratulations! You've just built your first Next.js app! But this is just the beginning. As you continue learning, you can explore advanced features like Server-Side Rendering (SSR), Static Site Generation (SSG), and API Routes to make your app even more powerful!
          </p>
        </section>

        <p className="italic text-blue-300">
          Keep coding and enjoy the exciting world of Next.js!
        </p>
      </div>
    </div>
  );
};

export default GetStartedPage;
