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
import  List_Facteur  from "./Layout/List_Facteur";
import List_Type from "./Layout/List_Type";

export function Listfct() {

  return (
    <Tabs defaultValue="Facteur" className="w-full">
      <TabsList className="grid w-full grid-cols-2 border-b">
        <TabsTrigger value="Facteur" className="w-full text-center">
          Facteur
        </TabsTrigger>
        <TabsTrigger value="Type" className="w-full text-center">
          Type
        </TabsTrigger>
      </TabsList >
      <TabsContent value="Facteur" >
        <Card className="w-full bg-slate-100">
          <CardContent>
            <List_Facteur/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Type" className="w-full">
      <Card className="w-full bg-slate-100">
      <CardContent>
            <List_Type/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
