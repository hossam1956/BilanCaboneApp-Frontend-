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



const App = () => {
  const [reload,setReload]=useState(true)
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
    sessionStorage.getItem('token').length>10?console.log("token is present"):window.location.reload()
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
          path:"parameter",
          element:<ParametresPages/>
        },
        {
          path:"utilisateur",
          children:[
            { 
              path:"ajouter",
              element:<AddUtilisateurPage/>
            },
            {

              path:"liste",
              element:<ListeUtilisateur/>
            },
            { 
              path:"demandes",
              element:<ListDemandePage/>
            }
          ],
        },
          {
              path: "facteur",
              children: [
                {  index: true,
                    element:<Listfct/>
                },
                {
                    path: ":id",
                    element: <Affichagefct/>,
                },
                {
                    path: "ajouter",
                    element: <Addfct />,
                },
                {
                    path: "trash",
                    element: <Trashfct />,
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