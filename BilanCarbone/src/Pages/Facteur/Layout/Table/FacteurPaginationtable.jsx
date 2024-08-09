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
  
  const FacteurPaginationtable = ({
    Facteurs,
    loading,
    sortConfig,
    requestSort,
    handlePageChange,
    currentPage,
    setSortConfig,
    handleDelete,
    handleactivate,
    handledesactivate,
    isGlobal // nouvelle prop pour indiquer si les facteurs sont globaux
  }) => {
    const [showDialog, setShowDialog] = useState(false);
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
      setShowDialog(true);
    };
  
    const confirmDelete = () => {
      if (selectedItem) {
        handleDelete(selectedItem.id, selectedItem.nom_facteur);
      }
      setShowDialog(false);
      setSelectedItem(null);
    };
  
    const navigate = useNavigate();
    const handle_affichage = (id) => {
      navigate('/facteur/' + id);
    }
  
    return (
      <Card className="w-full">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-1/6 cursor-pointer ">
                  <span onClick={() => requestSort('nom')}>Nom</span> {getIconFor('nom')}
                </TableHead>
                <TableHead className="text-center w-1/6 cursor-pointer ">
                  <span onClick={() => requestSort('unit')}>Unité</span> {getIconFor('unit')}
                </TableHead>
                <TableHead className="text-center w-1/6 cursor-pointer md:table-cell ">
                  <span onClick={() => requestSort('emissionFactor')}>Émission</span> {getIconFor('emissionFactor')}
                </TableHead>
                <TableHead className="text-center w-1/6 cursor-pointer md:table-cell ">Type</TableHead>
                <TableHead className="text-center w-1/6 cursor-pointer md:table-cell ">
                  <span onClick={() => requestSort('active')}>Activate</span> {getIconFor('active')}
                </TableHead>
                <TableHead className="text-center w-1/6 cursor-pointer md:table-cell ">
                  <span onClick={() => requestSort('createdDate')}>Date</span> {getIconFor('createdDate')}
                </TableHead>
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
                    <TableCell className="text-center font-medium">
                      <Link to={"/facteur/" + item.type}>{item.nom_facteur}</Link>
                    </TableCell>
                    <TableCell className="text-center font-medium">{item.unit}</TableCell>
                    <TableCell className="text-center md:table-cell">{item.emissionFactor}</TableCell>
                    <TableCell className="text-center md:table-cell">{item.parent_type}</TableCell>
                    <TableCell className="text-center sm:table-cell">
                      <Badge variant="outline" className={item.active ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                        {item.active ? "Activer" : "Désactiver"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center md:table-cell">{item.creat_at}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="text-blue-600" onClick={() => { handle_affichage(item.type) }}>Afficher</DropdownMenuItem>
                          {!isGlobal && ( // condition pour masquer les actions pour les facteurs globaux
                            <>
                              {item.active ? (
                                <DropdownMenuItem onClick={() => handledesactivate(item.id, item.nom_facteur)} className="text-red-950">Désactiver</DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleactivate(item.id, item.nom_facteur)} className="text-green-600">Activer</DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleDeleteClick(item)} className="text-red-600">Supprimer</DropdownMenuItem>
                            </>
                          )}
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
                Affichage <strong>{Facteurs.number * Facteurs.size + 1}-{Math.min((Facteurs.number + 1) * Facteurs.size, Facteurs.totalElements)}</strong> de <strong>{Facteurs.totalElements}</strong> Facteurs
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => handlePageChange(Math.max(currentPage - 1, 0))} />
                  </PaginationItem>
                  {Array.from({ length: Facteurs.totalPages }).map((_, pageIndex) => (
                    <PaginationItem key={pageIndex}>
                      <PaginationLink href="#" onClick={() => handlePageChange(pageIndex)}>{pageIndex + 1}</PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={() => handlePageChange(Math.min(currentPage + 1, Facteurs.totalPages - 1))} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </CardFooter>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce facteur ? Cette action est irréversible.
            </DialogDescription>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>Annuler</Button>
              <Button variant="destructive" onClick={confirmDelete}>Supprimer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    );
  };
  
  export default FacteurPaginationtable;
  