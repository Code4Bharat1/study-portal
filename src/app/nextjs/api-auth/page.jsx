
import ApiAuthrization from "@/components/Nextjs/api-auth";
import JSSidebar from "@/components/Nextjs/Sidebar";



export default function Page() {
  return (
    <div className="flex">
      <JSSidebar/>
      <main className="flex-1 ml-75  bg-white min-h-screen">
      <ApiAuthrization/>
      </main>
    </div>
  );
}
