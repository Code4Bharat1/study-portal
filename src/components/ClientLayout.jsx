"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar";
import GeminiChat from "@/components/chatbot.jsx";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();


  const hiddenChatbotRoutes = [
     '/login', '/register', '/dashboard','activity','contact','/exercises','exercises/css','exercises/html','exercises/javascript'
      ,'/','/quizz','quizz/express','quizz/mongodb','quizz/nodejs','quizz/react','quizz/quizzes','quizz/results','exercisefirst','/video','/tutorial',
      '/questionmongodb','/questionexpress','/questionreact','/questionnodejs','/firstHtml','/Csscard','/react','/firstJava','/firstmongo','/CardNode',
      '/Card','/expresspage','/mysql','/sql','/phppage','/firstPython','/nextjs','/php','/express','','','', // <-- Add more if needed
  ];
  

  const showChatbot = !hiddenChatbotRoutes.includes(pathname);

  return (
    <>
      <Navbar />
      <div className="mt-25">
        <SessionProvider>{children}</SessionProvider>
      </div>
      {showChatbot && <GeminiChat />}
      <Footer />
    </>
  );
}
