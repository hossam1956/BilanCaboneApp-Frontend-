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
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
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
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge"


const List_type_all = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [data, setData] = useState([
    {
      img: "/placeholder.svg",
      name: "Laser Lemonade Machine",
      status: "Draft",
      price: 499.99,
      totalSales: 25,
      createdAt: "2023-07-12 10:42 AM"
    },
    {
      img: "/placeholder.svg",
      name: "Laser Lemonade Machine",
      status: "Draft",
      price: 499.99,
      totalSales: 25,
      createdAt: "2023-07-12 10:42 AM"
    },
    // Add more data as needed
  ]);

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getIconFor = key => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? (
      <ChevronUp className="ml-2 h-4 w-4 inline" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4 inline" />
    );
  };

  return (
    <Card className="w-full">
          
      <CardContent>
        <Table>
        
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => requestSort('name')} className="cursor-pointer">
                Nome {getIconFor('name')}
              </TableHead>
              <TableHead onClick={() => requestSort('status')} className="cursor-pointer">
                active {getIconFor('status')}
              </TableHead>
              <TableHead onClick={() => requestSort('price')} className="cursor-pointer hidden md:table-cell">
                Sous-Type{getIconFor('price')}
              </TableHead>
              <TableHead onClick={() => requestSort('totalSales')} className="cursor-pointer hidden md:table-cell">
                Facteur  {getIconFor('totalSales')}
              </TableHead>
              <TableHead onClick={() => requestSort('createdAt')} className="cursor-pointer hidden md:table-cell">
                 Date{getIconFor('createdAt')}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  kjho
                </TableCell>
                <TableCell className="font-medium">
ggg                </TableCell>
                <TableCell>
                <Badge variant="destructive">Destructive</Badge> 
               </TableCell>
                <TableCell className="hidden md:table-cell">${item.price}</TableCell>
                <TableCell className="hidden md:table-cell">{item.totalSales}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem  className="text-blue-600">Afficher</DropdownMenuItem>
                              <DropdownMenuItem  className="text-orange-600">Modifier</DropdownMenuItem>
                              <DropdownMenuItem  className="text-green-600">Activer</DropdownMenuItem>
                              <DropdownMenuItem  className="text-red-950">Desactiver</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}

export default List_type_all;
