
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  PlusCircle,
  Search,

} from "lucide-react";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import List_type_all from "./List_type_all";
import { useNavigate } from "react-router-dom";
import List_Type_Parent from "./List_Type_Parent";
import { List_Type_children } from "./List_Type_children";
export const List_Type = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/facteur/ajouter');
  };
  return (
    <>
      <main className="mt-4">
        <Tabs defaultValue="Tout">
          <div className="flex items-center mb-4">
            <TabsList>
              <TabsTrigger value="Tout">Tout</TabsTrigger>
              <TabsTrigger value="Parent">Parent</TabsTrigger>
              <TabsTrigger value="Hierarchie">Hierarchie</TabsTrigger>
            </TabsList>

            <div className="relative ml-auto flex items-center gap-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Recherche..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>

            <div className="relative ml-4 flex items-center gap-2">
              <Button onClick={handleClick} size="sm">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Ajouter Type a Facteur</span>
              </Button>
            </div>
          </div>
          <TabsContent value="Tout">
          <div className="text-lg font-semibold text-sapphire-700 m-3">Les types Globaux</div>

            <List_type_all/>
          </TabsContent>
          <TabsContent value="Parent">
          <div className="text-lg font-semibold text-sapphire-700 m-3">Les Parents globaux</div>
            <List_Type_Parent/>
          </TabsContent>
          <TabsContent value="Hierarchie">
          <div className="text-lg font-semibold text-sapphire-700 m-3">Les types globaux avec des enfants </div>
          <List_Type_children/>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default List_Type;
