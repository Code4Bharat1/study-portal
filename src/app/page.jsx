import Image from "next/image";
import Hero from "@/components/hero";
import Navbar from "@/components/Navbar";
import Service from "@/components/Servics/Service";
import Contact from "@/components/Contact/Contact";
export default function Home() {
  return (
  <>
  <Navbar/>
  <div className="mt-20"><Hero/></div>
  <Service/>
  <Contact/>
  
  </>
  );
}
