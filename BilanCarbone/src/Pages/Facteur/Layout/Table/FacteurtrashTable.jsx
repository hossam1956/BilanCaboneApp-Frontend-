import React,{ useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  CircleX
} from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Skeleton } from "@/Components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/Components/ui/dialog';

const FacteurtrashTable = (
    { Facteurs, loading, setSortConfig, sortConfig,handledestroy,handlerecovery }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showDialogreco, setShowDialogreco] = useState(false);


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
            handledestroy(selectedItem.id, selectedItem.nom_facteur);
        }
        setShowDialog(false);
        setSelectedItem(null);
    };

    const handleDeleteClickreco = (item) => {
        setSelectedItem(item);
        setShowDialogreco(true);
    };

    const confirmreco = () => {
        if (selectedItem) {
            handlerecovery(selectedItem.id, selectedItem.nom_facteur);
        }
        setShowDialogreco(false);
        setSelectedItem(null);
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center w-1/6 cursor-pointer "><span onClick={() => requestSort('nom')}>Nom</span> {getIconFor('nom')}</TableHead>
                        <TableHead className="text-center w-1/6 cursor-pointer "><span onClick={() => requestSort('unit')}>Unité</span> {getIconFor('unit')}</TableHead>
                        <TableHead className="text-center w-1/6 cursor-pointer  md:table-cell "><span onClick={() => requestSort('emissionFactor')}>Émission</span> {getIconFor('emissionFactor')}</TableHead>
                        <TableHead className="text-center w-1/6 cursor-pointer  md:table-cell ">Type</TableHead>
                        <TableHead className="text-center w-1/6 cursor-pointer  md:table-cell "><span onClick={() => requestSort('active')}>Activate</span> {getIconFor('active')}</TableHead>
                        <TableHead className="text-center w-1/6 cursor-pointer  md:table-cell "><span onClick={() => requestSort('createdDate')}>Date</span> {getIconFor('createdDate')}</TableHead>
                        <TableHead className="text-center w-1/6 cursor-pointer  md:table-cell "><span onClick={() => requestSort('isDeleted')}>supprimé a</span> {getIconFor('isDeleted')}</TableHead>
                        <TableHead className="text-center w-32">Actions</TableHead>
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
                                <TableCell className=" text-center font-medium">{item.nom_facteur}</TableCell>
                                <TableCell className=" text-center font-medium">{item.unit}</TableCell>
                                <TableCell className="text-center hidden md:table-cell">{item.emissionFactor}</TableCell>
                                <TableCell className="text-center hidden md:table-cell">{item.parent_type}</TableCell>
                                <TableCell className="text-center hidden sm:table-cell">
                                    <Badge variant="outline" className={item.active ? "bg-green-600  text-white" : "bg-red-600 text-white"}>
                                        {item.active ? "Activer" : "Désactiver"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center hidden md:table-cell">{item.creat_at}</TableCell>
                                <TableCell className="text-center hidden md:table-cell">{item.deleted}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem className="text-blue-600" onClick={() => handleDeleteClickreco(item)}>récupéree</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDeleteClick(item)} className="text-red-600">détruit</DropdownMenuItem>
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
                    Êtes-vous sûr de bien vouloir détruit cet élément?    
                                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={() => setShowDialog(false)}>Annuler</Button>
                        <Button variant="destructive" onClick={confirmDelete}>détruit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={showDialogreco} onOpenChange={setShowDialogreco}>
                <DialogContent>
                    <DialogTitle>Confirmer la récupération</DialogTitle>
                    <DialogDescription>
                    Êtes-vous sûr de bien vouloir récupéree cet élément?    
                                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={() => setShowDialogreco(false)}>Annuler</Button>
                        <Button className="bg-green-900 text-white hover:bg-teal-950 "  onClick={confirmreco}>récupération</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default React.memo(FacteurtrashTable);
