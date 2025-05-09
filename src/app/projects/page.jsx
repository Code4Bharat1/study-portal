// app/projects/page.js
import { Suspense } from 'react';
import Projects from '@/components/Projects';

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] via-[#e0e9ff] to-[#d0deff] text-gray-600">Loading projects...</div>}>
      <Projects />
    </Suspense>
  );
}