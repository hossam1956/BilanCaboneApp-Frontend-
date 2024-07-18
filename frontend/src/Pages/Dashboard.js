import keycloak from '../KeycloakConfig/keycloak'
import SideBar from '../Components/SideBar'
import DiagCirculaire from '../Components/DiagCirculaire'
import DiagBar from '../Components/DiagBar'
import DiagLigne from '../Components/DiagLigne'
import Footer from '../Components/Footer'
import DownloadChart from '../Components/DownloadChart'
const Dashboard=()=>{


    return(
     <div>
        <div className="md:overflow-x-hidden flex justify-normal overflow-y-hidden h-full">
          <SideBar/>
          <div className='flex flex-col mx-auto my-5'>
            <div className='flex justify-around mb-3 '> 
            <DiagCirculaire/>
            <DiagBar/>
            </div>
            <DiagLigne/>
          </div>
        </div>  
        <Footer/>
      </div>
    )
}
export default Dashboard
