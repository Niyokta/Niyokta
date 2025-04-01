
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
import { RefinedAnalyticsDailyDataType, RefinedAnalyticsDataType } from "@/lib/types/AnalyticsData"
import { returnMonthByNumber } from "@/helper/date"
const chartConfig = {
    projects: {
        label: "Projects",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export function DailyProjectChart({ chartData }: { chartData: RefinedAnalyticsDailyDataType[] }) {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentmonthname = returnMonthByNumber(currentMonth)
    const currentYear = date.getFullYear()
    return (
        <Card className="w-full h-[500px]" style={{ backgroundColor: div_color }}>
            <CardHeader>
                <CardTitle>Daily Project Analytics</CardTitle>
                <CardDescription>{currentmonthname} {currentYear}</CardDescription>
            </CardHeader>
            <CardContent >
                <ChartContainer config={chartConfig} className="w-full h-[300px]">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 2)}
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
                    Track your projects performace <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing Total Projects For This Month
                </div>
            </CardFooter>
        </Card>
    )
}
