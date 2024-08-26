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
import { apiClient } from "@/KeycloakConfig/KeycloakConn"
const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]; 
const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const date=new Date()
const this_month=date.getMonth()
const today_day=date.getDay()-1

function get_Day(index) {
    if (index < 0) {
        return daysOfWeek[(daysOfWeek.length + index) % daysOfWeek.length];
    }
    return daysOfWeek[index % daysOfWeek.length];
}
function get_Month(index) {
    if (index < 0) {
        return months[(months.length + index) % months.length];
    }
    return months[index % months.length];
}



const chartData_7_days = [
  { item: `${get_Day(today_day-6)}`, CO2: 0},
  { item: `${get_Day(today_day-5)}`, CO2: 0},
  { item: `${get_Day(today_day-4)}`, CO2: 0},
  { item: `${get_Day(today_day-3)}`, CO2: 0},
  { item: `${get_Day(today_day-2)}`, CO2: 0},
  { item: `${get_Day(today_day-1)}`, CO2: 0},
  { item: `${get_Day(today_day)}`, CO2: 0},
]

  
const chartData_3_month = [
    { item: `${get_Month(this_month-2)}`, CO2: 0},
    { item: `${get_Month(this_month-1)}`, CO2: 0},
    { item: `${get_Month(this_month)}`, CO2: 0},
  ]
const chartData_year = [
    { item: `${get_Month(this_month-11)}`, CO2: 0},
    { item: `${get_Month(this_month-10)}`, CO2: 0},
    { item: `${get_Month(this_month-9)}`, CO2: 0},
    { item: `${get_Month(this_month-8)}`, CO2: 0},
    { item: `${get_Month(this_month)-7}`, CO2: 0},
    { item: `${get_Month(this_month)-6}`, CO2: 0},
    { item: `${get_Month(this_month)-5}`, CO2: 0},
    { item: `${get_Month(this_month-4)}`, CO2: 0},
    { item: `${get_Month(this_month-3)}`, CO2: 0},
    { item: `${get_Month(this_month-2)}`, CO2: 0},
    { item: `${get_Month(this_month-1)}`, CO2: 0},
    { item: `${get_Month(this_month)}`, CO2: 0}
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
  const [dataLast7Days,setDataLast7Days]=useState([]) 
  const [dataLast3Month,setDataLast3Month]=useState([])
  const [dataLastYear,setDataLastYear]=useState([]) 
  const [loadingData, setLoadingData] = useState(true);   

  const handleData=async(index)=>{
    setLoadingData(true);

        if(index=="7d"){
            
                const response=await apiClient.get(`data/DataOfLast7Days?idEntreprise=${idEntreprise}`)
                setDataLast7Days(response.data)
              
        }
        else if(index=="3m"){
            
                const response=await apiClient.get(`data/DataOfLast3Month?idEntreprise=${idEntreprise}`)
                setDataLast3Month(response.data)
                
        }
        else if(index=="1y"){
            
                const response=await apiClient.get(`data/DataOfLastYear?idEntreprise=${idEntreprise}`)
                setDataLastYear(response.data)
                
            
        }
        setLoadingData(false);
    
}
  const handleTimeRangeData=(index)=>{
          if(index=="7d"){
            setTimeRangeData(chartData_7_days)
          }
          else if(index=="3m"){
            setTimeRangeData(chartData_3_month)
          }
          else if(index=="1y"){
            setTimeRangeData(chartData_year)
          }
    }
    useEffect(()=>{ 
        handleData(timeRange)     
        handleTimeRangeData(timeRange)
        
    },[timeRange])
    useEffect(()=>{
        resultData()
    },[dataLast7Days])


    const resultData=()=>{
        if(!loadingData){
            chartData_7_days.forEach((entry, index) => {
                const dateString = Object.keys(dataLast7Days)[index];
                entry.CO2 = dataLast7Days[dateString] || 0; 
              });
             
              chartData_3_month.forEach((entry,index)=>{

                    entry.CO2=dataLast3Month[index] || 0
              })

              chartData_year.forEach((entry,index)=>{

                entry.CO2=dataLastYear[index] || 0
               })
            
        }
       
        
        
    }
    
    resultData()
    

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
