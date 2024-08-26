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
import { Chart_dash_DM } from "./Chart_dash_DM"
import { Chart_circle_DM } from "./Chart_circle_DM"
const DashboardNonAdmin=()=>{
  const [facteur, setFacteur] = useState([]);
  const [nbr_facteur,set_nbr_facteur]=useState(0)
  const [user,setUser]=useState([]);
  const [nbr_user,set_nbr_user]=useState(0);

  const [nomEntreprise, setnomEntreprise]=useState();
  const [idEntreprise, setIdEntreprise]=useState();

 
  const getfacteur=()=>{
    apiClient.get(`${API_FACTEUR.Facteur_ALL}`)
      .then(response => response.data)
      .then(data => {
        // Adjust the slice method according to your needs
        setFacteur(data.slice(0, 5)); // Example: limit to 10 items
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
  const getusers=async()=>{
    await apiClient.get(`/utilisateur/list`)
      .then(response => response.data)
      .then(data => {
        setUser(data.slice(0,5))
        set_nbr_user(data.length)
        setnomEntreprise(data[0].customUserRepresentation.entreprise.nom)
        setIdEntreprise(data[0].customUserRepresentation.entreprise.id)
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
    getusers();
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
        <Card className="" style={{ boxShadow: '0px 1px 20px 5px #E0D1EF' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                nombre d&apos;utilisateurs
            </CardTitle>
            <UsersRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{nbr_user}</div>
            </CardContent>
        </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
       
        {idEntreprise ? (
        <Chart_dash_DM nomEntreprise={nomEntreprise} idEntreprise={idEntreprise} />
        ) : (
          <LoaderCircle size={60} strokeWidth={2.75} className='animate-spin' />
        )}
        <Chart_circle_DM/>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
         <Card className="" style={{ boxShadow: '0px 1px 20px 5px #e5f1f7' }}>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>facteur</CardTitle>
                <CardDescription>
                Dernier facteur à ajouter
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link to="/facteur">
                Afficher tout
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead className="text-right">emission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {facteur.map(f => (
                <TableRow key={f.id}>
                  <TableCell>
                    <div className="font-medium">{f.nom_facteur}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {f.unit}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{f.emissionFactor}</TableCell>
                </TableRow>
              ))}
                </TableBody>
               </Table>
            </CardContent>
          </Card> 

          <Card className="" style={{ boxShadow: '0px 1px 20px 5px #E0D1EF' }}>
          <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>utilisateur</CardTitle>
                <CardDescription>
                Dernier utilisateur à ajouter
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link to="/utilisateur/liste">
                Afficher tout
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {user.map(u=>{
                        const date=new Date(u.customUserRepresentation.userRepresentation.createdTimestamp);
                        const formatedDate=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} `;
                        return(
                            <TableRow>
                            <TableCell>
                              <div className="font-medium">{u.customUserRepresentation.userRepresentation.username}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {u.customUserRepresentation.userRepresentation.email}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{formatedDate}</TableCell>
                          </TableRow>
                        )
                       
                    })}
                </TableBody>
               </Table>
            </CardContent>
          </Card>
        </div>

      </main>  )
 }
export default DashboardNonAdmin;