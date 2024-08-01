import React, { useContext, useEffect, useState } from "react";
import {apiClient} from "../KeycloakConfig/KeycloakConn"
import {
  Check,
  X,
  Terminal,
  MoreHorizontal
} from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

function ListeUtilisateur() {

    //const [demandes,setDemandes]=useState([]);
    const [utilisateurs,setUtilisateurs]=useState([]);
    const { searchValue, handleSearching } = useContext(SearchContext);
    const [pageNum,setPageNum]=useState(0);
    const [totalElements,setTotalElements]=useState(8);
    const [size,setSize]=useState(8);
    const [totalPages,setTotalPages]=useState(1);
    const [first,setFirst]=useState(true);
    const [last,setLast]=useState(true);
    const [pageClicked,setPageClicked]=useState(0)
    const [refreshPage,setRefreshPage]=useState(true)
    useEffect(
      ()=>{
      const getAllUtilisateur=async()=>{
        try{
          const response=await apiClient.get("utilisateur",{
            params:{
              page:pageNum,
              size:size,
              search:searchValue
            }
          })
          
          console.log(response.data)
          setUtilisateurs(response.data.content)
          setPageNum(response.data.number)
          setTotalElements(response.data.totalElements)
          setSize(response.data.size)
          setTotalPages(response.data.totalPages)
          setFirst(response.data.first)
          setLast(response.data.last)
        }
        catch(error){  
            window.location.reload();          
            console.log(error)
            
        }
        finally{
          if(!sessionStorage.getItem('token')){
            window.location.reload()
          }
          
        }
      }
      getAllUtilisateur()
       
    },[searchValue,size,pageNum])   
 

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
                            const {id,email,lastName,firstName,enabled,username}=utilisateur;
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
                                          Norsys Afrique
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                          ADMIN
                                </TableCell>
                                <TableCell>
                                          {enabled ? (<h1 className=" bg-green-700 border-solid rounded-sm text-white text-center">Active</h1>) : (<h1 className=" bg-red-600 border-solid rounded-sm text-white p-2">Désactive</h1>)}
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
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>Blocker</DropdownMenuItem>
                                    <DropdownMenuItem >Modifer</DropdownMenuItem>
                                    <DropdownMenuItem >Supprimer</DropdownMenuItem>
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
                          !first ? handlePageChange(pageNum-1):""
                        } 
                        }/>
                    </PaginationItem>
                     
                      {
                        
                        [...Array(totalPages)].map((_, pageIndex) =>
                        {
                        
                        return(
                          refreshPage &&( 
                            <PaginationItem key={pageIndex}>
                              <PaginationLink href="#"  onClick={() => {handlePageChange(pageIndex);setPageClicked(pageIndex)}} className={pageClicked==pageIndex? "bg-custom-color": ""}>{pageIndex + 1}</PaginationLink>
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
                            setPageClicked(pageNum);
                            setRefreshPage(!!refreshPage)
                            console.log(pageNum)
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
     
      {/*alert && (      <div className="fixed top-4 right-4 w-60 z-10 transition-transform transform translate-x-0">
                      <Alert className="bg-red-400">
                        <Terminal className="h-4 w-3" />
                        <AlertTitle>Attention!</AlertTitle>
                        <AlertDescription>
                          Il ya un problème au niveau d'action effectué.
                        </AlertDescription>
                      </Alert>
                      </div>)*/}
        
    </div>
  )

}
export default ListeUtilisateur


