import keycloak from "@/KeycloakConfig/keycloak";
import { useEffect, useState } from "react";

export const useUserRole = () => {
    const [role, setRole] = useState("");
  
    useEffect(() => {
      const userRoles = keycloak.tokenParsed?.realm_access?.roles || [];
  
      if (userRoles.includes('ADMIN')) {
        setRole('ADMIN');
      } else if (userRoles.includes('EMPLOYE')) {
        setRole('EMPLOYE');
      } else if (userRoles.includes('MANAGER')) {
        setRole('MANAGER');
      } else if (userRoles.includes('RESPONSABLE')) {
        setRole('RESPONSABLE');
      } else {
        setRole('');
      }
    }, []);
  
    return { role };
  };



export const isAdmin = () => {
    const { role } = useUserRole();
    return role === "ADMIN";
  };
