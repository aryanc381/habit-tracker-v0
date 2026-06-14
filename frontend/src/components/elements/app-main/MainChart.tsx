import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { getEvaluationHistory } from "@/services/evaluation.service";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChartPoint {
    date: string;
    progress: number;
    isToday: boolean;
    rawDate: Date;
}

const chartConfig: ChartConfig = {
    progress: {
        label: "Progress",
        color: "#ffffff",
    },
};

const inputClass = "bg-transparent border border-[#333] text-white px-[0.5vw] py-[0.25vw] text-[0.8vw] rounded-[0vw]";

function toDateInput(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function HabitChart({ goalId, className }: { goalId?: string; className?: string }) {
    const [allData, setAllData] = useState<ChartPoint[]>([]);
    const [filteredData, setFilteredData] = useState<ChartPoint[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!goalId) return;
        setLoading(true);
        (async () => {
            try {
                const res = await getEvaluationHistory(goalId);
                if (res.data.status !== 200) {
                    toast.error(res.data.msg);
                    setAllData([]);
                    return;
                }

                const raw = res.data.history ?? [];
                const todayMs = Date.now();
                let closestIdx = 0;
                let closestDiff = Infinity;

                const points: ChartPoint[] = raw.map((item: any, idx: number) => {
                    const d = new Date(item.date);
                    const diff = Math.abs(d.getTime() - todayMs);
                    if (diff < closestDiff) {
                        closestDiff = diff;
                        closestIdx = idx;
                    }
                    return {
                        date: `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`,
                        progress: item.overallCompletion ?? 0,
                        isToday: false,
                        rawDate: d,
                    };
                });

                if (points.length > 0) {
                    points[closestIdx].isToday = true;
                    setStartDate(toDateInput(points[0].rawDate));
                    setEndDate(toDateInput(points[points.length - 1].rawDate));
                }

                setAllData(points);
            } catch {
                toast.error("Failed to load evaluation history.");
                setAllData([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [goalId]);

    useEffect(() => {
        const from = startDate ? new Date(startDate).getTime() : -Infinity;
        const to = endDate ? new Date(endDate + "T23:59:59").getTime() : Infinity;
        setFilteredData(allData.filter((p) => {
            const t = p.rawDate.getTime();
            return t >= from && t <= to;
        }));
    }, [allData, startDate, endDate]);

    if (!goalId) {
        return (
            <div className={cn("flex items-center justify-center h-[50vh] text-[#666]", className)}>
                Select a goal to view evaluation.
            </div>
        );
    }

    if (loading) {
        return (
            <div className={cn("flex items-center justify-center h-[50vh] text-[#666]", className)}>
                Loading...
            </div>
        );
    }

    if (allData.length === 0) {
        return (
            <div className={cn("flex items-center justify-center h-[50vh] text-[#666]", className)}>
                No evaluation data yet.
            </div>
        );
    }

    return (
        <div>
            <div className="flex gap-[0.5vw] mb-[0.5vw]">
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputClass} />
            </div>
            <ChartContainer config={chartConfig} className={cn("h-[50vh] w-full", className)}>
                <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                        type="monotone"
                        dataKey="progress"
                        stroke="var(--color-progress)"
                        strokeWidth={2}
                        dot={(props: any) => {
                            const { cx, cy, payload } = props;
                            if (payload?.isToday) {
                                return <circle cx={cx} cy={cy} r={6} fill="red" stroke="none" />;
                            }
                            return <circle cx={cx} cy={cy} r={3} fill="var(--color-progress)" />;
                        }}
                    />
                </LineChart>
            </ChartContainer>
        </div>
    );
}
