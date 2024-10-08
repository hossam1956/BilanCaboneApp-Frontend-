import React, { useContext, useEffect, useState } from "react";
import {apiClient} from "../KeycloakConfig/KeycloakConn"
import {
  Check,
  X
} from "lucide-react";
import axios from "axios";
import { Button } from "@/Components/ui/button";
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
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"

import { SearchContext } from "@/Static/SearchProvider";
import Alerts from "@/Composant/Alerts";

function ListDemandePage() {

    const [demandes,setDemandes]=useState([])
    const { searchValue, handleSearching } = useContext(SearchContext);
    const [pageNum,setPageNum]=useState(0)
    const [totalElements,setTotalElements]=useState(8);
    const [size,setSize]=useState(8);
    const [totalPages,setTotalPages]=useState(1);
    const [first,setFirst]=useState(true)
    const [last,setLast]=useState(true)
    const [currentId,setcurrentId]=useState(0)    
    const [currentIdAccept,setCurrentIdAccept]=useState(0)
    const [problemAlert,setProblemAlert]=useState(false)
    const [alert,setAlert]=useState(false)
    const [pageClicked,setPageClicked]=useState(0)

    const getAllDemande=async()=>{
      try{
        const response=await apiClient.get(`/demande`,{
          params:{
            page:pageNum,
            size:size,
            search:searchValue
          }

        })
            setDemandes(response.data.content)
            setPageNum(response.data.number)
            setTotalElements(response.data.totalElements)
            setSize(response.data.size)
            setTotalPages(response.data.totalPages)
            setFirst(response.data.first)
            setLast(response.data.last)
            
       }
      catch(error){  
          console.error('Erreur : '+error)
        }
    }


    useEffect(()=>{
        getAllDemande()
    },[searchValue,size,pageNum])

    //useEffect pour annulation:

    useEffect(()=>{
      const rejectDemande = async () => {
        if (currentId) {
          try {
            const response = await apiClient.delete(`/demande/reject`, {
              params: { id: currentId },
              
            });
            setAlert(true);
            await getAllDemande();
          } catch (error) {
            console.error(error);
            setProblemAlert(true);
          } finally {
            setcurrentId(0);
          }
        }
      };
    
      rejectDemande();
      
    },[currentId])
     //useEffect pour acceptation:
    useEffect(() => {
      const acceptDemande = async () => {
        if (currentIdAccept) {
          try {
            const response = await apiClient.delete(`/demande/accept`, {
              params: { id: currentIdAccept }
              
            });
            setAlert(true);
            await getAllDemande()
          } catch (error) {
            console.error(error)
            setProblemAlert(true)
          }finally {
            setCurrentIdAccept(0);
          }
        }
      };
  
      acceptDemande();
    }, [currentIdAccept]);

    useEffect(() => {
      if (problemAlert) {
        const timer = setTimeout(() => {
          setProblemAlert(false);
        }, 4000);
  
        return () => {clearTimeout(timer)}
      }
    }, [problemAlert]);


    useEffect(() => {
      if (alert) {
        const timer = setTimeout(() => {
          setAlert(false);
        }, 500);
  
        return () => {clearTimeout(timer)}
      }
    }, [alert]);
    
   
 

    const handlePageChange = (page) => {
      setPageNum(parseInt(page));
    };
    const handleChange = (value) => {
      handleSize(parseInt(value));
    };
    const handleSize = (size) => {
      setSize(size);
    };
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Demandes</CardTitle>
                  <CardDescription>
                    Demandes de création de compte
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
                          Envoyée le
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Rôle
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                        demandes.length==0?(<TableRow><TableCell colSpan="7" className="font-medium text-3xl text-center" >Pas de Demandes</TableCell></TableRow>):
                        demandes.map(
                            (demande)=>{
                                const {id,nom,prenom,nomUtilisateur, email, entreprise, sendDate,role } = demande;
                                return(
                                <TableRow key={id}>
                                <TableCell className="font-medium">
                                    {prenom} {nom}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {nomUtilisateur}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {email}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {entreprise.nom}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {sendDate}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {role}
                                </TableCell>
                                <TableCell className="flex justify-around ">
                                <AlertDialog className="overflow-y-auto overflow-x-auto">
                                  <AlertDialogTrigger asChild>
                                    <Button className="bg-black hover:bg-green-700 text-xs w-16 h-6 md:h-8 md:w-24"><Check size={28} color="#ffffff" />Accepter</Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="w-screen">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Etes-vous absolument sûr ?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Cette action ne peut pas être annulée. Cela acceptera définitivement cette demande.                                      
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction className="bg-black hover:bg-green-700" onClick={()=>{setCurrentIdAccept(parseInt(id))}}>Accepter</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                                
                                <AlertDialog className="overflow-y-auto overflow-x-auto">
                                  <AlertDialogTrigger asChild>
                                    <Button className="bg-black hover:bg-red-600 text-xs w-16 h-6 md:h-8 md:w-24 mx-2 md:mx-1">
                                      <X size={16} color="#ffffff" />Refuser
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="w-screen">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Etes-vous absolument sûr ?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Cette action ne peut pas être annulée. Cela supprimera définitivement cette demande.                                      
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction className="bg-black hover:bg-red-600" onClick={()=>{setcurrentId(parseInt(id));}}>Refuser</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>                                
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
        </main>
      </div>
     <Alerts alert={alert} alertProblem={problemAlert} titre_succes={"Demande Acceptée"} message_succes={"Demande Acceptée avec succès" } message_erreur={`Une erreur est survenue lors de traitement de la demande  \n ->Peut être un compte manager existant pour cette entreprise. \n ->Peut être ce username déja existant \n ->Peut être un manager pour cette entreprise est déja existant `
      .split('\n')
      .map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
          <br />
        </React.Fragment>
      ))
     } />
    </div>
  )

}
export default ListDemandePage

