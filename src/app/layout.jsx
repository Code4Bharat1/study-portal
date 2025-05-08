"use client";
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer/Footer';
import Chatbot from '@/components/Chatbot';
import './globals.css';
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // List of routes where Chatbot should NOT appear
  const hiddenChatbotRoutes = [
    "/", 
    "/quizz/express",
    "/quizz/mongodb",
    "/quizz/nodejs",
    "/quizz/react",
    "/quizz/quizzes",
    "/firstmongo",
    "/firstpython",
    "/firstjava",
    "/firsthtml",
    "/sql",
    "/mysql",
    "/reactpage",
    "/expresspage",
    "/phppage",
    "/CardNode",
    "/nextjs",
    "/Csscard",
    "/quizz",
    "/contact",
    "/activity",
    "/tutorial",
    "/exercises",
    "/questionmongodb",
    "/questionexpress",
    "/questionreact",
    "/questionnodejs" ,// fixed typo from 'excerercises'
    "/testimonials"
  ];

  const showChatbot = !hiddenChatbotRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="bg-white">
        <Navbar />
        <div className="mt-25">
          <SessionProvider>
            {children}
          </SessionProvider>
        </div>

        {showChatbot && <Chatbot />}

        <Footer />
      </body>
    </html>
  );
}
