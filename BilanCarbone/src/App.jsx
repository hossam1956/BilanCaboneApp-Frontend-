import { Dashboard } from './Pages/Dashboard';
import { TooltipProvider } from "@/components/ui/tooltip";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from './Static/Main';
import { Listfct } from './Pages/Facteur/Listfct';

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
              path: "ajouter",
             // element: <Addfct />,
            },
            {
              path: "trash",
              //element: <Trashfct />,
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
