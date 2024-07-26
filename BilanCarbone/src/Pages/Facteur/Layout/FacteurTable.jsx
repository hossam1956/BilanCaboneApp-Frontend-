import React,{ useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  CircleX
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const FacteurTable = React.memo(({ Facteurs, loading, setSortConfig, sortConfig, handledeletesoft, handleactivate, handledesactivate }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const deletesort = (key) => {
        setSortConfig(prevConfig => prevConfig.filter(e => e.key !== key));
    };

    const getIconFor = key => {
        const sortItem = sortConfig.find(e => e.key === key);
        if (!sortItem) {
            return null;
        }
        return sortItem.direction === 'asc' ? (
            <>
                <ChevronUp className="ml-2 h-4 w-4 inline" />
                <CircleX onClick={() => deletesort(key)} className="ml-2 h-4 w-4 inline" />
            </>
        ) : (
            <>
                <ChevronDown className="ml-2 h-4 w-4 inline" />
                <CircleX onClick={() => deletesort(key)} className="ml-2 h-4 w-4 inline" />
            </>
        );
    };

    const requestSort = key => {
        setSortConfig(prevConfig => {
            const existingConfigIndex = prevConfig.findIndex(e => e.key === key);
            let newConfig = [...prevConfig];

            if (existingConfigIndex !== -1) {
                let direction = newConfig[existingConfigIndex].direction === 'asc' ? 'desc' : 'asc';
                newConfig[existingConfigIndex] = { key, direction };
            } else {
                newConfig.push({ key, direction: 'asc' });
            }
            return newConfig;
        });
    };

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setShowDialog(true);
    };

    const confirmDelete = () => {
        if (selectedItem) {
            handledeletesoft(selectedItem.id, selectedItem.nom_facteur);
        }
        setShowDialog(false);
        setSelectedItem(null);
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="cursor-pointer w-48"><span onClick={() => requestSort('nom')}>Nom</span> {getIconFor('nom')}</TableHead>
                        <TableHead className="cursor-pointer w-32"><span onClick={() => requestSort('unit')}>Unité</span> {getIconFor('unit')}</TableHead>
                        <TableHead className="cursor-pointer hidden md:table-cell w-32"><span onClick={() => requestSort('emissionFactor')}>Émission</span> {getIconFor('emissionFactor')}</TableHead>
                        <TableHead className="cursor-pointer hidden md:table-cell w-24">Type</TableHead>
                        <TableHead className="cursor-pointer hidden md:table-cell w-32"><span onClick={() => requestSort('active')}>Activate</span> {getIconFor('active')}</TableHead>
                        <TableHead className="cursor-pointer hidden md:table-cell w-48"><span onClick={() => requestSort('createdDate')}>Date</span> {getIconFor('createdDate')}</TableHead>
                        <TableHead className="w-32">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <>
                            {[...Array(2)].map((_, index) => (
                                <TableRow key={index}>
                                    {[...Array(7)].map((_, cellIndex) => (
                                        <TableCell key={cellIndex}>
                                            <Skeleton className="h-4 w-[70px] bg-slate-400 mx-auto" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </>
                    ) : Facteurs.content && Facteurs.content.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan="7" className="text-2xl text-center py-4">
                                Pas de Facteurs
                            </TableCell>
                        </TableRow>
                    ) : (
                        Facteurs.content.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.nom_facteur}</TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell className="hidden md:table-cell">{item.emissionFactor}</TableCell>
                                <TableCell className="hidden md:table-cell">{item.type}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge variant="outline" className={item.active ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                                        {item.active ? "Activer" : "Désactiver"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{item.creat_at}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem className="text-blue-600">Afficher</DropdownMenuItem>
                                            <DropdownMenuItem className="text-orange-600">Modifier</DropdownMenuItem>
                                            {item.active ? (
                                                <DropdownMenuItem onClick={() => handledesactivate(item.id, item.nom_facteur)} className="text-red-950">Désactiver</DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem onClick={() => handleactivate(item.id, item.nom_facteur)} className="text-green-600">Activer</DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem onClick={() => handleDeleteClick(item)} className="text-red-600">Supprimer</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent>
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                    <DialogDescription>
                    Êtes-vous sûr de bien vouloir supprimer cet élément?    
                                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={() => setShowDialog(false)}>Annuler</Button>
                        <Button variant="destructive" onClick={confirmDelete}>Supprimer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
});

export default FacteurTable;
