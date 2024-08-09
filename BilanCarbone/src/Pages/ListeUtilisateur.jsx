import React, { useContext, useEffect, useState } from "react";
import {apiClient, apikeycloak} from "../KeycloakConfig/KeycloakConn"
import {
  Check,
  X,
  Terminal,
  MoreHorizontal
} from "lucide-react";
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import axios from "axios";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";;
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Tabs,
  TabsContent,
} from "@/Components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,

} from "@/Components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog"

import Alerts from "@/Composant/Alerts";
import { SearchContext } from "@/Static/SearchProvider";
import ModifyForm from "@/Composant/ModifyForm";

function ListeUtilisateur() {

    const [utilisateurs,setUtilisateurs]=useState([]);
    const [roles, setRoles] = useState({});
    const { searchValue, handleSearching } = useContext(SearchContext);
    const [pageNum,setPageNum]=useState(0);
    const [totalElements,setTotalElements]=useState(8);
    const [size,setSize]=useState(8);
    const [totalPages,setTotalPages]=useState(1);
    const [first,setFirst]=useState(true);
    const [last,setLast]=useState(true);
    const [pageClicked,setPageClicked]=useState(0)
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [utilisateurID, setUtilisateurID] = useState("");
    const [isModifyFormVisible, setIsModifyFormVisible] = useState(false);
    const [problemAlert,setProblemAlert]=useState(false)
    const [alertModifier,setAlertModifier]=useState(false)
    const [alertSupprimer,setAlertSupprimer]=useState(false)
    const [alertBlocker,setAlertBlocker]=useState(false)
    const [utilisateurInfo,setUtilisateurInfo]=useState({})
    const [selectedRole,setSelectedRole]=useState("")


    
    

    const getAllUtilisateur=async()=>{
      try{
        const response=await apiClient.get("utilisateur",{
          params:{
            page:pageNum,
            size:size,
            search:searchValue
          }
        })
        
        setUtilisateurs(response.data.content)
        setPageNum(response.data.number)
        setTotalElements(response.data.totalElements)
        setSize(response.data.size)
        setTotalPages(response.data.totalPages)
        setFirst(response.data.first)
        setLast(response.data.last)
      }
      catch(error){  
        console.error(error);

          
      }
    
    }


    useEffect(
      ()=>{
      getAllUtilisateur()
    },[searchValue,size,pageNum]) ;

    
      const getUserInfo=async(id)=>{
        try{
          const response=await apiClient.get(`/utilisateur/id?ID=${id}`)
          console.log(response.data)
          setUtilisateurInfo(response.data)
        }
        catch(error){
          console.error(error)
        }
        
      }
      
      

      
        const getRoleUtilisateur= async(id)=>{
          try{
            
                const response= await apikeycloak.get(`/users/${id}/role-mappings/realm`)
                return response.data[0].name
                    
    
          }
          catch(error){  
            console.error(error);
            
        }
          
      }
      const fetchRoles = async () => {
        const rolesData = {};
        const rolesPromises=utilisateurs.flatMap(utilisateur=>getRoleUtilisateur(utilisateur.userRepresentation.id)) 
        const rolesResults=await Promise.all(rolesPromises)
        rolesResults.forEach((role, index) => {
            rolesData[utilisateurs[index].userRepresentation.id] = role;
          });
          setRoles(rolesData);
        };

      useEffect(() => {
        fetchRoles();
      }, [utilisateurs]);
  
    const UtilisateurStatusUpdate=(idUtilisateur)=>
    
    {
          try{
            const response=apiClient.put(`utilisateur/block?ID=${idUtilisateur}`)
            setAlertBlocker(true);

          }
          catch(error){
            console.error(error)
            setProblemAlert(true)
          }
      };
      const DeleteUtilisateur=(idUtilisateur)=>
    
        {
              try{
                const response=apiClient.delete(`utilisateur?ID=${idUtilisateur}`)
                setAlertSupprimer(true);
                
                
              }
              catch(error){
                console.error(error)
                setProblemAlert(true)
              }
              finally{

                setIsAlertDialogOpen(false)
                setUtilisateurID("")
              }
          };
    const handleModifyFormVisibility=()=>{
        const timer = setTimeout(() => {
          getAllUtilisateur()
          fetchRoles()
          setIsModifyFormVisible(!isModifyFormVisible)
        }, 100);
    }
     
    const handlePageChange = (page) => {
      setPageNum(parseInt(page));
    };
    const handleChange = (value) => {
      handleSize(parseInt(value));
    };
    const handleSize = (size) => {
      setSize(size);
    };

    useEffect(() => {
      if (problemAlert) {
        const timer = setTimeout(() => {
          setProblemAlert(false);
        }, 4000);
  
        return () => {clearTimeout(timer)}
      }
    }, [problemAlert]);
  
    useEffect(() => {
      if (alertBlocker) {
        const timer = setTimeout(() => {
          setAlertBlocker(false);
          getAllUtilisateur()
          fetchRoles() 
          
        }, 500);
  
        return () => {clearTimeout(timer)}
      }
    }, [alertBlocker]);

    useEffect(() => {
      if (alertModifier) {
        const timer = setTimeout(() => {
          setAlertModifier(false);
          getAllUtilisateur()
          fetchRoles()  
          
        }, 500);
  
        return () => {clearTimeout(timer)}
      }
    }, [alertModifier]);



    useEffect(() => {
      if (alertSupprimer) {
        const timer = setTimeout(() => {
          setAlertSupprimer(false);
          getAllUtilisateur()
          
        }, 500);
  
        return () => {clearTimeout(timer)}
      }
    }, [alertSupprimer]);
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {isModifyFormVisible&& <ModifyForm onClose={handleModifyFormVisibility} UtilisateurInfo={utilisateurInfo} UtilisateurRole={selectedRole}/>}
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Utilisateurs</CardTitle>
                  <CardDescription>
                    Listes Utilisateurs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Prénom & Nom</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Nom Utilisateur
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Email
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Entreprise
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Rôle
                        </TableHead>
                        <TableHead>
                          Status
                        </TableHead>
                        <TableHead>
                            Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {utilisateurs.map 
                        ((utilisateur)=>{
                            const {id,email,lastName,firstName,enabled,username,attributes}=utilisateur.userRepresentation;
                            const{nomEntreprise}=utilisateur.entreprise
                            const role = roles[id];
                            return(
                              
                              <TableRow key={id} >
                                <TableCell className="font-medium">
                                          {lastName} {firstName}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                          {username}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                          {email}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                      {nomEntreprise}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {role}
                                </TableCell>
                                <TableCell>
                                          {enabled ? (<h1 className=" bg-green-700 border-solid rounded-sm text-white text-center p-1 text-xs">Active</h1>) : (<h1 className=" bg-red-600 border-solid rounded-sm text-white p-1 text-center text-xs">Désactive</h1>)}
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel >Actions</DropdownMenuLabel>
                                      <DropdownMenuItem onClick={()=>{UtilisateurStatusUpdate(id);}}>{enabled ? "Blocker":"Deblocker"}</DropdownMenuItem>
                                      <DropdownMenuItem onClick={()=>{setSelectedRole(`${role}`);getUserInfo(id);handleModifyFormVisibility()}} >Modifer</DropdownMenuItem>      
                                      <DropdownMenuItem onClick={()=>{setUtilisateurID(id);setIsAlertDialogOpen(true)}}>Supprimer</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                 </TableCell>
                              </TableRow>
                              
                            )
                          }
                    )
                    }
                    
                    </TableBody>
                  </Table>
                </CardContent>
               <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Total Des  
                    Elements: <strong>{totalElements}</strong>
                  </div>
                  <Select onValueChange={handleChange}>
                    <SelectTrigger className="w-48 md=w-100">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Nombre Elements:</SelectLabel>
                        <SelectItem value="2" >2</SelectItem>
                        <SelectItem value="4" >4</SelectItem>
                        <SelectItem value="16">16</SelectItem>
                        <SelectItem value="24">24</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Pagination>
                    
                  <PaginationContent>

                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={
                        () =>{
                          if(!first){
                            handlePageChange(pageNum-1)
                            setPageClicked(pageNum)
                          }
                          
                        } 
                        }/>
                    </PaginationItem>
                     
                      {
                        
                        [...Array(totalPages)].map((_, pageIndex) =>
                        {
                        
                        return(
                          ( 
                            <PaginationItem key={pageIndex}>
                              <PaginationLink href="#"  onClick={() => {handlePageChange(pageIndex);setPageClicked(pageIndex)}} className={pageClicked==pageIndex && pageClicked == pageNum? "bg-custom-color": ""}>{pageIndex + 1}</PaginationLink>
                            </PaginationItem>)
                           
                          )
                        }
                        )
                        
                      }
                    <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => {
                          if (pageNum < totalPages - 1) {
                            handlePageChange(pageNum + 1);
                            setPageClicked(pageNum)
                          }
                        }}
                      />
                    </PaginationItem>

                  </PaginationContent>

                </Pagination>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs> 
          <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
             <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Etes-vous absolument sûr ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action ne peut pas être annulée. Cela supprimera
                    définitivement ce utilisateur.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-black hover:bg-red-600"
                    onClick={()=>{DeleteUtilisateur(utilisateurID)}}
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
             </AlertDialogContent>
            </AlertDialog>   
            
        </main>
      </div>
        <Alerts alert={alertBlocker} alertProblem={problemAlert} titre_succes={"Operation Réussite"} message_succes={"Utilisateur est blocker ou deblocker avec succès" } message_erreur={"Une erreur est survenue lors de cette opêration"}/>
        <Alerts alert={alertSupprimer} alertProblem={problemAlert} titre_succes={"Operation Réussite"} message_succes={"Utilisateur est supprimer  avec succès" } message_erreur={"Une erreur est survenue lors de cette opêration"}/>
        <Alerts alert={alertModifier} alertProblem={problemAlert} titre_succes={"Operation Réussite"} message_succes={"Utilisateur est modifer avec succès" } message_erreur={"Une erreur est survenue lors de cette opêration"}/>
    </div>
  )

}
export default React.memo(ListeUtilisateur)


