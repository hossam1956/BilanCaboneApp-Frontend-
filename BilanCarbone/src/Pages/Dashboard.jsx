

import Dashboardadmin from './Dashboard/Dashboardadmin';
import {isAdmin} from "@/hooks/useUserRole";


const Dashboard=()=>{

    return(
      <div className="flex min-h-screen w-full flex-col">
      {isAdmin() ? <Dashboardadmin /> : null}
      </div>
    )

}
 export default Dashboard;