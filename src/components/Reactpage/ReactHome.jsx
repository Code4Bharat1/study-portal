"use client";
import useReadingTracker from "@/app/hook/useReadingTracker";

export default function ReactHome() { 
  useReadingTracker('reacthome')
    return (
<>  <div className="p-6 ml-80">
    <img src="/react2.jpg" alt="MySQL" className="w-full max-w-8xl rounded-lg mb-6 mx-auto" />
    </div>
</>
    );
  }
  