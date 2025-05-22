import "./globals.css";
import ClientLayout from "@/components/ClientLayout"; // this is fine if ClientLayout.jsx is in same folder

export const metadata = {
  title: "Skill-Bridge",
  description: "hi",
  icons: [
     { url: '/icon.ico', sizes: '128x128', type: 'image/x-icon' }
  ]
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
