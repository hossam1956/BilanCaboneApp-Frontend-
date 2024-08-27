import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircleUser,
  Home,
  Building2,
  Menu,
  ClipboardList,
  Package2,
  Search,
  Send,
  Users,
  PlusCircle,
  List,
  Trash2,
  CalendarFold,
  PlugZap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Link } from "react-router-dom";
import keycloak from "@/KeycloakConfig/keycloak";
import { SearchContext } from "./SearchProvider";
import { isAdmin, isRESPONSABLE } from "@/hooks/useUserRole";


const Navheaderempl = () => {
  const navigate=useNavigate()
  const [isFacteurOpen, setIsFacteurOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isEntrepriseOpen, setIsEntrepriseOpen] = useState(false);
  
  const toggleAccordion = (section) => {
    if (section === "facteur") setIsFacteurOpen(!isFacteurOpen);
    if (section === "customers") setIsCustomersOpen(!isCustomersOpen);
    if (section === "entreprise") setIsEntrepriseOpen(!isEntrepriseOpen);
  };
  const isRESPONSABLEUser = isRESPONSABLE();
  const isAdminuser =isAdmin()
  const accordionVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
            <Link
              to="/"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              Tableau de bord
            </Link>
            {(isRESPONSABLEUser)&&(
            <Link
              to="/"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <PlugZap className="h-4 w-4"  />
              Consommation d'entreprise
            </Link>)}
            <Link
              to="/formulaire"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <CalendarFold className="h-4 w-4" />
              Formulaire
            </Link>
            
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
       
      </div>
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>{keycloak.tokenParsed.preferred_username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(!isAdminuser)&&
            <DropdownMenuItem onClick={()=>{navigate("parameter")}}>Profile</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>{keycloak.logout();sessionStorage.setItem('token', undefined);}}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
      </DropdownMenu>
    </header>
    );
};
export default Navheaderempl