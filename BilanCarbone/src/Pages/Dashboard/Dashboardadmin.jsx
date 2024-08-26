import {
    ArrowUpRight,
    ListChecks,
    Building2,
    UsersRound,
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
import { Chart_dash } from "./Chart_dash"
import { Chart_circle } from "./Chart_circle"
import { useEffect, useState } from "react"
import { apiClient } from "@/KeycloakConfig/KeycloakConn"
import { API_FACTEUR } from "@/Api/FacteurApi"
import { toast } from "sonner"
import { Link } from "react-router-dom"
const Dashboardadmin = () => {
  const [facteur, setFacteur] = useState([]);
  const [nbr_facteur,set_nbr_facteur]=useState(0)
  const [user,setuser]=useState([]);
  const [nbr_user,set_nbr_user]=useState(0);

  const [entreprise, setentreprise]=useState([]);
  const [nbr_entreprise, set_nbr_entreprise]=useState(0);

  useEffect(()=>{
    getfacteur();
    getentreprise();
    getusers();
  },[])
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
  const getentreprise=()=>{
    apiClient.get(`/entreprises`)
      .then(response => response.data)
      .then(data => {
        console.log(data)
        // Adjust the slice method according to your needs
        setentreprise(data.slice(0, 5)); // Example: limit to 10 items
        set_nbr_entreprise(data.length);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        const currentdate = new Date();
        toast.error('Problème de chargement des données', {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
      });
  };
  const getusers=()=>{
    apiClient.get(`/utilisateur/list`)
      .then(response => response.data)
      .then(data => {
        // Adjust the slice method according to your needs
        console.log(data)
        set_nbr_user(data.length)
        setuser(data)
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        const currentdate = new Date();
        toast.error('Problème de chargement des données', {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
      });
  };
  return (
<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-1">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
        <Card className="" style={{ boxShadow: '0px 1px 20px 5px #ffd2d2' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                nombre d&apos;entreprises
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{nbr_entreprise}</div>
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
        <Card className="" style={{ boxShadow: '0px 1px 20px 5px #ffdbb4' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
            nombre de Demandes
            </CardTitle>
            <ListChecks  className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{nbr_facteur}</div>
            </CardContent>
        </Card>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Chart_dash User={user} entreprise={entreprise}/>
        <div className=" flex items-center justify-center">
        <Chart_circle User={user}/>
        </div>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
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
          <Card className="" style={{ boxShadow: '0px 1px 20px 5px #ffd2d2' }}>
          <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Entreprise</CardTitle>
                <CardDescription>
                Dernier entreprise à ajouter
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <span href="#">
                Afficher tout
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead className="text-right">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {entreprise.map(f => (
                <TableRow key={f.id}>
                  <TableCell>
                    <div className="font-medium">{f.nom}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {f.adresse}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{f.type	}</TableCell>
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
                {user.map(f => (
                    <TableRow key={f.customUserRepresentation.userRepresentation.id}>
                      <TableCell>
                        <div className="font-medium">{f.customUserRepresentation.userRepresentation.username}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {f.customUserRepresentation.userRepresentation.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                      {new Date(f.customUserRepresentation.userRepresentation.createdTimestamp).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}

                </TableBody>
               </Table>
            </CardContent>
          </Card>
        </div>

      </main>  )
}

export default Dashboardadmin