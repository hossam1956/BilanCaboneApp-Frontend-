
import {
  PlusCircle,
  Search
} from "lucide-react";
import { Input } from "@/Components/ui/input";
import {
  CardFooter,
  CardContent,
  Card,
} from "@/Components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/Components/ui/pagination";
import { API_FACTEUR } from "@/Api/FacteurApi";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/Components/ui/skeleton";
import { toast } from 'sonner';
import FacteurtrashTable from "./Table/FacteurtrashTable";
import { apiClient } from "@/KeycloakConfig/KeycloakConn";

export const List_Trash_facteur = () => {
  const [Facteurs, setFacteurs] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState([]);

  useEffect(() => {
    getData();
  }, [currentPage, search, sortConfig]);

  const getData = () => {
    let sorted = "";
    sortConfig.forEach(e => {
      sorted += `&sortBy=${e.key}&sortBy=${e.direction}`;
    });
    setLoading(true);
    apiClient.get(`${API_FACTEUR.Facteur_trash}?page=${currentPage}&search=${search}${sorted}`)
      .then(response => response.data)
      .then(response => {
        setFacteurs(response);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
        const currentdate = new Date();
        toast.error('Problème de chargement des données', {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
      });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlerecovery = (id, nom) => {
    apiClient.post(`${API_FACTEUR.Facteur_trash}/${id}`)
      .then(response => response.data)
      .then(response => {
        const currentdate = new Date();
        toast.success(`Le facteur ${response.nom_facteur} a été récupéré`, {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
        getData();
      })
      .catch(error => {
        console.error("Error deleting data:", error);
        const currentdate = new Date();
        toast.error(`Problème de récupération de facteur ${nom}`, {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
      });
  };

  const handledestroy = (id, nom) => {
    apiClient.delete(`${API_FACTEUR.Facteur_trash}/${id}`)
      .then(response => response.data)
      .then(response => {
        const currentdate = new Date();
        toast.success(`Le facteur ${response.nom_facteur} a été détérioré`, {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
        getData();
      })
      .catch(error => {
        console.error("Error activating data:", error);
        const currentdate = new Date();
        toast.error(`Problème de détérioré de facteur ${nom}`, {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
      });
  };
  return (
    <>
      <main className="mt-4">
          <div className="flex items-center mb-4">
          <span className="text-lg font-semibold text-sapphire-700">Les Facteur global supprimee</span>

            <div className="relative ml-auto flex items-center gap-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
              type="search"
              placeholder="Recherche..."
              onChange={handleSearch}
              value={search}
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
            </div>
          </div>
            <Card className="w-full ">        
            <CardContent>
            <FacteurtrashTable
              Facteurs={Facteurs}
              loading={loading}
              setSortConfig={setSortConfig}
              sortConfig={sortConfig}
              handledestroy={handledestroy}
              handlerecovery={handlerecovery}
            />
          </CardContent>
              <CardFooter className="flex items-center justify-between">
              {loading ? (
              <Skeleton className="h-4 w-full bg-slate-200" />
            ) : (
              <>
                <div className="text-xs text-muted-foreground">
                  Affichage <strong>{Facteurs.number * Facteurs.size + 1}-{Math.min((Facteurs.number + 1) * Facteurs.size, Facteurs.totalElements)}</strong> de <strong>{Facteurs.totalElements}</strong> Facteurs
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={() => handlePageChange(Math.max(currentPage - 1, 0))} />
                    </PaginationItem>
                    {[...Array(Facteurs.totalPages)].map((_, pageIndex) => (
                      <PaginationItem key={pageIndex}>
                        <PaginationLink href="#" onClick={() => handlePageChange(pageIndex)}>{pageIndex + 1}</PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext href="#" onClick={() => handlePageChange(Math.min(currentPage + 1, Facteurs.totalPages - 1))} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            )}
              </CardFooter>
            </Card>
      </main>
    </>
  );
};

