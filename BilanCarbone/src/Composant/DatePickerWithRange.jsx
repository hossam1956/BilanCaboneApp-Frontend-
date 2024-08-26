"use client"

import * as React from "react"
import { addDays, format, differenceInDays } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({ className, onDateSelect }) {
  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 30),
  })

  const handlerselect = (data_bet) => {
    const date_inv = Object.values(data_bet)
    
    let newDateRange;
    if (differenceInDays(date_inv[1], date_inv[0]) > 30) {
      newDateRange = {
        from: date_inv[0],
        to: addDays(date_inv[0], 30),
      }
    } else {
      newDateRange = data_bet
    }

    setDate(newDateRange)
    
    // Call the onDateSelect callback with the updated date range
    if (onDateSelect) {
      onDateSelect(newDateRange)
    }
  }

  return (
    <div className={cn("", className)}>
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
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>choisir une date </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handlerselect}
            
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
