import { useState } from "react";
import {
  Home,
  CalendarFold,
  PlugZap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


const NavbarEmployeResponsable = () => {
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
            <Link
              to="/formulaire"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <CalendarFold className="h-4 w-4" />
              Formulaire
            </Link>
            
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavbarEmployeResponsable;
