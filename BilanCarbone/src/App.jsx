import React from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import keycloak from './KeycloakConfig/keycloak';
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import Dashboard from "./Pages/Dashboard"
import LandingPage from "./Pages/LandingPage"
import { LoaderCircle } from 'lucide-react';
import RegisterPage from './Pages/RegisterPage';
import Main from './Static/Main';
import ListDemandePage from './Pages/ListeDemandePage';
import ParametresPages from './Pages/ParametresPage';
import ListeUtilisateur from './Pages/ListeUtilisateur';

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
              path:"liste",
              element:<ListeUtilisateur/>
            },
            { 
              path:"demandes",
              element:<ListDemandePage/>
            }
          ]
        }

      ]
    }
  ])

  return (
      <RouterProvider router={router}/>
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