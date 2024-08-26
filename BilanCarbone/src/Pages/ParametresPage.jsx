import { getInfoFromToken } from "@/KeycloakConfig/UserRole";
import { useEffect, useState } from "react";
import { apiClient } from "@/KeycloakConfig/KeycloakConn";
import Page404 from "./error/Page404";
import { useNavigate } from "react-router-dom";
import Alerts from "@/Composant/Alerts";
import keycloak from "@/KeycloakConfig/keycloak";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"

import { Button } from "@/Components/ui/button";


const ParametresPages = () => {
  const navigate = useNavigate();
  if (sessionStorage.getItem("roleUser") !== "ADMIN") {
    const ID = getInfoFromToken(sessionStorage.getItem("token")).id;
    const [email, setEmail] = useState();
    const [prenom, setPrenom] = useState();
    const [nom, setNom] = useState();
    const [entrepriseId, setEntrepriseId] = useState();
    const [alert, setAlert] = useState(false);
    const [problemAlert, setProblemAlert] = useState(false);

    const fetchData = () => {
      const userInfo = getInfoFromToken(sessionStorage.getItem("token"));
      setEmail(userInfo.email);
      setPrenom(userInfo.firstName);
      setNom(userInfo.lastName);
    };

    useEffect(() => {
      fetchData();
    }, []);

    const getUserInfo = async () => {
      try {
        const response = await apiClient.get(`/utilisateur/id?ID=${ID}`);
        setEntrepriseId(response.data.entreprise.id);
      } catch (error) {
        console.error(error);
        setProblemAlert(true);
      }
    };

    useEffect(() => {
      getUserInfo();
    }, []);

    const submit = async (e) => {
      e.preventDefault();
      const bodyRequest = {
        email: email,
        firstName: prenom,
        lastName: nom,
        role: sessionStorage.getItem("roleUser"),
        entreprise_id: entrepriseId,
      };

      try {
        await apiClient.put(`/utilisateur?ID=${ID}`, bodyRequest);
        setAlert(true);
      } catch (error) {
        console.error("Erreur :" + error);
        setProblemAlert(true);
      }
    };

    useEffect(() => {
      if (problemAlert) {
        const timer = setTimeout(() => {
          setProblemAlert(false);
        }, 500);

        return () => {
          clearTimeout(timer);
        };
      }
    }, [problemAlert]);

    useEffect(() => {
      if (alert) {
        const timer = setTimeout(() => {
          setAlert(false);
          keycloak.logout()
        }, 500);

        return () => {
          clearTimeout(timer);
        };
      }
    }, [alert]);

    return (
      <div className="h-screen md:h-full">
        <div className="flex justify-center">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mt-16 mb-4">
            <form className="space-y-6" action="#">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                <a href="/" className="inline-flex text-blue-700 hover:underline dark:text-blue-500"></a>
              </div>
              <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                Profil
              </h5>
              <div>
                <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nom Utilisateur
                </label>
                <input
                  type="text"
                  name="Username"
                  id="Username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  value={getInfoFromToken(sessionStorage.getItem("token")).username}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="Prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Prenom
                </label>
                <input
                  type="text"
                  name="Prenom"
                  id="Prenom"
                  defaultValue={prenom}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  onChange={(e) => setPrenom(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="Nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nom
                </label>
                <input
                  type="text"
                  name="Nom"
                  id="Nom"
                  defaultValue={nom}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
              

              <AlertDialog className="overflow-y-auto overflow-x-auto">
              <AlertDialogTrigger asChild>
              <Button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  >
                Sauvgarder
              </Button>                                  
              </AlertDialogTrigger>                    
              <AlertDialogContent className="w-screen">
              <AlertDialogHeader>
              <AlertDialogTitle>Etes-vous absolument sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
               Vous serez déconnecté en cas de confirmation. Cela modifiera vos infos.                                      
              </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction className="bg-black hover:bg-green-700" onClick={submit}>Accepter</AlertDialogAction>
                </AlertDialogFooter>
                 </AlertDialogContent>
                 </AlertDialog>


             
            </form>
          </div>
        </div>
        <Alerts
          alert={alert}
          alertProblem={problemAlert}
          titre_succes={"Votre infos ont été modifié"}
          message_succes={"Votre infos ont été modifié avec succès"}
          message_erreur={"Une erreur est survenue lors  de l'opération"}
        />
      </div>
    );
  } else {
    return <Page404 />;
  }
};

export default ParametresPages;
