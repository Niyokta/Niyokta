
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { div_color } from "@/resource/theme"
import { returnMonthByNumber } from "@/helper/date"

const chartConfig = {
  earned: {
    label: "Earned",
    color: "hsl(var(--chart-1))",
  },
  spent: {
    label: "Spent",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AnnualCostSpending({chartData}:{chartData:{month:String,earned:number,spent:number}[]}) {
  const date=new Date();
  const currentYear=date.getFullYear();
  const currentMonth=date.getMonth()+1;
  const currentmonthname=returnMonthByNumber(currentMonth);
  return (
    <Card style={{backgroundColor:div_color}} className="h-[500px]">
      <CardHeader>
        <CardTitle>Financial Analysis</CardTitle>
        <CardDescription className="capitalize">
          expenditure and earning the year {currentYear}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="earned"
              type="natural"
              fill="var(--color-earned)"
              fillOpacity={0.4}
              stroke="var(--color-earned)"
              stackId="a"
            />
            <Area
              dataKey="spent"
              type="natural"
              fill="var(--color-spent)"
              fillOpacity={0.4}
              stroke="var(--color-spent)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Track Your Money Efficiently <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - {currentmonthname} {currentYear}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
