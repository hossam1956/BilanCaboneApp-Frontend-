import React, { useContext, useEffect, useState } from "react";
import {apiClient} from "../KeycloakConfig/KeycloakConn"
import {
  Check,
  X,
  Terminal
} from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";;
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,

} from "@/components/ui/pagination";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
} from "@/components/ui/alert-dialog"

import { SearchContext } from "@/Static/SearchProvider";

function ListDemandePage() {

    const [demandes,setDemandes]=useState([]);
    const { searchValue, handleSearching } = useContext(SearchContext);
    const [pageNum,setPageNum]=useState(0);
    const [totalElements,setTotalElements]=useState(8);
    const [size,setSize]=useState(8);
    const [totalPages,setTotalPages]=useState(1);
    const [first,setFirst]=useState(true);
    const [last,setLast]=useState(true);
    const [currentId,setcurrentId]=useState(0)    
    const [currentIdAccept,setCurrentIdAccept]=useState(0)
    const [alert,setAlert]=useState(false)
    const [pageClicked,setPageClicked]=useState(0)


    useEffect(()=>{
      
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
            window.location.reload();   
            console.error('Erreur : '+error)
          }
      }
        getAllDemande()
    },[searchValue,size,pageNum])

    //useEffect pour annulation:

    useEffect(()=>{
      if(currentId){
        try{
          const response =apiClient.delete(`demande/reject`,{
            params:{id: currentId}
          })
          window.location.reload()
        }
        catch (error) {
          console.error(error)
        }finally {
          setCurrentIdAccept(0);
        }

      }
      
    },[currentId])
     //useEffect pour acceptation:
    useEffect(() => {
      const acceptDemande = async () => {
        if (currentIdAccept) {
          try {
            const response = await apiClient.delete(`/demande/accept`, {
              params: { id: currentIdAccept }
            });
            if(response.data === true){
              window.location.reload() 
              
            }
            else{
                setAlert(true)
                console.log(alert)
            }
          } catch (error) {
            console.error(error)
            setAlert(true)
          }finally {
            setCurrentIdAccept(0);
          }
        }
      };
  
      acceptDemande();
    }, [currentIdAccept]);

    useEffect(() => {
      if (alert) {
        const timer = setTimeout(() => {
          setAlert(false);
        }, 4000);
  
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
                            Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {demandes.map(
                            (demande)=>{
                                const {id,nom,prenom,nomUtilisateur, email, entreprise, sendDate } = demande;
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
                                    Norsys Afrique
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {sendDate}
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
                                      <AlertDialogAction className="bg-black hover:bg-red-600" onClick={()=>{setcurrentId(parseInt(id));console.log(currentId)}}>Refuser</AlertDialogAction>
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
     
      {alert && (      <div className="fixed top-4 right-4 w-60 z-10 transition-transform transform translate-x-0">
                      <Alert className="bg-red-400">
                        <Terminal className="h-4 w-3" />
                        <AlertTitle>Attention!</AlertTitle>
                        <AlertDescription>
                          Il ya un problème au niveau d'acceptation de la demande peut être ce email existe déja ou le nom d'utilisateur est invalide.
                        </AlertDescription>
                      </Alert>
                      </div>)}
        
    </div>
  )

}
export default ListDemandePage


