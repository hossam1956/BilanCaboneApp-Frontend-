import React, { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"

export const description = "An interactive bar chart"

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 395, mobile: 350 },
  { date: "2024-06-28", desktop: 102, mobile: 160 },
  { date: "2024-06-29", desktop: 493, mobile: 510 },
  { date: "2024-06-30", desktop: 361, mobile: 310 },
]

export function DiagBar() {
  const [data] = useState(chartData)

  const transformedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      total: item.desktop + item.mobile,
    }))
  }, [data])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total des utilisateurs</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          pour la période du 1 avril 2024 au 30 juin 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartConfig>
          <ChartContainer className="aspect-square">
            <BarChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("fr-FR", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
              <Bar dataKey="total" fill="rgba(180, 60, 60, 0.85)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </ChartConfig>
      </CardContent>
    </Card>
  )
}






/*import React, { useRef, useEffect, createContext, Children } from 'react';
import { Chart,BarController,BarElement,LinearScale, CategoryScale,Tooltip,Legend} from 'chart.js';
import Dashboard from '../Pages/Dashboard';
import {DownloadChartBar} from './DownloadChart';

Chart.register(BarController,BarElement,LinearScale, CategoryScale,Tooltip,Legend);
const labels = ['Red', 'Blue', 'Yellow'];
const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
      ],
      borderWidth: 1
    }]
  };

const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
 export const ChartBarCxt=new createContext(null)

const DiagBar = () => {
  const yearRef=useRef(null)
  const mounthRef=useRef(null)
  const weekRef=useRef(null)

  
  const handlePeriodYear=()=>{
      yearRef.current.className='border-solid border-transparent bg-black text-white mx-0 md:mx-3 p-2 rounded-md'
      mounthRef.current.className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md'
      weekRef.current.className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md'
  }
  const handlePeriodMounth=()=>{
      yearRef.current.className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md'
      mounthRef.current.className='border-solid border-transparent bg-black text-white mx-0 md:mx-3 p-2 rounded-md'
      weekRef.current.className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md'
  }
  const handlePeriodWeek=()=>{
      yearRef.current.className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md'
      mounthRef.current.className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md'
      weekRef.current.className='border-solid border-transparent bg-black text-white mx-0 md:mx-3 p-2 rounded-md'
  }
  const DiagBarRef=useRef(null)
  useEffect(
    ()=>{
        const context=DiagBarRef.current.getContext("2d")
        const barDiag=new Chart(context,config)
        return ()=>{
            barDiag.destroy()
            
        }
    },[]
  
);
return(
<div className='text-xs md:text-base'>
    <button ref={yearRef} className='border-solid border-transparent bg-black text-white mx-0 md:mx-3 p-2 rounded-md ' onClick={handlePeriodYear}>Cette Année</button>
    <button ref={mounthRef} className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md ' onClick={handlePeriodMounth}>Ce mois</button>
    <button ref={weekRef} className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md ' onClick={handlePeriodWeek}> Cette Semaine</button>
    <ChartBarCxt.Provider value={DiagBarRef}>
            <canvas ref={DiagBarRef} className='h-2/3'></canvas>
            <DownloadChartBar/>
    </ChartBarCxt.Provider>

</div>
)

}

export default DiagBar;*/
