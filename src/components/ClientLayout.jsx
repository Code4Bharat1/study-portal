"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar";
import GeminiChat from "@/components/chatbot.jsx";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const hiddenChatbotRoutes = [
    // your paths here
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
