'use client'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Page = () => {
  const params = useParams();
  const section = params?.section;  
  // Handle case where params might be undefined
  if (!section) {
    return <div>Invalid URL parameters</div>;
  }

  // Capitalize first letters
  const newSection = section[0].toUpperCase() + section.slice(1);
  
  console.log("Matched params:", newSection);

  // Dynamic sidebar import
  const DynamicComponent = dynamic(
    () => import(`@/components/${newSection}`)
      .catch(() => {
        console.error("Failed to load Component");
        return { default: () => null }; // Return null if sidebar doesn't exist
      }),
    { ssr: false }
  );

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <Suspense fallback={<div>Loading content...</div>}>
          <DynamicComponent />
        </Suspense>
      </main>
    </div>
  );
}

export default Page;