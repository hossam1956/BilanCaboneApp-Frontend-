
import { useEffect } from 'react';
import keycloak from '../KeycloakConfig/keycloak';
import { apiClient } from '@/KeycloakConfig/KeycloakConn';
const Dashboard=()=>{
console.log(keycloak.tokenParsed) 
/*useEffect(()=>{
  apiClient.get("http://localhost:8081/api/compte/my")
  .then((e)=>console.log(e))
},[])*/
    return(
      
     <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr]">
      
      <h1>Dashboard</h1>
      </div>
    )

}
 export default Dashboard;