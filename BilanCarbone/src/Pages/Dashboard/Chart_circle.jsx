"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent ,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { convertToChartDatacircle } from "@/Function/mapper"


const chartConfig = {
  visitors: {
    label: "User",
  },
  EMPLOYE: {
    label: "EMPLOYE",
    color: "hsl(var(--chart-1))",
  },
  RESPONSABLE: {
    label: "RESPONSABLE ",
    color: "hsl(var(--chart-2))",
  },
  MANAGER: {
    label: "MANAGER",
    color: "hsl(var(--chart-5))",
  }
} 

export function Chart_circle({User}) {
  const [chartData,setchartData]=React.useState([
    { browser: "EMPLOYE", visitors: 0, fill: "var(--color-EMPLOYE)" },
    { browser: "RESPONSABLE", visitors: 0, fill: "var(--color-RESPONSABLE)" },
    { browser: "MANAGER", visitors: 0, fill: "var(--color-MANAGER)" },
  ])
  React.useEffect(()=>{
    setchartData(convertToChartDatacircle(User))
  },[User])
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Graphique circulaire</CardTitle>
        <CardDescription>
        Numéro d’utilisateur dans l’application
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Utilsateur
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
