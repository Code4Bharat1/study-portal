'use client';
import 'font-awesome/css/font-awesome.min.css';
import {
  FaStar,
  FaUser,
  FaBook,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';
import { useRef } from 'react';

export default function CourseCards() {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  const courseData = [
    {
      title: 'Python with Beginner DSA',
      subtitle: 'PYTHON FOR BEGINNERS',
      description:
        'Learn the basics of Python and data structures. Use practice modules to boost your coding and...',
      rating: '4.6 (103.4k+)',
      courses: 6,
      learners: '451k+ learners',
      image: '/py.png',
      youtubeLink: 'https://www.youtube.com/watch?v=eWRfhZUzrAc',
    },
    {
      title: 'Learn Data Structures and Algorithms',
      subtitle: 'DATA STRUCTURE & ALGO MASTERY',
      description:
        'Learn and practice problems on Linked Lists, Stacks, Queues, and more...',
      rating: '4.6 (72.9k+)',
      courses: 23,
      learners: '125k+ learners',
      image: '/dsa.png',
      youtubeLink: 'https://www.youtube.com/watch?v=8hly31xKli0',
    },
    {
      title: 'React JS for Front-end Development',
      subtitle: 'REACT FOR WEB DEVELOPMENT',
      description:
        'Start with the fundamentals—learn to build dynamic interfaces using JSX, components, and hooks...',
      rating: '4.7 (94k+)',
      courses: 4,
      learners: '178k+ learners',
      image: '/reactjs.png',
      youtubeLink: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
    },
    {
      title: 'MongoDB for Beginners',
      subtitle: 'BACKEND DATABASE',
      description:
        'Learn how to model data, create documents, and build robust NoSQL backends using MongoDB...',
      rating: '4.5 (40k+)',
      courses: 5,
      learners: '85k+ learners',
      image: '/mongo.png',
      youtubeLink: 'https://www.youtube.com/watch?v=ExcRbA7fy_A',
    },
    {
      title: 'Express.js Crash Course',
      subtitle: 'WEB FRAMEWORK',
      description:
        'Build RESTful APIs and backend apps using Express.js, a minimal and flexible Node.js framework...',
      rating: '4.4 (32k+)',
      courses: 3,
      learners: '68k+ learners',
      image: '/expres.png',
      youtubeLink: 'https://www.youtube.com/watch?v=SccSCuHhOw0',
    },
    {
      title: 'Node.js Fundamentals',
      subtitle: 'JAVASCRIPT RUNTIME',
      description:
        'Understand the core of Node.js, event-driven architecture, modules, and backend development...',
      rating: '4.6 (52k+)',
      courses: 6,
      learners: '105k+ learners',
      image: '/node.png',
      youtubeLink: 'https://www.youtube.com/watch?v=f2EqECiTBL8',
    },
  ];

  return (
    <div className="w-full">
      {/* Title Row */}
      <div className="flex items-center justify-center gap-3 py-6">
        <i className="fas fa-arrow-left text-blue-400 w-6 h-6"></i>
        <h2 className="text-xl font-semibold text-gray-800">Featured Courses</h2>
        <i className="fas fa-arrow-left text-blue-400 w-6 h-6 transform scale-x-[-1]"></i>
      </div>

      {/* Scrollable Cards Section */}
      <div className="relative py-10 px-4">
        {/* Left Scroll Button */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-2 shadow-md rounded-full z-10 hover:bg-gray-100"
          onClick={() => scroll('left')}
        >
          <FaArrowLeft size={18} />
        </button>

        {/* Cards Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-6 hide-scrollbar"
        >
          {courseData.map((course, index) => (
            <div
              key={index}
              className="min-w-[200px] max-w-xs bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform hover:bg-gray-50 transition-all duration-300 overflow-hidden border border-gray-100 flex-shrink-0"
            >
              {/* Image Section */}
              <div className="h-36 w-full relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.subtitle}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Subtitle */}
              <h3 className="text-xs font-semibold mt-2 px-3 text-gray-700">
                {course.subtitle}
              </h3>

              {/* Card Body */}
              <div className="p-3">
                <div className="flex items-center gap-1 text-xs text-gray-700">
                  <FaStar className="text-yellow-400" /> {course.rating}
                </div>
                <h4 className="text-sm font-semibold mt-1">{course.title}</h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <FaBook /> {course.courses}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUser /> {course.learners}
                  </span>
                </div>
                <a
                  href={course.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block w-full bg-red-600 text-white text-sm py-1.5 text-center rounded hover:bg-red-700"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-2 shadow-md rounded-full z-10 hover:bg-gray-100"
          onClick={() => scroll('right')}
        >
          <FaArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
