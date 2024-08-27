"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { apiClient } from "@/KeycloakConfig/KeycloakConn"

export function DatePickerWithRange({ className,idEntreprise,idUtilisateur,setData,role }) {
  const today=new Date();
  const [date, setDate] = React.useState({
    from: format(new Date(today.getFullYear(), 0, 1), "yyyy-MM-dd"),
    to: format(new Date(today.getFullYear(), today.getMonth(), today.getDate()), "yyyy-MM-dd"),
  })
  React.useEffect(()=>{
   
    const fetchData = async () => {
      try {
        const firstDay = date.from;
        const lastDay = date.to;
        if(role=="MANAGER"){
          const response = await apiClient.get(`data/getDataPerType?idEntreprise=${idEntreprise}&firstDate=${firstDay}&lastDate=${lastDay}`);
          setData(response.data);
        }
        else{
          const response = await apiClient.get(`data/getDataPerType/user?idUtilisateur=${idUtilisateur}&firstDate=${firstDay}&lastDate=${lastDay}`);
          setData(response.data);
        }
       
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  },[date,setData])
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {date.from} - {date.to}
                </>
              ) : (
                date.from
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              setDate({
                from: range?.from ? format(range.from, "yyyy-MM-dd") : "",
                to: range?.to ? format(range.to, "yyyy-MM-dd") : "",
              });
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
