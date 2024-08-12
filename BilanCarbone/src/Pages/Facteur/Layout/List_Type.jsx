import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/Components/ui/tabs";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import List_type_all from "./Table/List_type_all";
import List_Type_Parent from "./Table/List_Type_Parent";
import List_Type_children from "./Table/List_Type_children";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_TYPE } from "@/Api/FacteurApi";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { apiClient } from "@/KeycloakConfig/KeycloakConn";

const List_Type = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("type") || "tout";
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState([]);
  const [facteurs, setFacteurs] = useState({
    content: [],
    number: 0,
    size: 10,
    totalElements: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterParam, setFilterParam] = useState("");

  const handleAddClick = () => {
    navigate('/facteur/ajouter');
  };

  const fetchData = () => {
    const sortString = sortConfig.map(e => `&sortBy=${e.key}&sortBy=${e.direction}`).join("");
    setLoading(true);
    apiClient.get(`${API_TYPE.Type}?${filterParam}&page=${currentPage}&search=${search}${sortString}`)
      .then(response => response.data)
      .then(response => {
        setFacteurs(response);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
        showToast('error', 'Problème de chargement des données');
      });
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, search, sortConfig, filterParam]);

  const showToast = (type, message) => {
    const currentdate = new Date();
    toast[type](message, {
      description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
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

  const handleDelete = (id, name) => {
    apiClient.delete(`${API_TYPE.Type}/${id}`)
      .then(response => response.data)
      .then(response => {
        showToast('success', `Le type ${response.nom_type} a été supprimé`);
        fetchData();
      })
      .catch(error => {
        console.error("Error deleting data:", error);
        showToast('error', `Problème de suppression de type ${name}`);
      });
  };

  const handleActivate = (id, name, txt) => {
    apiClient.put(`${API_TYPE.Type}/${id}/activate?${txt}`)
      .then(response => response.data)
      .then(response => {
        showToast('success', `Le type ${response.nom_type} a été activé`);
        fetchData();
      })
      .catch(error => {
        console.error("Error activating data:", error);
        showToast('error', `Problème d'activation de type ${name}`);
      });
  };

  const handleDeactivate = (id, name) => {
    apiClient.put(`${API_TYPE.Type}/${id}/desactivate`)
      .then(response => response.data)
      .then(response => {
        showToast('success', `Le type ${response.nom_type} a été désactivé`);
        fetchData();
      })
      .catch(error => {
        console.error("Error deactivating data:", error);
        showToast('error', `Problème de désactivation de type ${name}`);
      });
  };

  return (
    <main className="mt-4">
      <Tabs defaultValue={activeTab}>
        <div className="flex items-center mb-4">
          <TabsList>
            <TabsTrigger onClick={() => { setFilterParam(""); setSearchParams({ type: "tout" }) }} value="tout">Tout</TabsTrigger>
            <TabsTrigger onClick={() => { setFilterParam("parent=true"); setSearchParams({ type: "parent" }) }} value="parent">Parent</TabsTrigger>
            <TabsTrigger onClick={() => { setFilterParam("detail=true"); setSearchParams({ type: "hierarchie" }) }} value="hierarchie">Hierarchie</TabsTrigger>
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

        <TabsContent value="tout">
          <div className="text-lg font-semibold text-sapphire-700 m-3">Les types Globaux</div>
          <List_type_all
            data={facteurs}
            loading={loading}
            sortConfig={sortConfig}
            requestSort={handleSortRequest}
            handlePageChange={setCurrentPage}
            currentPage={currentPage}
            setSortConfig={setSortConfig}
            handleDelete={handleDelete}
            handleActivate={handleActivate}
            handleDeactivate={handleDeactivate}
          />
        </TabsContent>
        <TabsContent value="parent">
          <div className="text-lg font-semibold text-sapphire-700 m-3">Les Parents globaux</div>
          <List_Type_Parent
            data={facteurs}
            loading={loading}
            sortConfig={sortConfig}
            requestSort={handleSortRequest}
            handlePageChange={setCurrentPage}
            currentPage={currentPage}
            setSortConfig={setSortConfig}
            handleDelete={handleDelete}
            handleActivate={handleActivate}
            handleDeactivate={handleDeactivate}
          />
        </TabsContent>
        <TabsContent value="hierarchie">
          <div className="text-lg font-semibold text-sapphire-700 m-3">Les types globaux avec des enfants</div>
          <List_Type_children
            data={facteurs}
            loading={loading}
            sortConfig={sortConfig}
            requestSort={handleSortRequest}
            handlePageChange={setCurrentPage}
            currentPage={currentPage}
            setSortConfig={setSortConfig}
            handleDelete={handleDelete}
            handleActivate={handleActivate}
            handleDeactivate={handleDeactivate}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default List_Type;
