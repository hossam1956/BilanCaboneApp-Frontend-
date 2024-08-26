"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {   
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent, } from "@/components/ui/chart"
import { useEffect, useState } from "react"
const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]; 
const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const today=new Date()
const this_month=today.getMonth()
console.log(today)
function get_Month(index) {
    if (index < 0) {
        return months[(months.length + index) % months.length];
    }
    return months[index % months.length];
}
console.log(get_Month(this_month-2))
const chartData_7_days = [
  { item: "Lundi", CO2: 186},
  { item: "Mardi", CO2: 305},
  { item: "Mercredi", CO2: 237},
  { item: "Jeudi", CO2: 73},
  { item: "Vendredi", CO2: 209},
  { item: "Samedi", CO2: 214},
  { item: "Dimanche", CO2: 214},
]

const chartData_3_month = [
    { item: `${get_Month(this_month-2)}`, CO2: 186},
    { item: `${get_Month(this_month-1)}`, CO2: 305},
    { item: `${get_Month(this_month)}`, CO2: 237},
  ]
const chartData_year = [
    { item: "Janvier", CO2: 186, mobile: 80 },
    { item: "Février", CO2: 305, mobile: 200 },
    { item: "Mars", CO2: 237, mobile: 120 },
    { item: "Avril", CO2: 73, mobile: 190 },
    { item: "Mai", CO2: 209, mobile: 130 },
    { item: "Juin", CO2: 214, mobile: 140 },
    { item: "Juillet", CO2: 4, mobile: 0 },
    { item: "Août", CO2: 2, mobile: 0 },
    { item: "Septembre", CO2: 66, mobile: 0 },
    { item: "Octobre", CO2: 44, mobile: 0 },
    { item: "Novembre", CO2: 20, mobile: 0 },
    { item: "Décembre", CO2: 20, mobile: 0 }
  ]

const chartConfig = {
  CO2: {
    label: "CO2",
    color: "#2563eb",
  }
} 

export function Chart_dash_DM({nomEntreprise,idEntreprise}) {
  const [timeRange, setTimeRange] = useState("7d")
  const [timeRangeData, setTimeRangeData] = useState(chartData_7_days)
  const handleTimeRangeData=(index)=>{
        if(index=="7d"){
            setTimeRangeData(chartData_7_days)
          }
          else if(index=="3m"){
            setTimeRangeData(chartData_3_month)
          }
          else if(index="1y"){
            setTimeRangeData(chartData_year)
          }
    }
    useEffect(()=>{
        handleTimeRangeData(timeRange)
    },[timeRange])
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row ">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Emissions CO2 de {nomEntreprise}</CardTitle>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d" className="rounded-lg">
            Derniers 7 jours
            </SelectItem>
            <SelectItem value="3m" className="rounded-lg">
            Dernier 3 mois
            </SelectItem>
            <SelectItem value="1y" className="rounded-lg">
            Dernière année
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={timeRangeData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="item"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => (timeRange=="3m")?value.slice(0, 4):value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="CO2" fill="var(--color-CO2)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
