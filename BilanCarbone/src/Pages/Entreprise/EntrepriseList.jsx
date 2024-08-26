import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiClient } from "@/KeycloakConfig/KeycloakConn"
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

const EntrepriseList = () => {
  const [entreprises, setEntreprises] = useState([]);
  const [editEntrepriseId, setEditEntrepriseId] = useState(null);
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [type, setType] = useState('');
  const [bloque, setBloque] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [deleteEntrepriseId, setDeleteEntrepriseId] = useState(null);

  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const response = await apiClient.get('entreprises');
        if (response.status === 200) {
          setEntreprises(response.data);
        } else {
          console.error('Erreur lors de la récupération des entreprises:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des entreprises:', error);
      }
    };
    fetchEntreprises();
  }, []);

  const startEditing = (entreprise) => {
    setEditEntrepriseId(entreprise.id);
    setNom(entreprise.nom);
    setAdresse(entreprise.adresse);
    setType(entreprise.type);
    setBloque(entreprise.bloque);
  };

  const cancelEditing = () => {
    setEditEntrepriseId(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    const updatedEntreprise = { nom, adresse, type, bloque };
  
    try {
      const response = await apiClient.put(`entreprises/${editEntrepriseId}`, updatedEntreprise);
  
      if (response.status === 200) {
        setEntreprises(entreprises.map((entreprise) =>
          entreprise.id === editEntrepriseId ? { ...entreprise, nom, adresse, type, bloque } : entreprise
        ));
        setEditEntrepriseId(null);
  
        toast.success("Entreprise mise à jour avec succès !");
      } else {
        console.error('Erreur lors de la mise à jour de l\'entreprise:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'entreprise:', error);
    }
  };
  
  const handleDelete = async () => {
    if (deleteEntrepriseId) {
      try {
        const response = await apiClient.delete(`entreprises/${deleteEntrepriseId}`);
        if (response.status === 200) {
          setEntreprises(entreprises.filter((entreprise) => entreprise.id !== deleteEntrepriseId));
          setDeleteEntrepriseId(null);

          toast.success("Entreprise supprimée avec succès !");
        } else {
          console.error('Erreur lors de la suppression de l\'entreprise:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'entreprise:', error);
      }
    }
  };

  const filteredEntreprises = entreprises.filter((entreprise) =>
    entreprise.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Première colonne : Barre de recherche et la liste des entreprises */}
      <div className="col-span-2">
        <h2 className="text-xl font-bold">Liste des entreprises</h2>

        <input
          type="text"
          placeholder="Rechercher par nom"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full mb-4"
        />

        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left font-semibold">Nom</th>
              <th className="p-2 text-left font-semibold">Adresse</th>
              <th className="p-2 text-left font-semibold">Type</th>
              <th className="p-2 text-left font-semibold">Statut</th>
              <th className="p-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntreprises.map((entreprise) => (
              <tr key={entreprise.id} className="border-t">
                <td className="p-2">
                  {editEntrepriseId === entreprise.id ? (
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      className="p-1 border border-gray-300 rounded w-full"
                    />
                  ) : (
                    entreprise.nom
                  )}
                </td>
                <td className="p-2">
                  {editEntrepriseId === entreprise.id ? (
                    <input
                      type="text"
                      value={adresse}
                      onChange={(e) => setAdresse(e.target.value)}
                      className="p-1 border border-gray-300 rounded w-full"
                    />
                  ) : (
                    entreprise.adresse
                  )}
                </td>
                <td className="p-2">
                  {editEntrepriseId === entreprise.id ? (
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="p-1 border border-gray-300 rounded w-full"
                    >
                      <option value="TECHNOLOGIE">Technologie</option>
                      <option value="SANTE">Santé</option>
                      <option value="FINANCE">Finance</option>
                      <option value="EDUCATION">Éducation</option>
                      <option value="AUTRE">Autre</option>
                    </select>
                  ) : (
                    entreprise.type
                  )}
                </td>
                <td className="p-2">
                  {editEntrepriseId === entreprise.id ? (
                    <select
                      value={bloque ? 'true' : 'false'}
                      onChange={(e) => setBloque(e.target.value === 'true')}
                      className="p-1 border border-gray-300 rounded w-full"
                    >
                      <option value="false">Actif</option>
                      <option value="true">Bloqué</option>
                    </select>
                  ) : (
                    entreprise.bloque ? 'Bloqué' : 'Actif'
                  )}
                </td>
                <td className="p-2 flex space-x-2">
                  {editEntrepriseId === entreprise.id ? (
                    <>
                      <button
                        onClick={handleEditSubmit}
                        className="text-green-500 hover:underline"
                      >
                        Enregistrer
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-red-500 hover:underline"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(entreprise)}
                        className="text-blue-500 hover:underline"
                      >
                        Éditer
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => setDeleteEntrepriseId(entreprise.id)}
                          >
                            Supprimer
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action ne peut pas être annulée. Cette entreprise sera définitivement supprimée.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Continuer</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deuxième colonne : Actions supplémentaires ou autre contenu */}
      <div className="col-span-1">
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Actions supplémentaires</h3>
          <p className="mt-2 text-sm text-gray-600">
            Ici, vous pouvez ajouter d{"'"}autres actions, des filtres ou toute autre information pertinente.
          </p>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

EntrepriseList.propTypes = {
  entreprises: PropTypes.array,
  setEntreprises: PropTypes.func,
};

export default EntrepriseList;
