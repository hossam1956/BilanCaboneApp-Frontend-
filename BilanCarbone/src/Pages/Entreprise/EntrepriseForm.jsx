import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiClient } from "@/KeycloakConfig/KeycloakConn"

const EntrepriseForm = () => {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [type, setType] = useState('TECHNOLOGIE');
  const [bloque, setBloque] = useState(false);

  // Fonction pour récupérer les données des entreprises
  const getForm = () => {
    apiClient.get('entreprises')
      .then(response => {
        console.log("Data fetched successfully:", response.data);
        // Vous pouvez utiliser les données récupérées ici si nécessaire
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    // Appel à la fonction de récupération des données au montage du composant
    getForm();
  }, []); // Le tableau vide [] assure que cet effet est exécuté une seule fois, au montage

  const handleSubmit = async (event) => {
    event.preventDefault();
    const entreprise = { nom, adresse, type, bloque };

    try {
      const response = await apiClient.post('entreprises', entreprise);

      if (response.status === 200 || response.status === 201) {
        // Vider les champs après la création de l'entreprise
        setNom('');
        setAdresse('');
        setType('TECHNOLOGIE');
        setBloque(false);

        // Afficher un message de succès
        toast.success('Entreprise ajoutée avec succès !', { autoClose: 3000 });
      } else if (response.status === 400) {
        // Si le serveur retourne une erreur 400, afficher une alerte
        const errorMessage = response.data.message || "Erreur lors de la création de l'entreprise.";
        toast.error(errorMessage, { autoClose: 3000 });
      } else {
        console.error('Erreur lors de la création de l\'entreprise:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'entreprise:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom de l{"'"}entreprise:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Adresse de l{"'"}entreprise:</label>
          <input
            type="text"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type d{"'"}entreprise:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="TECHNOLOGIE">Technologie</option>
            <option value="SANTE">Santé</option>
            <option value="FINANCE">Finance</option>
            <option value="EDUCATION">Éducation</option>
            <option value="AUTRE">Autre</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={bloque}
              onChange={(e) => setBloque(e.target.checked)}
              className="mr-2"
            />
            Bloquer l{"'"}entreprise
          </label>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Créer l{"'"}entreprise</button>
      </form>
      
      {/* Ajout du conteneur pour les notifications */}
      <ToastContainer />
    </div>
  );
};

export default EntrepriseForm;
