import { useState, useEffect } from 'react';
import axios from 'axios';
import EntrepriseForm from './EntrepriseForm';
import EntrepriseList from './EntrepriseList';

const EntrepriseManager = () => {
    const [entreprises, setEntreprises] = useState([]);

    useEffect(() => {
        const fetchEntreprises = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/entreprises');
                setEntreprises(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des entreprises:', error);
            }
        };
        fetchEntreprises();
    }, []);

    return (
        <div>
            {/* Le composant EntrepriseForm n'a plus besoin de la prop addEntreprise */}
            <EntrepriseForm />
            <EntrepriseList entreprises={entreprises} />
        </div>
    );
};

export default EntrepriseManager;
