import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/Components/ui/tabs";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_FACTEUR } from "@/Api/FacteurApi";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import FacteurPaginationtable from "./Table/FacteurPaginationtable";
import { apiClient } from "@/KeycloakConfig/KeycloakConn";

const List_Facteur_entre = () => { 
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterParam, setFilterParam] = useState("my=true");
  const activeTab = searchParams.get("facteur") || "personnalise";
  const [Facteurs, setFacteurs] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState([]);
useEffect(() => {
  if (activeTab === "personnalise") {
    setFilterParam("my=true");
  } else {
    setFilterParam("");
  }
  getData();
}, [currentPage, search, sortConfig,filterParam]);

const getData = () => {
  if(activeTab!=="personnalise"){
    setFilterParam("")
  }
  let sorted = "";
  sortConfig.forEach(e => {
    sorted += `&sortBy=${e.key}&sortBy=${e.direction}`;
  });
  setLoading(true);
  apiClient.get(`${API_FACTEUR.Facteur}?${filterParam}&page=${currentPage}&search=${search}${sorted}`)
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
const handleSortRequest = key => {
  setSortConfig(prevConfig => {
    const existingConfigIndex = prevConfig.findIndex(e => e.key === key);
    const newConfig = [...prevConfig];
    if (existingConfigIndex !== -1) {
      newConfig[existingConfigIndex] = { key, direction: newConfig[existingConfigIndex].direction === 'asc' ? 'desc' : 'asc' };
    } else {
      newConfig.push({ key, direction: 'asc' });
    }
    return newConfig;
  });
};

const handleAddClick = () => {
  navigate('/facteur/ajouter');
};
  return (
    <main className="mt-4">
      <Tabs defaultValue={activeTab}>
        <div className="flex items-center mb-4">
          <TabsList>
          <TabsTrigger onClick={() => { setFilterParam("my=true"); setSearchParams({ facteur: "personnalise" }) }} value="personnalise">personnalisé</TabsTrigger>
            <TabsTrigger onClick={() => { setFilterParam(""); setSearchParams({ facteur: "global" }) }} value="global">global</TabsTrigger>
          </TabsList>
          <div className="relative ml-auto flex items-center gap-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Recherche..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative ml-4 flex items-center gap-2">
            <Button onClick={handleAddClick} size="sm">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Ajouter Type a Facteur</span>
            </Button>
          </div>
        </div>

        <TabsContent value="personnalise">
          <div className="text-lg font-semibold text-sapphire-700 m-3">Les facteurs personnalisee</div>
          <FacteurPaginationtable
            Facteurs={Facteurs}
            loading={loading}
            sortConfig={sortConfig}
            requestSort={handleSortRequest}
            handlePageChange={setCurrentPage}
            currentPage={currentPage}
            setSortConfig={setSortConfig}
            handleDelete={handledeletesoft}
            handleActivate={handleactivate}
            handleDeactivate={handledesactivate}
            isGlobal={false} // ou false selon le contexte

          />
        </TabsContent>
        <TabsContent value="global">
          <div className="text-lg font-semibold text-sapphire-700 m-3">Les facteurs globaux</div>
          <FacteurPaginationtable
            Facteurs={Facteurs}
            loading={loading}
            sortConfig={sortConfig}
            requestSort={handleSortRequest}
            handlePageChange={setCurrentPage}
            currentPage={currentPage}
            setSortConfig={setSortConfig}
            isGlobal={true} // ou false selon le contexte
          />
        </TabsContent>
      
      </Tabs>
    </main>
  );
};

export default List_Facteur_entre;
