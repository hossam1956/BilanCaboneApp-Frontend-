"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { DatePickerWithRange } from "./DateRangePicker"


export function Chart_circle_NA({idEntreprise,idUtilisateur}) {
const role =sessionStorage.getItem("roleUser")
const [data,setData]=React.useState()
const [chartData,setchartdata]=React.useState([])
const [chartConfig,setchartdataconfig]=React.useState({})
React.useEffect(()=>{
  setchartdata(data
    ? Object.entries(data).map(([type, CO2], index) => ({
        type,
        CO2,
        fill: `var(--color-${type})`,
      }))
    : [])
    setchartdataconfig(data
      ? Object.entries(data).reduce((config, [type, CO2], index) => {
          config[`${type}`] = {
            label: `${type}`,
            color: `hsl(var(--chart-${index + 1}))`,
          };
          return config;
        }, {})
      : {})
},[data])
  
  const totalEmission=data?chartData.reduce((acc, curr) => acc + curr.CO2, 0):0

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Emission CO2 par Type</CardTitle>

      <DatePickerWithRange idEntreprise={idEntreprise} setData={setData} role={role} idUtilisateur={idUtilisateur}/>

      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="CO2"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalEmission.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Emission CO2
                        </tspan>
                      </text> 
                    )
                  }
                }}
              />
            </Pie>
            
            
            <ChartLegend
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center text-lg"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


