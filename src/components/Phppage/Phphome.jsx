"use client";

import useReadingTracker from "@/components/useReadingTracker";

export default function PhpHome() {
  useReadingTracker("phphome");
  return (
    <div className="p-6 ml-80">
      <img
        src="/php.jpg"
        alt="MySQL"
        className="w-full max-w-8xl rounded-lg mb-6 mx-auto"
      />
    </div>
  );
}
