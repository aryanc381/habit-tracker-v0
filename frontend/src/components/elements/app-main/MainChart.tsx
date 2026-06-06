import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
    { date: "01/06", progress: 30 },
    { date: "02/06", progress: 34 },
    { date: "03/06", progress: 28 },
    { date: "04/06", progress: 38 },
    { date: "05/06", progress: 62 },
    { date: "06/06", progress: 58 },
    { date: "07/06", progress: 55 },
    { date: "08/06", progress: 60 },
    { date: "09/06", progress: 45 },
    { date: "10/06", progress: 18 },
    { date: "11/06", progress: 22 },
    { date: "12/06", progress: 26 },
    { date: "13/06", progress: 24 },
    { date: "14/06", progress: 48 },
    { date: "15/06", progress: 52 },
    { date: "16/06", progress: 50 },
    { date: "17/06", progress: 54 },
    { date: "18/06", progress: 88 },
    { date: "19/06", progress: 72 },
    { date: "20/06", progress: 68 },
    { date: "21/06", progress: 70 },
    { date: "22/06", progress: 66 },
    { date: "23/06", progress: 40 },
    { date: "24/06", progress: 44 },
    { date: "25/06", progress: 42 },
    { date: "26/06", progress: 76 },
    { date: "27/06", progress: 80 },
    { date: "28/06", progress: 78 },
    { date: "29/06", progress: 84 },
    { date: "30/06", progress: 82 },
  ];

const chartConfig: ChartConfig = {
progress: {
    label: "Progress",
    color: "#ffffff",
},
};

export function HabitChart() {
    return (
      <ChartContainer config={chartConfig} className="h-[50vh] w-full">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="progress" stroke="var(--color-progress)" strokeWidth={2} />
        </LineChart>
      </ChartContainer>
    );
}
