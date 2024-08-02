import { Dashboard } from './Pages/Dashboard';
import { TooltipProvider } from "@/components/ui/tooltip";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Addfct } from './Pages/Facteur/Addfct';
import { Listfct } from './Pages/Facteur/Listfct';
import Trashfct from './Pages/Facteur/Trashfct';
import Main from './Static/Main';
import Affichagefct from './Pages/Facteur/Affichagefct';

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
