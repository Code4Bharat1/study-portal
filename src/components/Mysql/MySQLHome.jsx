'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function MySQLHome() { 
  useReadingTracker('mysqlhome');
  return (
    <div className="p-6 ml-80">
    <img src="/mysql.jpg" alt="MySQL" className="w-full max-w-8xl rounded-lg mb-6 mx-auto" />
    </div>
  );
}
