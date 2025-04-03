"use client"
import React from "react";
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
import { div_color } from "@/resource/theme";
import { returnMonthByNumber } from "@/helper/date";
const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-4))",
  },
  accepted: {
    label: "Accepted",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export default function AreaChartForBidInsight({refinedData}:{refinedData:{monthName:String,total:number,accepted:number}[]}){
    const chartData=refinedData;
    const date=new Date();
    const currentMonth=date.getMonth()+1;
    const currentMonthName=returnMonthByNumber(currentMonth);
    const currentYear=date.getFullYear()
    return (
        <Card className="h-[500px]" style={{backgroundColor:div_color}}>
            <CardHeader>
                <CardTitle>Bid Insight</CardTitle>
                <CardDescription>
                    Showing total bids for this year
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className="w-full h-[300px]" config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                            top:10,
                            bottom:10
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="monthName"
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
                            dataKey="total"
                            type="natural"
                            fill="var(--color-total)"
                            fillOpacity={0.4}
                            stroke="var(--color-total)"
                            stackId="a"
                        />
                        <Area
                            dataKey="accepted"
                            type="natural"
                            fill="var(--color-accepted)"
                            fillOpacity={0.4}
                            stroke="var(--color-accepted)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Track Your Bids Performance <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - {currentMonthName} {currentYear}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}