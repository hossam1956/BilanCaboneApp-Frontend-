import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MoreHorizontal, ChevronDown, CircleX, ChevronUp
} from "lucide-react";
import {
  CardFooter,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { motion } from 'framer-motion';

export const List_Type_children = ({ 
  data, 
  loading, 
  sortConfig, 
  requestSort, 
  handlePageChange, 
  currentPage, 
  setSortConfig, 
  handledeletesoft, 
  handleactivate, 
  handledesactivate 
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showActivateDialog, setShowActivateDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedRows, setExpandedRows] = useState(new Set());

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
      handledeletesoft(selectedItem.id, selectedItem.nom_facteur);
    }
    setShowDeleteDialog(false);
    setSelectedItem(null);
  };

  const confirmActivation = (toggle) => {
    if (selectedItem) {
      handleactivate(selectedItem.id, selectedItem.nom_facteur, toggle ? "all=true" : "");
    }
    setShowActivateDialog(false);
    setSelectedItem(null);
  };

  const handleRowClick = (index) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <Card className="w-full">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer w-1/3"><span onClick={() => requestSort('name')}>Nom</span> {getIconFor('name')}</TableHead>
              <TableHead className="cursor-pointer hidden md:table-cell w-1/3"><span onClick={() => requestSort('active')}>Activate</span> {getIconFor('active')}</TableHead>
              <TableHead className="cursor-pointer hidden md:table-cell w-1/3"><span onClick={() => requestSort('createdDate')}>Date</span> {getIconFor('createdDate')}</TableHead>
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
                <TableCell colSpan="4" className="text-2xl text-center py-4">
                  Pas de Type
                </TableCell>
              </TableRow>
            ) : (
              data.content.map((item, index) => (
                <React.Fragment key={index}>
                  <TableRow onClick={() => handleRowClick(index)}>
                    <TableCell className="font-medium">{item.nom_type}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className={item.active ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                        {item.active ? "Activer" : "Désactiver"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{item.create}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleActivationClick(item)} className="text-green-600">Activer</DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleDeleteClick(item)} className="text-red-600">Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(index) && item.files && Array.isArray(item.files) && (
                      <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white p-0 m-0"
                    >
                      <TableCell colSpan="6" className="mr-3">
                        <Table className="w-10/12 bg-slate-300 rounded-xl">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="cursor-pointer w-1/4">Nom</TableHead>
                              <TableHead className="cursor-pointer hidden md:table-cell w-1/4">Parent</TableHead>
                              <TableHead className="cursor-pointer hidden md:table-cell w-1/4">Nomber de facteur</TableHead>
                              <TableHead className="cursor-pointer hidden md:table-cell w-1/4">Activate</TableHead>
                              <TableHead className="cursor-pointer hidden md:table-cell w-1/4">Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {item.files.map((child, childIndex) => (
                              <TableRow key={childIndex}>
                                <TableCell className="font-medium text-black">{child.nom_type}</TableCell>
                                <TableCell className="hidden md:table-cell">{child.type_parent}</TableCell>
                                <TableCell className="hidden md:table-cell">{child.nbr_facteur}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  <Badge variant="outline" className={child.active ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                                    {child.active ? "Activer" : "Désactiver"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{child.create}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </motion.tr>
                  )}
                </React.Fragment>
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

export default React.memo(List_Type_children);
