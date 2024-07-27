import React, { useContext, useEffect, useState } from "react";
import {
  Check,
  X
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
import Navheader from "@/Static/Navheader";
import { SearchContext } from "@/Static/SearchProvider";

function ListDemandePage() {

    const [demandes,setDemandes]=useState([]);
    const { searchValue, handleSearching } = useContext(SearchContext);

    useEffect(()=>{
        axios.get(`http://localhost:8081/api/demande?search=${searchValue}`)
        .then((response)=>{
            setDemandes(response.data.content)

        }
    )
        .catch((error)=>{
            console.error('erreur1'+error)
        }
    )
    },[searchValue])

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
                                const {id,nomUtilisateur, username, email, entreprise, sendDate } = demande;
                                return(
                                <TableRow key={id}>
                                <TableCell className="font-medium">
                                    {nomUtilisateur}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {username}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {email}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {entreprise}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {sendDate}
                                </TableCell>
                                <TableCell className="flex justify-around ">
                                    <Button className="bg-black hover:bg-green-700 text-xs w-16 h-6 md:h-8 md:w-24"><Check size={28} color="#ffffff" />Accepter</Button>
                                    <Button className="bg-black hover:bg-red-600 text-xs w-16 h-6 md:h-8 md:w-24 mx-2 md:mx-1"><X size={16} color="#ffffff" />Refuser</Button>
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
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )

}
export default ListDemandePage
