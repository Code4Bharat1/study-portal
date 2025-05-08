"use client";

const NextHomePage = () => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Welcome to Next.js Learning</h1>
        <p className="mb-4">
          <span className="font-semibold">For Beginners:</span> This site is like a toy workshop where you learn to build amazing toys (websites) using Next.js, a tool that makes websites fast and fun to create.  
          <span className="font-semibold">For Coders:</span> This site offers interactive tutorials to master Next.js, a React framework for building dynamic, SEO-friendly web applications with features like server-side rendering, static generation, and file-based routing.
        </p>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Learn Next.js Fundamentals</h2>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> Next.js is like a magic toolbox in a toy workshop. It helps you create toys (web pages) that load quickly and work smoothly.  
            <span className="font-semibold">For Coders:</span> Next.js is a React framework that simplifies building static and server-side rendered applications, offering automatic routing, static site generation (SSG), server-side rendering (SSR), and API routes.
          </p>

          {/* Next.js Basics */}
          <h3 className="text-xl font-semibold mb-4">Basics of Next.js</h3>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> Start by learning how to set up your workshop, create toy designs (pages), and connect them so visitors can explore.  
            <span className="font-semibold">For Coders:</span> Master core concepts like project setup, file-based routing, and page creation in the Pages or App Router.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`npx create-next-app@latest my-next-app
cd my-next-app
npm run dev`}</code>
          </pre>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> Type these commands in your computer’s command app to start your workshop. Visit <code>http://localhost:3000</code> to see your first toy!  
            <span className="font-semibold">For Coders:</span> <code>create-next-app</code> scaffolds a Next.js project (v14+) with TypeScript and Tailwind CSS options. <code>npm run dev</code> runs the app locally. Use <code>--turbo</code> for faster builds.
          </p>

          {/* Advanced Next.js Concepts */}
          <h3 className="text-xl font-semibold mb-4">Advanced Concepts</h3>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> Once you know the basics, learn to make toys that update instantly or fetch new parts automatically.  
            <span className="font-semibold">For Coders:</span> Explore advanced features like SSR, SSG, API routes, and the App Router’s server components for dynamic, performant apps.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/data.js (Pages Router)
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}

export default function Page({ data }) {
  return <div>{data}</div>;
}

// app/data/page.js (App Router)
async function fetchData() {
  const res = await fetch('https://api.example.com/data', { cache: 'no-store' });
  return res.json();
}

export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}`}</code>
          </pre>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> This code grabs new toy parts (data) when someone visits your page, keeping it fresh.  
            <span className="font-semibold">For Coders:</span> In the Pages Router, <code>getServerSideProps</code> fetches data per request (SSR). In the App Router, server components with <code>cache: 'no-store'</code> achieve SSR, simplifying data fetching.
          </p>
        </section>

        {/* Learn Pages & Routing */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Learn Pages & Routing</h2>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> Pages are like different toys in your workshop. You name them, and visitors can find them easily, like picking a toy by its label.  
            <span className="font-semibold">For Coders:</span> Next.js uses file-based routing, where files in <code>pages/</code> (Pages Router) or <code>app/</code> (App Router) define routes automatically, supporting static and dynamic paths.
          </p>

          {/* Creating Pages */}
          <h3 className="text-xl font-semibold mb-4">Creating Pages</h3>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> To make a “Home” toy, create a file in your workshop’s page shelf, and it becomes a page visitors can see.  
            <span className="font-semibold">For Coders:</span> Add a file like <code>index.js</code> in <code>pages/</code> or <code>page.js</code> in <code>app/</code> to define a route.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/index.js (Pages Router)
export default function Home() {
  return <h1>Welcome to Next.js!</h1>;
}

// app/page.js (App Router)
export default function Home() {
  return <h1>Welcome to Next.js!</h1>;
}`}</code>
          </pre>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> This creates a “Welcome” page at your workshop’s entrance (<code>http://localhost:3000</code>).  
            <span className="font-semibold">For Coders:</span> <code>index.js</code> maps to the root route in the Pages Router; <code>app/page.js</code> does the same in the App Router. Use <code>layout.js</code> for shared UI in App Router.
          </p>

          {/* Dynamic Routing */}
          <h3 className="text-xl font-semibold mb-4">Dynamic Routing</h3>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> Dynamic routing is like making a toy with a custom name tag, so each visitor gets a unique version.  
            <span className="font-semibold">For Coders:</span> Use square brackets for dynamic routes (e.g., <code>[id].js</code>) to handle variable URL segments.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/[id].js (Pages Router)
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return <h1>Page ID: {id}</h1>;
}

// app/[id]/page.js (App Router)
export default function Page({ params }) {
  return <h1>Page ID: {params.id}</h1>;
}`}</code>
          </pre>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> This lets you visit <code>/1</code> or <code>/2</code> to see different toy IDs.  
            <span className="font-semibold">For Coders:</span> In the Pages Router, <code>useRouter</code> accesses query params. In the App Router, <code>params</code> prop provides dynamic segments directly. Use <code>generateStaticParams</code> for SSG.
          </p>
        </section>

        {/* Interactive Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Interactive Exercises</h2>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> Try fun activities in your workshop to practice making toys, like creating a page that shows a special message.  
            <span className="font-semibold">For Coders:</span> Solve hands-on Next.js exercises to reinforce concepts like static generation and component rendering.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// app/exercise/page.js (App Router)
export async function getStaticProps() {
  return { props: { message: "Hello, Next.js!" } };
}

export default function Page({ message }) {
  return <div>{message}</div>;
}

// Alternative: App Router Server Component
export default async function Page() {
  const message = "Hello, Next.js!";
  return <div>{message}</div>;
}`}</code>
          </pre>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> This activity shows “Hello, Next.js!” on a page, like displaying a shiny new toy.  
            <span className="font-semibold">For Coders:</span> The first example uses <code>getStaticProps</code> (Pages Router style, still supported). The second uses an App Router server component for simpler static rendering. Test it at <code>/exercise</code>.
          </p>
        </section>

        {/* Final Thoughts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Keep Learning</h2>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> Your toy workshop is just getting started! Keep experimenting with new toys, designs, and tricks to make your websites awesome.  
            <span className="font-semibold">For Coders:</span> Next.js offers advanced features to explore:
            - API Routes or Route Handlers for backend logic.
            - Image optimization with <code>next/image</code>.
            - Custom error pages and middleware.
            - App Router’s server components and streaming for modern apps.
          </p>
        </section>

        <p className="italic text-blue-300">
          Happy coding! Build amazing websites with Next.js, whether you’re a beginner or a pro.
        </p>
      </div>
    </div>
  );
};

export default NextHomePage;