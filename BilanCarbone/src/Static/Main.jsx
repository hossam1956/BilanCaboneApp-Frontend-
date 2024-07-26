import Navbar from "@/Static/Navbar";
import Navheader from "@/Static/Navheader";
import { Outlet } from "react-router-dom";
import { Toaster } from 'sonner'

const Main = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Navbar />
      <div className="flex flex-col">
        <Navheader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
      <Toaster richColors closeButton  />
      </div>
  );
};

export default Main;
