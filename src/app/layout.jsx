"use client";
// app/layout.jsx
import Navbar from '@/components/Navbar'; // adjust the path if needed
import './globals.css'; // or your global styles
import Footer from '@/components/Footer/Footer';
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-white'>
        <Navbar />
        <div className='mt-25'>
    <SessionProvider>
      {children}
    </SessionProvider>
        </div>
        <Footer/>
      </body>
    </html>
  );
}
