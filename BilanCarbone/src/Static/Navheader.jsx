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


const Navheader = () => {
  const navigate=useNavigate()
  const [isFacteurOpen, setIsFacteurOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isEntrepriseOpen, setIsEntrepriseOpen] = useState(false);

  const { searchValue, handleSearching } = useContext(SearchContext);


  const toggleAccordion = (section) => {
    if (section === "facteur") setIsFacteurOpen(!isFacteurOpen);
    if (section === "customers") setIsCustomersOpen(!isCustomersOpen);
    if (section === "entreprise") setIsEntrepriseOpen(!isEntrepriseOpen);
  };

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
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Bilan de Carbon</span>
            </Link>
            <Link
              to="/"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Tableau de bord
            </Link>

            <div>
              <button
                onClick={() => toggleAccordion("facteur")}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground w-full text-left"
              >
                <ClipboardList className="h-5 w-5" />
                Facteur Global
              </button>
              <AnimatePresence initial={false}>
                {isFacteurOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={accordionVariants}
                    transition={{ duration: 0.3 }}
                    className="pl-6 mt-2 overflow-hidden"
                  >
                    <Link
                      to="/facteur/ajouter"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Ajouter Facteur
                    </Link>
                    <Link
                      to="/facteur"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <List className="h-4 w-4" />
                      List Facteur
                    </Link>
                    <Link
                      to="/facteur/trash"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Trash2 className="h-4 w-4" />
                      poubelle
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <button
                onClick={() => toggleAccordion("customers")}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground w-full text-left"
              >
                <Users className="h-5 w-5" />
                Utilisateur
              </button>
              <AnimatePresence initial={false}>
                {isCustomersOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={accordionVariants}
                    transition={{ duration: 0.3 }}
                    className="pl-6 mt-2 overflow-hidden"
                  >
                     <Link
                      to="/"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <PlusCircle className="h-4 w-4" />
                      ajouter un Utilisateur
                    </Link>
                    <Link
                      to="/"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <List className="h-4 w-4" />
                      Liste des Utilisateurs
                    </Link>
                    <Link
                      to="/utilisateur/demandes"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Send className="h-4 w-4" />
                      Liste des demandes
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <button
                onClick={() => toggleAccordion("entreprise")}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground w-full text-left"
              >
                <Building2 className="h-5 w-5" />
                Entreprise
              </button>
              <AnimatePresence initial={false}>
                {isEntrepriseOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={accordionVariants}
                    transition={{ duration: 0.3 }}
                    className="pl-6 mt-2 overflow-hidden"
                  >
                    <Link
                      to="/entreprise/ajouter"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Ajouter Entreprise
                    </Link>
                    <Link
                      to="/entreprise"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <List className="h-4 w-4" />
                      List Entreprise
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              onChange={handleSearching}
              type="search"
              placeholder="Que voulez vous ?"
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
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
          {(sessionStorage.getItem("roleUser")!="ADMIN")&&
          <DropdownMenuItem onClick={()=>{navigate("parameter")}}>Profile</DropdownMenuItem>}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>{keycloak.logout();sessionStorage.setItem('token', undefined);}}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
export default Navheader