import React, { useState } from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import keycloak from './KeycloakConfig/keycloak';
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import Dashboard from "./Pages/Dashboard"
import ListDemandePage from './Pages/ListeDemandePage';
import LandingPage from "./Pages/LandingPage"
import { LoaderCircle } from 'lucide-react';
import RegisterPage from './Pages/RegisterPage';
import Main from './Static/Main';
import ParametresPages from './Pages/ParametresPage';
import ListeUtilisateur from './Pages/ListeUtilisateur';
import AddUtilisateurPage from './Pages/AddUtilisateurPage';
import { TooltipProvider } from "@/Components/ui/tooltip";
import { Addfct } from './Pages/Facteur/Addfct';
import { Listfct } from './Pages/Facteur/Listfct';
import Trashfct from './Pages/Facteur/Trashfct';
import Affichagefct from './Pages/Facteur/Affichagefct';
import Page404 from './Pages/error/Page404';
import { getRolesFromToken } from './KeycloakConfig/UserRole';
import NoAutorisePage from './Pages/NoAutorisePage';
import FormulaireEmloye from './Pages/FormulaireEmploye';


const App = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return(
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle size={60} strokeWidth={2.75} className='animate-spin' />
      </div>
    )
  }



  if(keycloak.authenticated){
    
    sessionStorage.setItem('token',keycloak.token)
    sessionStorage.setItem('refresh_token',keycloak.refreshToken)
    const roles=getRolesFromToken(sessionStorage.getItem("token"))
    if(roles.includes("ADMIN")){sessionStorage.setItem('roleUser','ADMIN')}
    else if(roles.includes("MANAGER")){sessionStorage.setItem('roleUser','MANAGER')}
    else if(roles.includes("RESPONSABLE")){sessionStorage.setItem('roleUser','RESPONSABLE')}
    else if(roles.includes("EMPLOYE")){sessionStorage.setItem('roleUser','EMPLOYE')}
    
  }
  else{
    sessionStorage.setItem('token',undefined)
  }
  const router = createBrowserRouter([
    {
      path:"/welcome",
      element:keycloak.authenticated ? <Navigate to="/"/> : <LandingPage/>
    },
    {
      path:"/register",
      element:keycloak.authenticated ? <Navigate to="/"/> : <RegisterPage/>
    }
    ,{
      path:"/",
      element:keycloak.authenticated ? <Main/> : <Navigate to="/welcome"/>,
      children:[
        {
            index:true,
            element:<Dashboard/>
        },
        {
          path:"/formulaire",
          element:keycloak.authenticated ? <FormulaireEmloye/> : <Navigate to="/welcome"/>,
          
        },
        {
          path:"parameter",
          element:<ParametresPages/>
        },
        {
          path:"utilisateur",
          children:[
            { 
              path:"ajouter",
              element:(sessionStorage.getItem("roleUser")=="ADMIN" || sessionStorage.getItem("roleUser")=="MANAGER")?<AddUtilisateurPage/>:<NoAutorisePage/>
            },
            {

              path:"liste",
              element:(sessionStorage.getItem("roleUser")=="ADMIN" || sessionStorage.getItem("roleUser")=="MANAGER")?<ListeUtilisateur/>:<NoAutorisePage/>
            },
            { 
              path:"demandes",
              element:(sessionStorage.getItem("roleUser")=="ADMIN" || sessionStorage.getItem("roleUser")=="MANAGER")?<ListDemandePage/>:<NoAutorisePage/>
            }
          ],
        },
          {
              path: "facteur",
              children: [
                {  index: true,
                    element:(sessionStorage.getItem("roleUser")=="ADMIN" || sessionStorage.getItem("roleUser")=="MANAGER")?<Listfct/>:<NoAutorisePage/>
                },
                {
                    path: ":id",
                    element:(sessionStorage.getItem("roleUser")=="ADMIN" || sessionStorage.getItem("roleUser")=="MANAGER")?<Affichagefct/>:<NoAutorisePage/>,
                },
                {
                    path: "ajouter",
                    element:(sessionStorage.getItem("roleUser")=="ADMIN" || sessionStorage.getItem("roleUser")=="MANAGER")?<Addfct />:<NoAutorisePage/>,
                },
                {
                    path: "trash",
                    element:(sessionStorage.getItem("roleUser")=="ADMIN" || sessionStorage.getItem("roleUser")=="MANAGER")?<Trashfct />:<NoAutorisePage/>,
                },
            ],
          },
      ],
    },
    
    {
      path: "*", // Catch-all route for 404 errors
      element: <Page404 />
    }
  ]);

  return (
    <TooltipProvider>
          <RouterProvider router={router}/>
    </TooltipProvider>
  );
};

const WrappedApp = () => {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <App />
    </ReactKeycloakProvider>
  );
};



export default WrappedApp;