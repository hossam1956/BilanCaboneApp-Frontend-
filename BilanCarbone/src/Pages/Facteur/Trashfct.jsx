import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { List_Trash_facteur } from "./Layout/List_Trash_facteur";
import { List_Trash_type } from "./Layout/List_Trash_type";
import { useSearchParams } from "react-router-dom";

const Trashfct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("type")=="tout"?"type":"facteur";

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
      <TabsContent value="facteur" className="w-full">
        <Card className="w-full bg-slate-100">
          <CardContent>
            <List_Trash_facteur/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="type" className="w-full">
        <Card className="w-full bg-slate-100">
          <CardContent>
            <List_Trash_type/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
 )
}

export default Trashfct