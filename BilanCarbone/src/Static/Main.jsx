import Navbar from "@/Static/Navbar";
import Navheader  from "@/Static/Navheader";
import { Outlet } from "react-router-dom";
import { Toaster } from 'sonner'
import SearchProvider from "./SearchProvider";
import NavbarEmployeResponsable from "./NavbarEmployeResponsable";
import Navheaderempl from "./Navheaderempl";
import { isAdmin, isMANAGER } from "@/hooks/useUserRole";

const Main = () => {
  const isAdminUser = isAdmin();
  const isManagerUser = isMANAGER();

  return (
    <SearchProvider>
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {(isAdminUser || isManagerUser)?
      <Navbar />
      :
      <NavbarEmployeResponsable/>
      }
      
      <div className="flex flex-col">
      {(isAdminUser || isManagerUser)?
      <Navheader />
      :
      <Navheaderempl/>
      }
      
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
      <Toaster richColors closeButton  />
      </div>
    </SearchProvider>
  );
};

export default Main;