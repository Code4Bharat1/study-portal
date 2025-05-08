import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  render() {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
          <h1 className="text-4xl font-bold mb-6">Customizing the Document in Next.js</h1>
          <p className="mb-4">
            <span className="font-semibold">For Beginners:</span> Think of your website as a building. The Document in Next.js is like the blueprint that sets up the basic structure—walls, roof, and foundation—before adding furniture (content). Customizing it lets you tweak the blueprint for special features.  
            <span className="font-semibold">For Coders:</span> The <code>_document.js</code> file in Next.js allows customization of the HTML document structure, enabling global modifications like custom fonts, meta tags, or third-party scripts, applicable in both Pages and App Router.
          </p>

          {/* What is the Document? */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. What is the Document in Next.js?</h2>
            <p className="mb-4">
              <span className="font-semibold">For Beginners:</span> The Document is like the main blueprint for your website’s building. It decides how the walls (HTML structure) look before you add rooms (pages).  
              <span className="font-semibold">For Coders:</span> The <code>_document.js</code> file extends the <code>Document</code> class from <code>next/document</code>, controlling the server-rendered HTML structure, including <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code>.
            </p>
            <p className="mb-4">
              <span className="font-semibold">For Beginners:</span> You can change this blueprint to add special decorations, like a unique roof color (font) or a sign (meta tag).  
              <span className="font-semibold">For Coders:</span> Use <code>_document.js</code> to add global elements like custom <code>&lt;meta&gt;</code> tags, external stylesheets, or scripts that need to load before the app renders.
            </p>
          </section>

          {/* Basic Custom Document Example */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Example: Basic Custom Document</h2>
            <p className="mb-4">
              <span className="font-semibold">For Beginners:</span> A custom blueprint sets up your building’s basic structure, like choosing a language for signs or adding a logo.  
              <span className="font-semibold">For Coders:</span> A custom <code>_document.js</code> overrides the default <code>Document</code> to include custom HTML attributes or global assets.
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
              <code>{`// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="My Next.js App" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;`}</code>
            </pre>
            <p className="mb-4">
              <span className="font-semibold">For Beginners:</span> This blueprint sets English as the language and adds a description for your building, making it ready for visitors.  
              <span className="font-semibold">For Coders:</span> This <code>_document.js</code> sets the <code>lang</code> attribute on <code>&lt;html&gt;</code> and adds a meta description for SEO. <code>Main</code> renders the app’s content, and <code>NextScript</code> injects Next.js scripts.
            </p>
          </section>

          {/* Advanced Custom Document */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Advanced Custom Document Features</h2>
            <p className="mb-4">
              <span className="font-semibold">For Beginners:</span> You can add fancy features to your blueprint, like a special font for signs or a security system (analytics).  
              <span className="font-semibold">For Coders:</span> Enhance <code>_document.js</code> with custom fonts, third-party scripts, or global attributes for accessibility and performance.
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
              <code>{`// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en" className="dark">
        <Head>
          <meta name="description" content="Custom Next.js App" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: \`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXX');
              \`,
            }}
          />
        </Head>
        <body className="font-inter text-gray-900 bg-white dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;`}</code>
            </pre>
            <p className="mb-4">
              <span className="font-semibold">For Beginners:</span> This blueprint adds a stylish font, a description, and a tracking system to know who visits your building.  
              <span className="font-semibold">For Coders:</span> This example includes a Google font, Google Analytics, dark mode support via <code>className</code>, and custom body classes. Use <code>dangerouslySetInnerHTML</code> cautiously for scripts, ensuring security with trusted sources.
            </p>
          </section>

          {/* Document in App Router */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Custom Document in App Router</h2>
            <p className="mb-4">
              <span className="font-semibold">For Beginners:</span> If you’re using a newer way to build your website, the blueprint works the same but lives in a different place.  
              <span className="font-semibold">For Coders:</span> In the App Router (Next.js 13+), <code>_document.js</code> is still used for document customization and resides at the root, not inside <code>app/</code>.
            </p>
            <p className="mb-4">
              <span className="font-semibold">For Beginners:</span> You still add fonts or signs, but it’s part of the main building plan, not the rooms (pages).  
              <span className="font-semibold">For Coders:</span> Place <code>_document.js</code> in the <code>pages/</code> directory or project root, as it’s not part of the <code>app/</code> folder. It works with server components but only runs server-side.
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
              <code>{`// _document.js (App Router compatible)
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#ffffff" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;`}</code>
            </pre>
            <p className="mb-4">
              <span className="font-semibold">For Beginners:</span> This blueprint adds a logo (favicon) and a color theme for your building, working with the new system.  
              <span className="font-semibold">For Coders:</span> This <code>_document.js</code> is App Router-compatible, adding a favicon and theme color for mobile browsers. Ensure assets like <code>/favicon.ico</code> are in <code>public/</code>.
            </p>
          </section>

          {/* When to Customize Document */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. When to Customize the Document?</h2>
            <p className="mb-4">
              <span className="font-semibold">For Beginners:</span> Change the blueprint when you need special features for the whole building, like a unique style or visitor tracking.  
              <span className="font-semibold">For Coders:</span> Customize <code>_document.js</code> for global HTML modifications that can’t be handled in <code>_app.js</code> or <code>layout.js</code>.
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>
                <span className="font-semibold">Beginners:</span> Adding a language or description for the building.  
                <span className="font-semibold">Coders:</span> Setting <code>lang</code> or SEO meta tags in <code>&lt;head&gt;</code>.
              </li>
              <li>
                <span className="font-semibold">Beginners:</span> Using a special font for all signs.  
                <span className="font-semibold">Coders:</span> Loading external fonts or stylesheets globally.
              </li>
              <li>
                <span className="font-semibold">Beginners:</span> Tracking who visits your building.  
                <span className="font-semibold">Coders:</span> Adding analytics or tracking scripts (e.g., Google Analytics, Hotjar).
              </li>
              <li>
                <span className="font-semibold">Beginners:</span> Making the building accessible to everyone.  
                <span className="font-semibold">Coders:</span> Enhancing accessibility with ARIA attributes or custom HTML attributes.
              </li>
            </ul>
          </section>

          {/* Final Thoughts */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Final Thoughts</h2>
            <p className="mb-4">
              <span className="font-semibold">For Beginners:</span> Customizing your website’s blueprint lets you make it special, like adding a unique style or sign to your building.  
              <span className="font-semibold">For Coders:</span> Use <code>_document.js</code> to fine-tune the HTML structure for SEO, accessibility, or global assets. Combine with <code>_app.js</code> or <code>layout.js</code> for app-level customization, and ensure compatibility with App Router for modern Next.js workflows.
            </p>
          </section>

          <p className="italic text-blue-300">
            Craft a perfect blueprint with Next.js’s custom Document, setting the stage for a stunning and functional website!
          </p>
        </div>
      </div>
    );
  }
}

export default CustomDocument;