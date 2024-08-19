import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  MoreHorizontal, ChevronDown, CircleX, ChevronUp
} from "lucide-react";
import {
  CardFooter,
  CardContent,
  Card,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/Components/ui/pagination";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/Components/ui/dialog";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const List_Type_Parent =({data, 
loading, 
sortConfig, 
requestSort, 
handlePageChange, 
currentPage, 
setSortConfig, 
handleDelete, 
handleActivate, 
handleDeactivate 
}) => {
const [showDeleteDialog, setShowDeleteDialog] = useState(false);
const [showActivateDialog, setShowActivateDialog] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);

const deleteSort = (key) => {
  setSortConfig(prevConfig => prevConfig.filter(e => e.key !== key));
};
const getIconFor = (key) => {
  const sortItem = sortConfig.find(e => e.key === key);
  if (!sortItem) {
    return null;
  }
  return sortItem.direction === 'asc' ? (
    <>
      <ChevronUp className="ml-2 h-4 w-4 inline" />
      <CircleX onClick={() => deleteSort(key)} className="ml-2 h-4 w-4 inline" />
    </>
  ) : (
    <>
      <ChevronDown className="ml-2 h-4 w-4 inline" />
      <CircleX onClick={() => deleteSort(key)} className="ml-2 h-4 w-4 inline" />
    </>
  );
};

const handleDeleteClick = (item) => {
  setSelectedItem(item);
  setShowDeleteDialog(true);
};

const handleActivationClick = (item) => {
  setSelectedItem(item);
  setShowActivateDialog(true);
};

const confirmDelete = () => {
  if (selectedItem) {
    handleDelete(selectedItem.id, selectedItem.nom_facteur);
  }
  setShowDeleteDialog(false);
  setSelectedItem(null);
};

const confirmActivation = (toggle) => {
  if (selectedItem) {
    handleActivate(selectedItem.id, selectedItem.nom_facteur, toggle ? "all=true" : "");
  }
  setShowActivateDialog(false);
  setSelectedItem(null);
};
const navigate = useNavigate();
const handle_affichage=(id)=>{
  navigate('/facteur/'+id);

}

return (
  <Card className="w-full">
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center cursor-pointer w-1/3"><span onClick={() => requestSort('name')}>Nom</span> {getIconFor('name')}</TableHead>
            <TableHead className="text-center cursor-pointer hidden md:table-cell w-1/3"><span onClick={() => requestSort('active')}>Activate</span> {getIconFor('active')}</TableHead>
            <TableHead className="text-center cursor-pointer hidden md:table-cell w-1/3"><span onClick={() => requestSort('createdDate')}>Date</span> {getIconFor('createdDate')}</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 2 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 3 }).map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-4 w-[70px] bg-slate-400 mx-auto" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.content && data.content.length === 0 ? (
            <TableRow>
              <TableCell colSpan="7" className="text-2xl text-center py-4">
                Pas de Type
              </TableCell>
            </TableRow>
          ) : (
            data.content.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center font-medium"><Link to={"/facteur/"+item.id}>{item.nom_type}</Link></TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  <Badge variant="outline" className={item.active ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                    {item.active ? "Activer" : "Désactiver"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">{item.create}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="text-blue-600" onClick={()=>{handle_affichage(item.id)}}>Afficher</DropdownMenuItem>
                      {item.active ? (
                        <DropdownMenuItem onClick={() => handleDeactivate(item.id, item.nom_facteur)} className="text-red-950">Désactiver</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleActivationClick(item)} className="text-green-600">Activer</DropdownMenuItem>
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
    </CardContent>
    <CardFooter className="flex items-center justify-between">
      {loading ? (
        <Skeleton className="h-4 w-full bg-slate-200" />
      ) : (
        <>
          <div className="text-xs text-muted-foreground">
            Affichage <strong>{data.number * data.size + 1}-{Math.min((data.number + 1) * data.size, data.totalElements)}</strong> de <strong>{data.totalElements}</strong> Facteurs
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => handlePageChange(Math.max(currentPage - 1, 0))} />
              </PaginationItem>
              {Array.from({ length: data.totalPages }).map((_, pageIndex) => (
                <PaginationItem key={pageIndex}>
                  <PaginationLink href="#" onClick={() => handlePageChange(pageIndex)}>{pageIndex + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={() => handlePageChange(Math.min(currentPage + 1, data.totalPages - 1))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </CardFooter>
    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <DialogContent>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogDescription>
          Êtes-vous sûr de bien vouloir supprimer cet élément?    
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setShowDeleteDialog(false)}>Annuler</Button>
          <Button variant="destructive" onClick={confirmDelete}>Supprimer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog open={showActivateDialog} onOpenChange={setShowActivateDialog}>
      <DialogContent>
        <DialogTitle>Activation</DialogTitle>
        <DialogDescription>
          Comment voulez-vous activer?
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setShowActivateDialog(false)}>Annuler</Button>
          <Button className="bg-green-600 text-white hover:bg-green-300 hover:text-black" onClick={() => confirmActivation(0)}>Seulement</Button>
          <Button className="bg-emerald-900 text-white hover:bg-green-300 hover:text-black" onClick={() => confirmActivation(1)}>Tous avec des enfants</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Card>
);
};
export default React.memo(List_Type_Parent)