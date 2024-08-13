import { useState } from "react";
import {
  Home,
  CalendarFold,
  Send,
  Users,
  ClipboardList,
  Building2,
  PlusCircle,
  List,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


const Navbar = () => {
  const [isFacteurOpen, setIsFacteurOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isEntrepriseOpen, setIsEntrepriseOpen] = useState(false);

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
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span>BilanCarbone</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Tableau de bord
            </Link>
            <div>
              <button
                onClick={() => toggleAccordion("facteur")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary w-full text-left"
              >
                <ClipboardList className="h-4 w-4" />
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
                      déchets
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <button
                onClick={() => toggleAccordion("customers")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary w-full text-left"
              >
                <Users className="h-4 w-4" />
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
                      to="/utilisateur/ajouter"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <PlusCircle className="h-4 w-4" />
                      ajouter un Utilisateur
                    </Link>
                    <Link
                      to="/utilisateur/liste"
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary w-full text-left"
              >
                <Building2 className="h-4 w-4" />
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
                      to="/entreprise/add" // Example path
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <PlusCircle className="h-4 w-4" />
                      ajouter Entreprise
                    </Link>
                    <Link
                      to="/entreprise"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <List className="h-4 w-4" />
                      List Entreprise
                    </Link>
                    <Link
                      to="/entreprise/trash" // Example path
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Trash2 className="h-4 w-4" />
                      déchets
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
              <Link
              to="/formulaire"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <CalendarFold className="h-4 w-4" />
              Formulaire
            </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
