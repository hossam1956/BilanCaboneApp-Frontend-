import { useState, useEffect } from 'react';
import { apiClient } from "@/KeycloakConfig/KeycloakConn";
import EntrepriseForm from './EntrepriseForm';
import EntrepriseList from './EntrepriseList';

const EntrepriseManager = () => {
    const [entreprises, setEntreprises] = useState([]);

    useEffect(() => {
        const fetchEntreprises = async () => {
            try {
                const response = await apiClient.get('entreprises');  // Utilisation de apiClient
                setEntreprises(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des entreprises:', error);
            }
        };
        fetchEntreprises();
    }, []);

    return (
        <div>
            <EntrepriseForm />
            <EntrepriseList entreprises={entreprises} />
        </div>
    );
};

export default EntrepriseManager;
