

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
import { RefinedAnalyticsDataType } from "@/lib/types/AnalyticsData"
import { returnMonthByNumber } from "@/helper/date"
// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ]

const chartConfig = {
  projects: {
    label: "Projects",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function MonthlyProjectChart({chartData}:{chartData:RefinedAnalyticsDataType[]}) {
    const date=new Date();
    const currentMonth=date.getMonth()+1;
    const currentmonthname=returnMonthByNumber(currentMonth)
    const currentYear=date.getFullYear()
  return (
    <Card className="w-full h-[500px]" style={{backgroundColor:div_color}}>
      <CardHeader>
        <CardTitle>Monthly Project Analysis</CardTitle>
        <CardDescription>January - {currentmonthname} {currentYear}</CardDescription>
      </CardHeader>
      <CardContent >
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="projects" fill="var(--color-projects)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Track Your Projects Performance <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total projects for the present year.
        </div>
      </CardFooter>
    </Card>
  )
}
