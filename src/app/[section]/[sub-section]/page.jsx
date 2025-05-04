'use client'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import useReadingTracker from '@/components/useReadingTracker';

const Page = () => {
  const params = useParams();
  const section = params?.section;
  const subSection = params?.['sub-section'];

  
  // Handle case where params might be undefined
  if (!section || !subSection) {
    return <div>Invalid URL parameters</div>;
  }
  
  // Capitalize first letters
  const newSection = section[0].toUpperCase() + section.slice(1);
  const newSubSection = subSection[0].toUpperCase() + subSection.slice(1);
  
  console.log("Matched params:", newSection, newSubSection);

  // Dynamic import with proper error handling
  const DynamicComponent = dynamic(
    () => import(`@/components/${newSection}/${newSubSection}`)
      .catch(() => {
        console.error("Failed to load component");
        return { default: () => <div>Component not found</div> };
      }),
    { 
      ssr: false,
      loading: () => <div>Loading...</div> 
    }
  );

  // Dynamic sidebar import
  const DynamicSidebar = dynamic(
    () => import(`@/components/${newSection}/Sidebar`)
      .catch(() => {
        console.error("Failed to load sidebar");
        return { default: () => null }; // Return null if sidebar doesn't exist
      }),
    { ssr: false }
  );

  var sidebar = null;
  if (newSection != "Cards"){
    sidebar = <DynamicSidebar/>
    useReadingTracker(`${newSection} ${newSubSection}`)
  }
   
  return (
    <div className="flex">
      <Suspense fallback={<div>Loading sidebar...</div>}>{sidebar}</Suspense>
      
      <main className="flex-1 p-4">
        <Suspense fallback={<div>Loading content...</div>}>
          <DynamicComponent />
        </Suspense>
      </main>
    </div>
  );
}

export default Page;