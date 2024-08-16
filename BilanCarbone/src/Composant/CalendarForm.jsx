import { useEffect, useState } from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { apiClient } from "@/KeycloakConfig/KeycloakConn"

const CalenderForm = ({ onClose, date }) => {
  const [types, setTypes] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [facteurs, setFacteurs] = useState([]);
  const [facteursSelected, setFacteursSelected] = useState({});

  useEffect(() => {
    fetchType();
    const storedData = JSON.parse(localStorage.getItem("dataMaps")) || {};
    setFacteursSelected(storedData);
  }, []);

  const fetchType = async () => {
    try {
      const response = await apiClient.get("/type/all");
      setTypes(response.data);
    } catch (e) {
      console.error("Error fetching types: " + e);
    }
  };

  const fetchFacteur = async (index) => {
    try {
      const response = await apiClient.get(`/facteur/all?parent=${index}`);
      setFacteurs(response.data);
    } catch (e) {
      console.error("Error fetching facteurs: " + e);
    }
  };

  const handleToggle = (index) => {
    setIsOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCheckboxChange = (id) => {
    const userId = localStorage.getItem("idUser");

    setFacteursSelected((prevFacteursSelected) => {
      const updatedFacteursSelected = { ...prevFacteursSelected };

      if (!updatedFacteursSelected[userId]) {
        updatedFacteursSelected[userId] = {};
      }
      if (!updatedFacteursSelected[userId][date]) {
        updatedFacteursSelected[userId][date] = [];
      }

      if (updatedFacteursSelected[userId][date].includes(id)) {

        updatedFacteursSelected[userId][date] = updatedFacteursSelected[userId][date].filter(
          (selectedId) => selectedId !== id
        );
      } else {

        updatedFacteursSelected[userId][date].push(id);
      }

      localStorage.setItem("dataMaps", JSON.stringify(updatedFacteursSelected));

      return updatedFacteursSelected;
    });
  };
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-1/2 h-fit">
        <div>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
              Calendrier Formulaire
            </h5>
            <div>
              <label
                htmlFor="Date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                type="date"
                name="Date"
                id="Date"
                className={`border text-black font-bold text-center text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                defaultValue={date}
                disabled
              />
            </div>
            <div>
              {types.map((type, index) => (
                <Collapsible
                  key={index}
                  open={!!isOpen[index]}
                  onOpenChange={() => handleToggle(index)}
                  className="w-full space-y-2"
                >
                  <div className="flex items-center justify-between space-x-4 px-4">
                    <h4 className="text-sm font-semibold">{type.nom_type}</h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="space-y-2">
                    {type.files.map((file, index) => (
                      <div
                        key={index}
                        className="rounded-md border px-4 py-3 font-mono text-sm w-full text-center flex justify-between"
                      >
                        <div className="flex flex-col">{file.nom_type}</div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              onClick={() => {
                                fetchFacteur(file.id);
                              }}
                              className="border border-solid bg-black text-white text-xs rounded-full h-fit"
                            >
                              <Plus />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>{file.nom_type}</DialogTitle>
                              <DialogDescription>
                                Vous pouvez ajouter des facteurs
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              {facteurs.map((facteur, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between"
                                >
                                  <input
                                    type="checkbox"
                                    id={`${index}`}
                                    className="mt-1 mx-2 w-6 h-6 checked:bg-black"
                                    onChange={() =>
                                      handleCheckboxChange(facteur.id)
                                    }
                                    checked={
                                      facteursSelected[localStorage.getItem(
                                        "idUser"
                                      )]?.[date]?.includes(facteur.id) || false
                                    }
                                  />
                                  <label
                                    htmlFor={`${index}`}
                                    className="text-xl w-full"
                                  >
                                    {facteur.nom_facteur}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Appliquer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CalenderForm;





