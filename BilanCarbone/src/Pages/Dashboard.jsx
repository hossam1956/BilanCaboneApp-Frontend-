import Dashboardadmin from './Dashboard/Dashboardadmin';
import {isAdmin} from "@/hooks/useUserRole";
import DashboardNonAdmin from './Dashboard/DashboardNonAdmin';

const Dashboard=()=>{

    return(
      <div className="flex min-h-screen w-full flex-col">
      {isAdmin() ? <Dashboardadmin /> : <DashboardNonAdmin/>}
      </div>
    )

}
 export default Dashboard;