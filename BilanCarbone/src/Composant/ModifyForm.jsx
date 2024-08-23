import { useState,useEffect } from "react";
import {validateWithoutPassword} from "@/Validation/RegexValidation";
import { Eye,EyeOff } from "lucide-react";
import axios from "axios";
import { apiClient } from "@/KeycloakConfig/KeycloakConn";
import Alerts from "@/Composant/Alerts";
import { Checkbox } from "@/Components/ui/checkbox";
const ModifyForm=({onClose,UtilisateurInfo,UtilisateurRole})=>{
  const [email, setEmail] = useState(UtilisateurInfo.userRepresentation.email);
  const [prenom, setPrenom] = useState(UtilisateurInfo.userRepresentation.firstName);
  const [nom, setNom] = useState(UtilisateurInfo.userRepresentation.firstName);
  const [errors, setErrors] = useState({});
  const [role,setRole]=useState('MANAGER')
  const [entreprises,setEntreprises]=useState([])
  const [entreprise,setEntreprise]=useState(UtilisateurInfo.entreprise.id)
  const [alert,setAlert]=useState(false)
  const [problemAlert,setProblemAlert]=useState(false)

  
  useEffect(() => {
    const getEntreprises = async () => {
      try{
        const response = await apiClient.get('/entreprise');
      setEntreprises(response.data);
      }
      catch(error){
        console.error(error)
        setProblemAlert(true);
      }
      
    };
    
    getEntreprises();
   
  }, []);

  
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  
  const handleEntrepriseChange = (e) => {
    setEntreprise(e.target.value);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();

    const validationErrors=validateWithoutPassword({email,prenom,nom});

    
   
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }
    else{
      setErrors({});
      const bodyRequest={
        email: email,
        firstName: prenom,
        lastName: nom,
        role : role,
        entreprise_id:entreprise
        }
      console.log(bodyRequest)
      const update=async()=>{
        const response=await apiClient.put(`/utilisateur?ID=${UtilisateurInfo.userRepresentation.id}`,bodyRequest)
        setAlert(true)
      }
      try{
        update()}
        catch(error){
          console.error("Erreur :"+error)
        }
      
    }
  }
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(false);
        onClose() 

      }, 500);

      return () => {clearTimeout(timer)}
    }
  }, [alert]);

    return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-1/3 h-fit">
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
         &times;
        </button>
        <div>            
        <form className="space-y-6" action="#" >
          <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
              Modification du compte
          </h5>
            <div>
              <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nom Utilisateur
              </label>
              <input
                type="text"
                name="Username"
                id="Username"
                className={`${errors.username ?"border-red-600 bg-red-300":"border-gray-300 bg-gray-50"} border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                value={UtilisateurInfo.userRepresentation.username}
                required
                disabled
               />
            </div>
            <div>
              <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="text"
                name="Email"
                id="Email"
                className={`${errors.email ?"border-red-600 bg-red-300":"border-gray-300 bg-gray-50"} border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                defaultValue={UtilisateurInfo.userRepresentation.email}
                required
                autoComplete="off"
                onChange={(e)=>{setEmail(e.target.value)}}
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
                defaultValue={UtilisateurInfo.userRepresentation.firstName}
                className={`${errors.prenom ?"border-red-600 bg-red-300":"border-gray-300 bg-gray-50"} border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                required
                onChange={(e)=>{setPrenom(e.target.value)}}
              />
               {errors.prenom && <p className='text-red-500 text-xs text-center'>{errors.prenom}</p>}

            </div>
            <div>
              <label htmlFor="Nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nom
              </label>
              <input
                type="text"
                name="Nom"
                id="Nom"
                defaultValue={UtilisateurInfo.userRepresentation.lastName}
                className={`${errors.prenom ?"border-red-600 bg-red-300":"border-gray-300 bg-gray-50"} border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                required
                onChange={(e)=>{setNom(e.target.value)}}
              />
              {errors.nom && <p className='text-red-500 text-xs text-center'>{errors.nom}</p>}

            </div>
            
            <div>
              <label htmlFor="roles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Choisir un rôle
              </label>
              <select
                id="roles"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleRoleChange}
                defaultValue={`${UtilisateurRole}`}
                
                        
              >
                <option value="MANAGER">Admin Entreprise(MANAGER)</option>
                <option value="RESPONSABLE">Responsable</option>
                <option value="EMPLOYE">Employe</option>
              </select>
            </div>

            <div>
              <label htmlFor="entreprise" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Choisir Entreprise
              </label>
              <select
                id="entreprise"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleEntrepriseChange}
              >
                {
                  entreprises.map((entrepriseInfo)=>{
                    const {id,nomEntreprise}=entrepriseInfo
                    return(
                      <option key={id} value={`${id}`} selected={id==UtilisateurInfo.entreprise.id} >{nomEntreprise}</option>
                    )
                  })
                  
                }
                
              </select>
            </div>
   
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
          >
              Appliquer
            </button>
        </form>


        </div>
      </div>
      <Alerts alert={alert} alertProblem={problemAlert} titre_succes={"Utilisateur Modifier"} message_succes={"Utilisateur Modifier avec succès" } message_erreur={"Une erreur est survenue lors de l'opération"}/>
    </div>  
    )
}
export default ModifyForm