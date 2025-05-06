"use client";

const StaticGenerationPage = () => {
  return (
    <div >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Understanding Static Generation in Next.js</h1>
        <p className="mb-4">
          Imagine writing a book and printing out a copy for each reader. Once it's printed, anyone can read it instantly without waiting for you to write it every time. That’s exactly what static generation is! Let’s explore how this works in Next.js.
        </p>

        {/* What is Static Generation? */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. What is Static Generation?</h2>
          <p className="mb-4">
            Static Generation means your web pages are prepared ahead of time — like pre-baking cookies before the guests arrive. This way, when someone visits your site, they get the page immediately, with no wait.
          </p>
          <p className="mb-4">
            In Next.js, this happens at build time. It creates HTML files for each page so they can be delivered super fast to visitors. This is perfect for pages that don’t change often, like blog posts, product descriptions, or documentation.
          </p>
        </section>

        {/* Basic Static Page Example */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Example: A Simple Static Page</h2>
          <p className="mb-4">
            Let’s say you want to show a welcome message to your visitors. You can create a static page that gets built once and is reused every time someone visits.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/welcome.js
export default function Welcome() {
  return <h1>Welcome to My Site!</h1>;
}`}</code>
          </pre>
          <p className="mb-4">
            This page is generated once when you build the app and loads instantly for everyone.
          </p>
        </section>

        {/* Static Generation with Data */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Static Generation with Data (getStaticProps)</h2>
          <p className="mb-4">
            What if you want to fetch data from a database or API before the page is built? You can use a special function called <code>getStaticProps</code>. It’s like checking your fridge and writing down all the ingredients before you start cooking.
          </p>

          {/* Example: Fetching Data */}
          <h3 className="text-xl font-semibold mb-4">Example: Showing a List of Fruits</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/fruits.js
export async function getStaticProps() {
  const fruits = ['Apple', 'Banana', 'Orange'];
  return {
    props: {
      fruits,
    },
  };
}

export default function FruitsPage({ fruits }) {
  return (
    <div>
      <h1>Fruit List</h1>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}`}</code>
          </pre>
          <p className="mb-4">
            This page is built with the list of fruits and shows it instantly to every visitor. The data is fetched once during the build, not every time someone visits.
          </p>
        </section>

        {/* Static Generation with Dynamic Routes */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Static Generation with Dynamic Routes</h2>
          <p className="mb-4">
            Imagine you’re writing pages for every blog post. You don’t want to write one giant page — you want to create one page per post. You can do that with <code>getStaticPaths</code> and <code>getStaticProps</code>.
          </p>

          {/* Example: Static Blog Posts */}
          <h3 className="text-xl font-semibold mb-4">Example: Blog Posts</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/posts/[id].js
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = {
    1: 'First Blog Post',
    2: 'Second Blog Post',
  };

  return {
    props: {
      title: posts[params.id],
    },
  };
}

export default function Post({ title }) {
  return <h1>{title}</h1>;
}`}</code>
          </pre>
          <p className="mb-4">
            This setup creates two static pages: one for <code>/posts/1</code> and another for <code>/posts/2</code>, each with its own title. They’re built once and load super fast.
          </p>
        </section>

        {/* When to Use Static Generation */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. When Should You Use Static Generation?</h2>
          <p className="mb-4">
            Use Static Generation when your content doesn’t change often, like:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Homepages</li>
            <li>Blog posts</li>
            <li>Product descriptions</li>
            <li>Documentation</li>
          </ul>
          <p className="mb-4">
            It makes your website super fast and good for SEO (search engines love it).
          </p>
        </section>

        {/* Final Thoughts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Final Thoughts</h2>
          <p className="mb-4">
            Static Generation is like cooking a delicious meal ahead of time so your guests can eat right away. It’s fast, efficient, and perfect for websites that don’t need to change all the time.
          </p>
        </section>

        <p className="italic text-blue-300">
          Keep experimenting — you're one step closer to mastering Next.js!
        </p>
      </div>
    </div>
  );
};

export default StaticGenerationPage;
