"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", Admin: 186, Teacher: 80, Student: 90 },
  { month: "March", Admin: 237, Teacher: 120, Student: 190 },
  { month: "April", Admin: 73, Teacher: 190, Student: 50 },
  { month: "May", Admin: 209, Teacher: 130, Student: 90 },
  { month: "June", Admin: 214, Teacher: 140, Student: 250 },
  { month: "February", Admin: 100, Teacher: 200, Student: 305 },
];

const chartConfig = {
  Admin: {
    label: "Admin",
    color: "hsl(var(--chart-1))",
  },
  Teacher: {
    label: "Teacher",
    color: "hsl(var(--chart-2))",
  },
  Student: {
    label: "Student",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ChartComp() {
  return (
    <Card className="w-3/5">
      <CardHeader>
        <CardTitle className="text-[var(--textpur)]">
          Registerd users - Monthly
        </CardTitle>
        <CardDescription>Data for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="Admin" fill="var(--item)" radius={4} />
            <Bar dataKey="Teacher" fill="black" radius={4} />
            <Bar dataKey="Student" fill="var(--textpur)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-[var(--textpur)]">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total users for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
