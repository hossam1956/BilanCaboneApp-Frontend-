import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card ,CardHeader,CardContent,CardTitle} from '@/Components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/Components/ui/table"
 
import { Button } from '@/Components/ui/button';
import { ArchiveRestore } from 'lucide-react';
import { apiClient } from '@/KeycloakConfig/KeycloakConn';

const DeletedEntrepriseList = () => {
    const [deletedEntreprises, setDeletedEntreprises] = useState([]);

    useEffect(() => {
        const fetchDeletedEntreprises = async () => {
            try {
                const response = await apiClient.get('/entreprises/deleted');
                const sortedEntreprises = response.data.sort((a, b) => a.nom.localeCompare(b.nom));
                setDeletedEntreprises(sortedEntreprises);
            } catch (error) {
                console.error('Erreur lors de la récupération des entreprises supprimées:', error);
            }
        };

        fetchDeletedEntreprises();
    }, []);

    const restoreEntreprise = async (id) => {
        try {
            await apiClient.put(`/entreprises/${id}/restore`);
            setDeletedEntreprises(deletedEntreprises.filter((entreprise) => entreprise.id !== id));
        } catch (error) {
            console.error('Erreur lors de la restauration de l\'entreprise:', error);
        }
    };

    return (
        <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Entreprises supprimées</CardTitle>                    
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className=" sm:table-cell text-center ">Nom</TableHead>
                          <TableHead className=" sm:table-cell text-center ">
                          Adresse
                          </TableHead>
                          <TableHead className=" sm:table-cell text-center ">
                          Action
                          </TableHead>
                          
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                    {deletedEntreprises.length > 0 ? (
                        deletedEntreprises.map((entreprise) => (
                            <TableRow key={entreprise.id} className="bg-accent hover:bg-gray-50">
                                <TableCell className="sm:table-cell text-center ">{entreprise.nom}</TableCell>
                                <TableCell className="sm:table-cell text-center ">{entreprise.adresse}</TableCell>
                                <TableCell className="sm:table-cell text-center ">
                                    <Button variant="secondary"
                                        onClick={() => restoreEntreprise(entreprise.id)}
                                        className=" text-black px-4 py-2 rounded transition duration-300"
                                    >
                                        <ArchiveRestore className="mr-2" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="3" className="text-center py-4">
                                Aucune entreprise supprimée trouvée
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                    </Table>
                  </CardContent>
                </Card>

    );
};

export default DeletedEntrepriseList;
