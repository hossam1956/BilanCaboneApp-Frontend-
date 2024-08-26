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
import { convertDatatochart, filterChartData } from "@/Function/mapper"
import { Calendar } from "@/components/ui/calendar"
import { DatePickerWithRange } from "@/Composant/DatePickerWithRange"


const chartData = [
  { date: new Date() , entreprise: 0, User: 0 },
]

const chartConfig = {
  entreprise: {
    label: "Entreprise",
    color: "#7f5af0",
  },
  User: {
    label: "User",
    color: "#90b4ce",
  },
} 
export function Chart_dash({User,Entre}) {

  const handleDateSelect = (selectedDateRange) => {
    const date_inv=Object.values(selectedDateRange)
    const date_start = new Date(date_inv[0]);
    const date_end = new Date(date_inv[1]);
    const formattedDate_start = date_start.toISOString().slice(0, 10);
    const formattedDate_end = date_end.toISOString().slice(0, 10);
    setdata(filterChartData(data, null, formattedDate_start, formattedDate_end))
    // You can now work with the selected date range here
  }
  const [timeRange, setTimeRange] = useState("90")
  const [data,setdata]=useState(chartData)
  useEffect(()=>{
    setdata(filterChartData(convertDatatochart(Entre,User),timeRange))
  },[User,Entre,timeRange])
  return (
    <Card className="sm:col-span-2">
    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row ">
      <div className="grid flex-1 gap-1 text-center sm:text-left">
        <CardTitle>Carte de zone</CardTitle>
        <CardDescription>
        Total des utilisateurs et de l’entreprise
                </CardDescription>
      </div>
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger
          className="w-[160px] rounded-lg sm:ml-auto"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Last 3 months" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="90" className="rounded-lg">
          3 derniers mois
</SelectItem>
          <SelectItem value="30" className="rounded-lg">
          30 derniers jours
</SelectItem>
          <SelectItem value="7" className="rounded-lg">
          7 derniers jours
</SelectItem>
        </SelectContent>
      </Select>
      <DatePickerWithRange onDateSelect={handleDateSelect} />
    </CardHeader>
    <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
    <BarChart accessibilityLayer data={data}>
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="date"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => formatDate(value)}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      <Bar dataKey="entreprise" fill="var(--color-entreprise)" radius={4} />
      <Bar dataKey="User" fill="var(--color-User)" radius={4} />
    </BarChart>
  </ChartContainer>
  </CardContent>
  </Card>
  )
}
function formatDate(dateString) {
  // Create a new Date object from the input date string
  const date = new Date(dateString);

  // Get the day and month from the date object
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1

  // Format the date as DD/MM
  return `${day}/${month}`;
}
