import React from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import keycloak from './KeycloakConfig/keycloak';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import NavBar from './Components/SideBar';
import { LoaderCircle } from 'lucide-react';

const App = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return(
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle size={60} strokeWidth={2.75} className='animate-spin' />
      </div>
    )
  }

  if (!keycloak.authenticated) {
    keycloak.login();
  }
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Dashboard/>
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
