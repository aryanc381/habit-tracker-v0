import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { LineChart, Line, XAxis, CartesianGrid } from "recharts";

const data = [
    { day: "Mon", progress: 12 },
    { day: "Tue", progress: 18 },
    { day: "Wed", progress: 15 },
    { day: "Thu", progress: 25 },
    { day: "Fri", progress: 22 },
    { day: "Sat", progress: 30 },
    { day: "Sun", progress: 28 },
    { day: "Mon", progress: 35 },
    { day: "Tue", progress: 31 },
    { day: "Wed", progress: 42 },
    { day: "Thu", progress: 38 },
    { day: "Fri", progress: 45 },
    { day: "Sat", progress: 40 },
    { day: "Sun", progress: 52 },
    { day: "Mon", progress: 48 },
    { day: "Tue", progress: 55 },
    { day: "Wed", progress: 50 },
    { day: "Thu", progress: 62 },
    { day: "Fri", progress: 58 },
    { day: "Sat", progress: 65 },
    { day: "Sun", progress: 60 },
    { day: "Mon", progress: 68 },
    { day: "Tue", progress: 72 },
    { day: "Wed", progress: 65 },
    { day: "Thu", progress: 78 },
    { day: "Fri", progress: 74 },
    { day: "Sat", progress: 82 },
    { day: "Sun", progress: 79 },
    { day: "Mon", progress: 85 },
    { day: "Tue", progress: 90 },
  ];

const chartConfig: ChartConfig = {
progress: {
    label: "Progress",
    color: "#ffffff",
},
};

export function HabitChart() {
    return (
      <ChartContainer config={chartConfig} className="h-[50vh] w-[94.5vw]">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="progress" stroke="var(--color-progress)" strokeWidth={2} />
        </LineChart>
      </ChartContainer>
    );
}
