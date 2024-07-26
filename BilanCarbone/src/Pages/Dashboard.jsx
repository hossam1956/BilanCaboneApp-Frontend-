import SideBar from '../Composant/SideBar'
import DiagCirculaire from '../Composant/DiagCirculaire'
import DiagBar from '../Composant/DiagBar'
import DiagLigne from '../Composant/DiagLigne'
import Footer from '../Composant/Footer'
import { SideBar2 } from '@/Composant/SideBar2'
const Dashboard=()=>{

    return(
     <div>
        <div className="md:overflow-x-hidden flex justify-normal overflow-y-hidden h-full">
          <SideBar2/>
          {/*<div className='flex flex-col mx-auto my-5'>
            <div className='flex justify-around mb-3 '> 
            <DiagCirculaire/>
            <DiagBar/>
            </div>
            <DiagLigne/>
          </div>*/}
        </div>  
      </div>
    )
}
export default Dashboard
