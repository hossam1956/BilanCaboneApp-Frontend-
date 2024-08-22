import { Dashboard } from './Pages/Dashboard';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from './Static/Main';
import { Listfct } from './Pages/Facteur/Listfct';
import { TooltipProvider } from './components/ui/tooltip';
import EntrepriseForm from './Pages/Entreprise/EntrepriseForm';
import EntrepriseList from './Pages/Entreprise/EntrepriseList';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "entreprise",
          children: [
            {
              index: true,
              element: <EntrepriseList />

            },
            {
              path: "ajouter",
              element: <EntrepriseForm />
              
            },            
          ]
          
        },
        {
          path: "facteur",
          children: [
            {  index: true, 
              element:<Listfct/>
            },
            {
              path: "ajouter",
             // element: <Addfct />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </>
  );
}

export default App;
