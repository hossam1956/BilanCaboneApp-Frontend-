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
import { useNavigate } from 'react-router-dom';
import { Button } from "@/Components/ui/button";
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
import { Skeleton } from "@/Components/ui/skeleton";
import { toast } from 'sonner';
import FacteurTable from "./Table/FacteurTable"; // Import the new table component
import { apiClient } from "@/KeycloakConfig/KeycloakConn";

const List_Facteur = () => {
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
    apiClient.get(`${API_FACTEUR.Facteur}?page=${currentPage}&search=${search}${sorted}`)
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

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/facteur/ajouter');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handledeletesoft = (id, nom) => {
    apiClient.delete(`${API_FACTEUR.Facteur}/${id}`)
      .then(response => response.data)
      .then(response => {
        const currentdate = new Date();
        toast.success(`Le facteur ${response.nom_facteur} a été supprimé`, {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
        getData();
      })
      .catch(error => {
        console.error("Error deleting data:", error);
        const currentdate = new Date();
        toast.error(`Problème de suppression de facteur ${nom}`, {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
      });
  };

  const handleactivate = (id, nom) => {
    apiClient.put(`${API_FACTEUR.Facteur}/${id}/activate`)
      .then(response => response.data)
      .then(response => {
        const currentdate = new Date();
        toast.success(`Le facteur ${response.nom_facteur} a été activé`, {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
        getData();
      })
      .catch(error => {
        console.error("Error activating data:", error);
        const currentdate = new Date();
        toast.error(`Problème d'activation de facteur ${nom}`, {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
      });
  };

  const handledesactivate = (id, nom) => {
    apiClient.put(`${API_FACTEUR.Facteur}/${id}/desactivate`)
      .then(response => response.data)
      .then(response => {
        const currentdate = new Date();
        toast.success(`Le facteur ${response.nom_facteur} a été désactivé`, {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
        getData();
      })
      .catch(error => {
        console.error("Error deactivating data:", error);
        const currentdate = new Date();
        toast.error(`Problème de désactivation de facteur ${nom}`, {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
      });
  };

  return (
    <>
      <main className="mt-4">
        <div className="flex items-center mb-4">
          <span className="text-lg font-semibold text-sapphire-700">Les Facteurs Global</span>
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
          <div className="relative ml-4 flex items-center gap-2">
            <Button size="sm" onClick={handleClick}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Ajouter Facteur</span>
            </Button>
          </div>
        </div>
        <Card className="w-full">
          <CardContent>
            <FacteurTable
              Facteurs={Facteurs}
              loading={loading}
              setSortConfig={setSortConfig}
              sortConfig={sortConfig}
              handledeletesoft={handledeletesoft}
              handleactivate={handleactivate}
              handledesactivate={handledesactivate}
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

export default List_Facteur;
