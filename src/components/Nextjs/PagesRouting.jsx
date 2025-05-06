"use client";

const PagesAndRoutingPage = () => {
  return (
    <div >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Pages & Routing in Next.js</h1>
        <p className="mb-4">
          In Next.js, creating pages and navigating between them is as simple as flipping through chapters in a book. Let’s learn how pages and routing work in Next.js!
        </p>

        {/* What are Pages in Next.js? */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. What are Pages in Next.js?</h2>
          <p className="mb-4">
            In Next.js, pages are the different sections or "chapters" of your website. When you create a file in the `pages/` folder, Next.js automatically turns that file into a page with its own URL.
          </p>
          <p className="mb-4">
            For example, if you have a file named `about.js` inside the `pages/` folder, Next.js will create a page at <code>http://localhost:3000/about</code>. It’s like writing a chapter in a book – you give it a name, and it becomes its own section that people can visit.
          </p>
        </section>

        {/* Dynamic Routing */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Dynamic Routing</h2>
          <p className="mb-4">
            Sometimes, you want pages that change based on certain things. For example, a blog might have different posts, and each post would have its own unique page. This is where dynamic routing comes in.
          </p>
          <p className="mb-4">
            In Next.js, you can create dynamic pages by using square brackets in the file name. Let’s say you want to show a blog post based on its ID. You can create a file called `[id].js`, and it will automatically accept different post IDs in the URL.
          </p>
          
          {/* Example: Dynamic Routing */}
          <h3 className="text-xl font-semibold mb-4">Example: Dynamic Blog Post</h3>
          <p className="mb-4">
            Here’s how you can create a dynamic page for blog posts:
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/posts/[id].js
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Blog Post {id}</h1>;
}`}</code>
          </pre>
          <p className="mb-4">
            In the above code, the file name is `[id].js`, so Next.js will create a page for any URL like <code>http://localhost:3000/posts/1</code>, <code>http://localhost:3000/posts/2</code>, and so on, and show the content for the corresponding post ID.
          </p>
        </section>

        {/* Nested Routing */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Nested Routing</h2>
          <p className="mb-4">
            Just like a book might have chapters and sub-chapters, your website can have nested pages. In Next.js, you can create nested routes by simply adding folders inside the `pages/` directory.
          </p>
          <p className="mb-4">
            For example, if you want to create a "Contact" page with sub-pages for "Email" and "Phone", you can create a folder called `contact/` and put the sub-pages inside it.
          </p>

          {/* Example: Nested Routing */}
          <h3 className="text-xl font-semibold mb-4">Example: Nested Contact Page</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/contact/email.js
export default function Email() {
  return <h1>Contact via Email</h1>;
}

// pages/contact/phone.js
export default function Phone() {
  return <h1>Contact via Phone</h1>;
}`}</code>
          </pre>
          <p className="mb-4">
            Now, if you visit <code>http://localhost:3000/contact/email</code>, you’ll see the "Contact via Email" page, and if you visit <code>http://localhost:3000/contact/phone</code>, you’ll see the "Contact via Phone" page. This is how nested routing works in Next.js!
          </p>
        </section>

        {/* Catch-all Routes */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Catch-all Routes</h2>
          <p className="mb-4">
            Sometimes you want to capture any URL in a certain folder or section. For example, you might want to show a page for any product in a store without creating a separate page for each product. This is where catch-all routes come in.
          </p>
          <p className="mb-4">
            In Next.js, you can use the `<code>[...]</code>` syntax to create a catch-all route. This allows you to match any URL path under that folder.
          </p>
          
          {/* Example: Catch-all Route */}
          <h3 className="text-xl font-semibold mb-4">Example: Product Pages</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/products/[...slug].js
import { useRouter } from 'next/router';

export default function Product() {
  const router = useRouter();
  const { slug } = router.query;

  return <h1>Product: {slug.join(" / ")}</h1>;
}`}</code>
          </pre>
          <p className="mb-4">
            In this example, the file name is `[...slug].js`, and it captures all the paths under `/products/`. So if you visit <code>http://localhost:3000/products/smartphone/iphone-12</code>, it will show "Product: smartphone / iphone-12".
          </p>
        </section>

        {/* Final Thoughts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Keep Exploring</h2>
          <p className="mb-4">
            Now that you know how to create pages and handle routing in Next.js, you can start building more complex websites with dynamic, nested, and catch-all routes. The possibilities are endless!
          </p>
        </section>

        <p className="italic text-blue-300">
          Keep building and exploring the world of Next.js!
        </p>
      </div>
    </div>
  );
};

export default PagesAndRoutingPage;
