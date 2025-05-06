"use client";

const ServerSideRenderingPage = () => {
  return (
    <div className="p-6s">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Understanding Server-Side Rendering (SSR) in Next.js</h1>
        <p className="mb-4">
          Imagine walking into a restaurant and ordering a meal. The chef prepares it fresh just for you — hot and made to order. That’s what Server-Side Rendering (SSR) is like! Let’s dive in and understand how it works in Next.js.
        </p>

        {/* What is SSR? */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. What is Server-Side Rendering?</h2>
          <p className="mb-4">
            Server-Side Rendering means the HTML for a page is generated fresh on the server every time someone requests it — like a custom meal cooked at the moment.
          </p>
          <p className="mb-4">
            This is great when your data changes frequently or needs to be updated for every user — like dashboards, profiles, or real-time feeds.
          </p>
        </section>

        {/* Basic SSR Example */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Example: A Page with SSR</h2>
          <p className="mb-4">
            Let’s say you want to show the current time to each user when they load the page. That data needs to be fresh, so static generation wouldn’t work — instead, you’d use SSR.
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// pages/time.js
export async function getServerSideProps() {
  return {
    props: {
      time: new Date().toLocaleTimeString(),
    },
  };
}

export default function TimePage({ time }) {
  return <h1>Current Time: {time}</h1>;
}`}</code>
          </pre>

          <p className="mb-4">
            Every time you refresh the page, it fetches the current time on the server and sends it to your browser — just like getting a fresh cup of coffee!
          </p>
        </section>

        {/* When to Use SSR */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. When Should You Use Server-Side Rendering?</h2>
          <p className="mb-4">
            Use SSR when your content changes frequently or is different for each user. Examples include:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>User dashboards with live data</li>
            <li>Personalized content (like "Hello, John!")</li>
            <li>Stock prices, weather updates, or news</li>
          </ul>
        </section>

        {/* getServerSideProps Explanation */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Understanding <code>getServerSideProps</code></h2>
          <p className="mb-4">
            <code>getServerSideProps</code> is a special function in Next.js that runs on the server before rendering the page. It can fetch data from databases, APIs, or other services — kind of like the chef checking the pantry before cooking.
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`export async function getServerSideProps(context) {
  // You can access request parameters here using context
  return {
    props: {
      data: 'fresh from the server',
    },
  };
}`}</code>
          </pre>
        </section>

        {/* SSR vs Static */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. SSR vs Static Generation</h2>
          <p className="mb-4">
            Think of it like this:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Static Generation</strong>: Like baking cookies and handing them out. Fast and ready to go.</li>
            <li><strong>Server-Side Rendering</strong>: Like cooking a meal after someone orders it. Fresh, but takes a moment.</li>
          </ul>
        </section>

        {/* Final Thoughts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Final Thoughts</h2>
          <p className="mb-4">
            Server-Side Rendering is perfect when your page needs to be fresh every time someone visits. It’s a powerful way to deliver personalized or constantly changing content.
          </p>
        </section>

        <p className="italic text-blue-300">
          You're doing great — one concept at a time. Keep it up!
        </p>
      </div>
    </div>
  );
};

export default ServerSideRenderingPage;
