// app/layout.jsx

import Navbar from '@/components/Navbar'; // adjust the path if needed
import './globals.css'; // or your global styles
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-white'>
        <Navbar />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
