"use client";

const StaticFilesAndAssetsPage = () => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Static Files and Assets in Next.js</h1>
        <p className="mb-4">
          Think of static files as the decorations, menus, and images in a restaurant. They're not cooked or changed — they’re just there, ready to be served exactly as they are.
        </p>

        {/* What Are Static Files? */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. What Are Static Files?</h2>
          <p className="mb-4">
            Static files are files that don't need any processing. These include images, fonts, and other assets. In Next.js, you store them in the <code>/public</code> folder.
          </p>
          <p className="mb-4">
            Any file in <code>/public</code> can be accessed directly using a URL path. For example, a file at <code>/public/logo.png</code> can be viewed at <code>http://localhost:3000/logo.png</code>.
          </p>
        </section>

        {/* Example: Using an Image */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Example: Using an Image</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`<img src="/logo.png" alt="Site Logo" width="200" />`}</code>
          </pre>
          <p className="mb-4">
            This will display the image stored at <code>/public/logo.png</code>. It's simple and doesn't require any import or dynamic loading.
          </p>
        </section>

        {/* Folder Structure */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Organizing Your Static Files</h2>
          <p className="mb-4">
            You can create subfolders inside the <code>/public</code> folder to keep things tidy. For example:
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`/public
  /images
    hero.jpg
  /docs
    guide.pdf`}</code>
          </pre>
          <p className="mb-4">
            You’d access these like: <code>/images/hero.jpg</code> or <code>/docs/guide.pdf</code>.
          </p>
        </section>

        {/* Static vs Dynamic Assets */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Static vs Dynamic Assets</h2>
          <p className="mb-4">
            Static assets are ideal for things that don’t change. But for images that depend on user content or backend data, you might want to use Next.js’s <code>Image</code> component or dynamic routes instead.
          </p>
        </section>

        {/* Final Tips */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Final Tips</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Put images, PDFs, and icons in the <code>/public</code> folder</li>
            <li>Reference them using <code>src="/filename"</code></li>
            <li>Use the <code>Image</code> component from Next.js for optimization when needed</li>
          </ul>
        </section>

        <p className="italic text-blue-300">
          Keep your assets neat and accessible — that’s how a good frontend stays efficient!
        </p>
      </div>
    </div>
  );
};

export default StaticFilesAndAssetsPage;
