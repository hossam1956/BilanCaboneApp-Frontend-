import {
    ArrowUpRight,
    ListChecks,
    Building2,
    UsersRound,
    LoaderCircle
  } from "lucide-react"

  import { Badge } from "@/Components/ui/badge"
  import { Button } from "@/Components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/Components/ui/card"

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/Components/ui/table"
import { useEffect, useState } from "react"
import { apiClient } from "@/KeycloakConfig/KeycloakConn"
import { API_FACTEUR } from "@/Api/FacteurApi"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { Chart_dash_NA } from "./Chart_dash_NonAdmin"
import { Chart_circle_NA } from "./Chart_circle_NonAdmin"

const DashboardEMPLOYE=({idUtilisateur,nomUtilisateur})=>{
    
    
    const [nbDaysUserAnswer,setNbDaysUserAnswer]=useState()
    const NumberOfDaysThatUserAnswer=async()=>{
        const response= await apiClient.get(`data/dates?IdUtilisateur=${idUtilisateur}`)
        const data=response.data
        const today = new Date();
        const currentYearMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
        const filteredData = Object.keys(data).filter(date => date.startsWith(currentYearMonth));
        const number=Object.keys(filteredData).length
        setNbDaysUserAnswer(number) 
    }
    NumberOfDaysThatUserAnswer()

    const getDaysInCurrentMonth=()=> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const nextMonthDate = new Date(currentYear, currentMonth, 1);
    nextMonthDate.setDate(nextMonthDate.getDate() - 1);

    return nextMonthDate.getDate();
    }

    
    const [nbr_facteur,set_nbr_facteur]=useState(0)
   
    const getfacteur=()=>{
      apiClient.get(`${API_FACTEUR.Facteur_ALL}`)
        .then(response => response.data)
        .then(data => { 
          set_nbr_facteur(data.length);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          const currentdate = new Date();
          toast.error('Problème de chargement des données', {
            description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
          });
        });
    };
    
    useEffect(()=>{
      getfacteur();
    },[])
    return (
  <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-1">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
          <Card className="" style={{ boxShadow: '0px 1px 20px 5px #e5f1f7' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              nombre de facteurs
              </CardTitle>
              <ListChecks  className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
              <div className="text-2xl font-bold">{nbr_facteur}</div>
              </CardContent>
          </Card>
          <Card className="" style={{ boxShadow: '0px 1px 20px 5px #e5f1f7' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              Nombre de jours renseignés:
              </CardTitle>
              <ListChecks  className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
              <div className="text-2xl font-bold">{nbDaysUserAnswer}  / {getDaysInCurrentMonth()}</div>
              </CardContent>
          </Card>
          </div> 
          {idUtilisateur ? (
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Chart_dash_NA nomUtilisateur={nomUtilisateur} idUtilisateur={idUtilisateur}/>
        <Chart_circle_NA idUtilisateur={idUtilisateur}/>
        </div>
        ) : (
          <LoaderCircle size={60} strokeWidth={2.75} className='animate-spin' />
        )}
        </main>  )
}
export default DashboardEMPLOYE;