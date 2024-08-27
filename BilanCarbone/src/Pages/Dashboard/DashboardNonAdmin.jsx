import {isAdmin} from "@/hooks/useUserRole";
import DashboardMANAGER from './DashboardMANAGER';
import DashboardEMPLOYE from "./DashboardEMPLOYE";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const DashboardNonAdmin=()=>{
  const decodedToken=jwtDecode(sessionStorage.getItem("token"))
 
 
    return(
      <div className="flex min-h-screen w-full flex-col">
      { (sessionStorage.getItem("roleUser")=="MANAGER")? <DashboardMANAGER /> : <DashboardEMPLOYE idUtilisateur={decodedToken.sub} nomUtilisateur={decodedToken.name}/>}
      </div>
    )


}
 export default DashboardNonAdmin;