import {
  Card,
  CardContent,
} from "@/Components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/Components/ui/tabs";
import List_Facteur from "./Layout/List_Facteur";
import List_Type from "./Layout/List_Type";
import { useSearchParams } from "react-router-dom";
import keycloak from "@/KeycloakConfig/keycloak";
import List_Facteur_entre from "./Layout/List_Facteur_entre";
import List_type_entre from "./Layout/List_type_entre";

export function Listfct() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("type")=="tout"||searchParams.get("type")=="parent"||searchParams.get("type")=="hierarchie"?"type":"facteur";
  const userRoles = keycloak.tokenParsed?.realm_access?.roles;

  return (
    <Tabs defaultValue={activeTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 border-b">
        <TabsTrigger value="facteur" className="w-full text-center"  onClick={() => setSearchParams({})}>
          Facteur
        </TabsTrigger>
        <TabsTrigger value="type" className="w-full text-center" onClick={() => setSearchParams({ type: "tout" })}>
          Type
        </TabsTrigger>
      </TabsList>
      <TabsContent value="facteur">
        <Card className="w-full bg-slate-100">
          <CardContent>
          {userRoles?.includes("ADMIN") ? <List_Facteur /> : <List_Facteur_entre />}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="type" className="w-full">
        <Card className="w-full bg-slate-100">
          <CardContent>
          {userRoles?.includes("ADMIN") ? <List_Type /> : <List_type_entre />}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
