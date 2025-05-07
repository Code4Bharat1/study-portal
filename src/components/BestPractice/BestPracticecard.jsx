"use client";

import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";

const topicRoutes = {
  Html: "/bestpracticeHtml",
  Css: "/css-practices",
  Javascript: "/javascript-practices",
  React: "/bestpracticeReact",
  Nodejs: "/bestpracticeNodejs",
  PHP: "/bestpracticePhp",
  Python: "/bestpracticePython",
  Express: "/express-practices",
  MongoDB: "/mongodb-practices",
  Java: "/bestpracticeJava",
  Sql: "/sql-practices",
  MySql: "/mysql-practices",
  Nextjs: "/nextjs-practices",
};

export default function BestPractices() {
  const router = useRouter();

  const handleClick = (topic) => {
    const route = topicRoutes[topic];
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col items-center py-10 px-4">
      <div className="relative mb-12 w-full max-w-4xl">
        <div className="border-t border-gray-300 w-full absolute top-1/2 transform -translate-y-1/2"></div>
        <div className="relative z-10 bg-white px-6 py-1 rounded-full border border-gray-400 text-blue-600 font-semibold text-center w-fit mx-auto shadow">
          Best Practices
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-7xl px-4 ">
        {Object.keys(topicRoutes).map((topic, index) => (
          <div
            key={index}
            onClick={() => handleClick(topic)}
            className="relative p-6 group bg-gradient-to-br from-white to-gray-100 border border-gray-300 rounded-xl transition transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg duration-300 cursor-pointer shadow-sm"
          >
            <div className="absolute top-7 right-3">
              <Bookmark className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition" />
            </div>
            <div className="text-lg font-semibold text-gray-800">{topic}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
