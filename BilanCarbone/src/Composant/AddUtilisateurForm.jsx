import { useState,useEffect } from "react";
import {validate,validateWithoutPassword} from "@/Validation/RegexValidation";
import { Eye,EyeOff } from "lucide-react";
import { apiClient } from "@/KeycloakConfig/KeycloakConn";
import Alerts from "@/Composant/Alerts";
import { useNavigate } from "react-router-dom";
const AddUtilisateurForm=()=>{
  const navigate=useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [role,setRole]=useState('MANAGER')
  const [entreprises,setEntreprises]=useState([])
  const [entreprise,setEntreprise]=useState(entreprises.length > 0 ? entreprises[0].id:1)
  const [showPassword,setShowPassword]=useState(false)
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

  const handleShowPassword=()=>{
    setShowPassword(!showPassword)
  }
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  
  const handleEntrepriseChange = (e) => {
    setEntreprise(e.target.value);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();

    const validationErrors=validate({username,email,prenom,nom,password,confirmPassword});

    
   
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
    }
    else{
      setErrors({});
      const bodyRequest={
        username: username,
        email: email,
        firstName: prenom,
        lastName: nom,
        role: role,
        password: password,
        entreprise_id: entreprise

      }
      try{
          const createUtilisateur=async()=>{
            const response=await apiClient.post('/utilisateur',bodyRequest)
            setAlert(true)
          }
          createUtilisateur()
      }
      catch(error){
        console.error(error)
      }
    }
  }
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(false);
        navigate('../../utilisateur/liste')
      }, 500);

      return () => {clearTimeout(timer)}
    }
  }, [alert]);
    return(
    <div className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-1/2">
        <div>            
        <form className="space-y-6" action="#" >
          <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
              Création d'un compte
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
                required
                onChange={(e)=>{setUsername(e.target.value)}}
               />
               {errors.username && <p className='text-red-500 text-xs text-center'>{errors.username}</p>}
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
                required
                autoComplete="off"
                onChange={(e)=>{setEmail(e.target.value)}}
              />
              </div>
               {errors.email && <p className='text-red-500 text-xs text-center'>{errors.email}</p>}

            
            <div>
              <label htmlFor="Prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Prenom
              </label>
              <input
                type="text"
                name="Prenom"
                id="Prenom"
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
                      <option key={id} value={`${id}`}>{nomEntreprise}</option>
                    )
                  })
                  
                }
                
              </select>
            </div>
            
              <div>
                <div>
                  <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nouveau Mot de passe
                  </label>
                  <div className='flex justify-between'>
                    <input
                      type={showPassword?"text":"password"}
                      name="Password"
                      id="Password"
                      placeholder="••••••••"
                      className={`${errors.password ?"border-red-600 bg-red-300":"border-gray-300 bg-gray-50"} border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                      autoComplete="new-password"
                      onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <button type="button" className='ml-7 mr-0' onClick={handleShowPassword}>{showPassword?<EyeOff/>:<Eye/>}</button>
                  </div>
                  {errors.password && <p className='text-red-500 text-xs text-center'>{errors.password}</p>}
                </div>
                <div>
                  <label htmlFor="Confi_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirmer le Mot de Passe
                  </label>

                  <input
                    type="password"
                    name="Confi_password"
                    id="Confi_password"
                    placeholder="••••••••"
                    className={`${errors.confirmPassword ?"border-red-600 bg-red-300":"border-gray-300 bg-gray-50"} border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                    autoComplete="new-password"
                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
                  />
                  {errors.confirmPassword && <p className='text-red-500 text-xs text-center'>{errors.confirmPassword}</p>}
                </div>
              </div> 
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
          >
              Créer
            </button>
        </form>


        </div>
      </div>
      <Alerts alert={alert} alertProblem={problemAlert} titre_succes={"Utilisateur Ajouté"} message_succes={"Utilisateur Ajouté avec succès" } message_erreur={"Une erreur est survenue lors de l'envoi de l'opération"}/>
    </div>  
    )
}
export default AddUtilisateurForm