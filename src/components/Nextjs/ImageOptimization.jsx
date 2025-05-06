"use client";

const ImageOptimizationPage = () => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6">Image Optimization in Next.js</h1>
        <p className="mb-4">
          Optimizing images is important because large images can slow down your website, especially on mobile devices. Next.js has built-in features to make your images load faster and look great. Let’s explore how you can optimize images in Next.js.
        </p>

        {/* Image Optimization */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Why Image Optimization Matters</h2>
          <p className="mb-4">
            Images are a big part of any website, but if they’re too large or not optimized, they can slow down the page load time. Faster websites give a better experience for users and help with SEO (Search Engine Optimization).
          </p>
          <p className="mb-4">
            Optimizing images means making sure they are small in file size without losing too much quality. This can be done by resizing, compressing, or choosing the right image format.
          </p>
        </section>

        {/* Using Next.js Image Component */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. The Next.js Image Component</h2>
          <p className="mb-4">
            Next.js provides an <code>Image</code> component that helps optimize images automatically. It ensures that images are loaded in the right size and format for different devices and screen sizes.
          </p>
          <p className="mb-4">
            You can use the <code>Image</code> component from the <code>next/image</code> package to optimize images in your Next.js app.
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`import Image from 'next/image';

export default function MyComponent() {
  return (
    <div>
      <h1>Optimized Image</h1>
      <Image 
        src="/path-to-your-image.jpg" 
        alt="A beautiful scenery" 
        width={500} 
        height={300} 
      />
    </div>
  );
}`}</code>
          </pre>

          <p className="mb-4">
            In this example, the image will be optimized based on the size of the container and the device being used. You specify the image dimensions (width and height), and Next.js will automatically serve the correct version of the image for the user’s device.
          </p>
        </section>

        {/* Automatic Image Optimization */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How Next.js Optimizes Images</h2>
          <p className="mb-4">
            When you use the <code>Image</code> component, Next.js does several things to optimize the image:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Resizing:</strong> It automatically adjusts the image size based on the user's device screen size (e.g., smaller images for mobile users).</li>
            <li><strong>Lazy Loading:</strong> Next.js automatically lazy-loads images, which means it only loads images when they are about to be viewed by the user, improving performance.</li>
            <li><strong>Optimized Formats:</strong> It serves images in the best possible format (e.g., WebP for supported browsers) to reduce the file size without sacrificing quality.</li>
          </ul>
          <p className="mb-4">
            This makes your images load faster without you having to manually adjust them.
          </p>
        </section>

        {/* Image Formats */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Supported Image Formats</h2>
          <p className="mb-4">
            Next.js supports a variety of image formats, including:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>JPG/PNG:</strong> These are the most common image formats for photos and graphics.</li>
            <li><strong>WebP:</strong> A modern image format that provides better compression than JPG and PNG, without compromising quality. Next.js automatically serves WebP images when possible.</li>
            <li><strong>AVIF:</strong> A newer format with even better compression than WebP (supported in modern browsers).</li>
          </ul>
          <p className="mb-4">
            The best part? You don’t have to worry about manually converting your images to WebP or AVIF—Next.js handles that for you automatically.
          </p>
        </section>

        {/* Customizing Image Optimization */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Customizing Image Optimization</h2>
          <p className="mb-4">
            Sometimes you might need to customize how images are optimized. You can do this by configuring your <code>next.config.js</code> file.
          </p>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4">
            <code>{`// next.config.js
module.exports = {
  images: {
    domains: ['example.com'],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 128],
  },
};`}</code>
          </pre>

          <p className="mb-4">
            This configuration allows you to specify which external domains your images can come from and what sizes you want to support.
          </p>
        </section>

        {/* Final Thoughts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Final Thoughts</h2>
          <p className="mb-4">
            Image optimization in Next.js is incredibly simple to use, and it improves your app’s performance significantly. By using the <code>Image</code> component, Next.js takes care of most of the hard work for you, serving images in the best possible format and size for each user.
          </p>
        </section>

        <p className="italic text-blue-300">
          Now, you can use Next.js to load optimized images quickly and efficiently, making your website faster and more user-friendly!
        </p>
      </div>
    </div>
  );
};

export default ImageOptimizationPage;
