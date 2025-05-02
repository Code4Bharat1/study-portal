'use client';

import { useEffect, useState } from 'react';
import {
  SiCss3,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiReact,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

export default function VideoPage() {
  const videos = [
    {
      name: 'MongoDB',
      icon: <SiMongodb className="text-green-600 w-12 h-12" />,
      link: 'https://www.youtube.com/watch?v=ofme2o29ngU',
    },
    {
      name: 'Express',
      icon: <SiExpress className="text-black w-12 h-12" />,
      link: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
    },
    {
      name: 'React',
      icon: <SiReact className="text-blue-500 w-12 h-12 animate-spin" />,
      link: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    },
    {
      name: 'Node.js',
      icon: <SiNodedotjs className="text-green-700 w-12 h-12" />,
      link: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4',
    },
    {
      name: 'JavaScript',
      icon: <SiJavascript className="text-yellow-400 w-12 h-12" />,
      link: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
    },
    {
      name: 'Python',
      icon: <SiPython className="text-blue-700 w-12 h-12" />,
      link: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
    },
    {
      name: 'Java',
      icon: <FaJava className="text-red-600 w-12 h-12" />,
      link: 'https://www.youtube.com/watch?v=eIrMbAQSU34',
    },
    {
      name: 'PHP',
      icon: <SiPhp className="text-indigo-600 w-12 h-12" />,
      link: 'https://www.youtube.com/watch?v=OK_JCtrrv-c',
    },
    {
      name: 'HTML',
      icon: <SiHtml5 className="text-orange-500 w-12 h-12" />,
      link: 'https://www.youtube.com/watch?v=pQN-pnXPaVg',
    },
    {
      name: 'CSS',
      icon: <SiCss3 className="text-blue-600 w-12 h-12" />,
      link: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
    },
  ];

  const iconList = [
    SiMongodb,
    SiExpress,
    SiReact,
    SiNodedotjs,
    SiJavascript,
    SiPython,
    FaJava,
    SiPhp,
    SiHtml5,
    SiCss3,
  ];

  const [bgIcons, setBgIcons] = useState([]);

  useEffect(() => {
    const generateRandomIcons = () => {
      const generated = Array.from({ length: 30 }, (_, i) => {
        const Icon = iconList[Math.floor(Math.random() * iconList.length)];
        return {
          id: i,
          Icon,
          style: {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 40 + 20}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
            position: 'absolute',
            opacity: 0.06,
          },
        };
      });
      setBgIcons(generated);
    };
    generateRandomIcons();
  }, []);

  return (
    <div className="relative min-h-screen pt-28 pb-10 bg-white flex flex-col items-center overflow-hidden">
      {/* Random background icons */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {bgIcons.map(({ id, Icon, style }) => (
          <Icon key={id} className="text-gray-500" style={style} />
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-8 text-blue-700 z-10">Tutorial Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl w-full px-4 z-10">
        {videos.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-6 border rounded-xl shadow-lg hover:shadow-blue-400 transition-all text-center hover:scale-105 bg-white bg-opacity-90"
          >
            {item.icon}
            <p className="mt-3 text-lg font-semibold text-gray-700">{item.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
