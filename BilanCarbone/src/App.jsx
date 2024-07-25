import React from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import keycloak from './KeycloakConfig/keycloak';
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import LandingPage from "./Pages/LandingPage"
import { LoaderCircle } from 'lucide-react';
import RegisterPage from './Pages/RegisterPage';

const App = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return(
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle size={60} strokeWidth={2.75} className='animate-spin' />
      </div>
    )
  }

  /*if (!keycloak.authenticated) {
    keycloak.login();
    const token=keycloak.token
    localStorage.setItem(token)
    
  }*/
  const router = createBrowserRouter([
    {
      path:"/",
      element:keycloak.authenticated ? <Navigate to="/dashboard"/> : <LandingPage/>
    },
    {
      path:"/register",
      element:keycloak.authenticated ? <Navigate to="/dashboard"/> : <RegisterPage/>
    }
    ,{
      path:"/dashboard",
      element:keycloak.authenticated ? <Dashboard/> : <Navigate to="/"/>
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