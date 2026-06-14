import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { getEvaluationHistory, getEvaluationHistoryWithSkills, getAllEvaluationHistory } from "@/services/evaluation.service";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#a4de6c", "#d0ed57", "#8dd1e1", "#83a6ed", "#e07b91", "#b7a0d6"];

const inputClass = "bg-transparent border border-[#333] text-white px-[0.5vw] py-[0.25vw] text-[0.8vw] rounded-[0vw]";

function toDateInput(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function fmtDate(d: Date) {
    return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

function buildChartConfig(keys: string[]) {
    const config: ChartConfig = {};
    keys.forEach((key, i) => {
        config[key] = { label: key, color: COLORS[i % COLORS.length] };
    });
    return config;
}

export function HabitChart({ goalId, userId, viewMode, className, onNavigate }: {
    goalId?: string;
    userId?: string;
    viewMode?: "overall" | "skills";
    className?: string;
    onNavigate?: (id: string) => void;
}) {
    const [allData, setAllData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!goalId && !userId) return;
        setLoading(true);
        (async () => {
            try {
                if (goalId) {
                    const fetchFn = viewMode === "skills" ? getEvaluationHistoryWithSkills : getEvaluationHistory;
                    const res = await fetchFn(goalId);
                    if (res.data.status !== 200) { toast.error(res.data.msg); setAllData([]); return; }
                    const raw = res.data.history ?? [];

                    if (viewMode === "skills") {
                        const skillMap: Record<string, { name: string; points: { date: Date; value: number }[] }> = {};
                        for (const item of raw) {
                            const d = new Date(item.date);
                            for (const sm of item.skillMetrics ?? []) {
                                if (!skillMap[sm.skillName]) skillMap[sm.skillName] = { name: sm.skillName, points: [] };
                                skillMap[sm.skillName].points.push({ date: d, value: sm.completionPercentage ?? 0 });
                            }
                        }
                        const skillNames = Object.keys(skillMap);
                        const allDates = [...new Set(raw.map((r: any) => fmtDate(new Date(r.date))))];
                        const chartData = allDates.map(dateStr => {
                            const row: any = { date: dateStr };
                            for (const [ticketId, item] of Object.entries(raw)) {
                                const itemAny = item as any;
                                if (fmtDate(new Date(itemAny.date)) === dateStr) {
                                    for (const sm of itemAny.skillMetrics ?? []) {
                                        row[sm.skillName] = sm.completionPercentage ?? 0;
                                    }
                                }
                            }
                            return row;
                        });
                        setAllData({ chartData, keys: skillNames, meta: skillMap });
                    } else {
                        const points = raw.map((item: any) => {
                            const d = new Date(item.date);
                            return { date: fmtDate(d), progress: item.overallCompletion ?? 0, rawDate: d };
                        });
                        setAllData({ chartData: points, keys: ["progress"], meta: null });
                        if (points.length > 0) {
                            setStartDate(toDateInput(points[0].rawDate));
                            setEndDate(toDateInput(points[points.length - 1].rawDate));
                        }
                    }
                } else if (userId) {
                    const res = await getAllEvaluationHistory(userId);
                    if (res.data.status !== 200) { toast.error(res.data.msg); setAllData([]); return; }
                    const goals = res.data.goals ?? [];

                    const dateMap: Record<string, any> = {};
                    let allDates: string[] = [];
                    for (const goal of goals) {
                        for (const h of goal.history ?? []) {
                            const key = fmtDate(new Date(h.date));
                            if (!dateMap[key]) dateMap[key] = { date: key, rawDate: new Date(h.date) };
                            dateMap[key][goal.name] = h.overallCompletion ?? 0;
                            allDates.push(key);
                        }
                    }
                    allDates = [...new Set(allDates)].sort();
                    const chartData = allDates.map(d => dateMap[d]);
                    const goalNames = goals.map((g: any) => g.name);
                    const goalsMap = Object.fromEntries(goals.map((g: any) => [g.name, g.id]));

                    setAllData({ chartData, keys: goalNames, meta: goalsMap });
                    if (chartData.length > 0) {
                        setStartDate(toDateInput(chartData[0].rawDate));
                        setEndDate(toDateInput(chartData[chartData.length - 1].rawDate));
                    }
                }
            } catch {
                toast.error("Failed to load evaluation history.");
                setAllData([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [goalId, userId, viewMode]);

    useEffect(() => {
        if (!allData?.chartData) return;
        const from = startDate ? new Date(startDate).getTime() : -Infinity;
        const to = endDate ? new Date(endDate + "T23:59:59").getTime() : Infinity;
        const filtered = allData.chartData.filter((p: any) => {
            if (!p.rawDate) return true;
            const t = p.rawDate.getTime();
            return t >= from && t <= to;
        });
        setFilteredData(filtered);
    }, [allData, startDate, endDate]);

    if (!goalId && !userId) {
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

    if (!allData?.chartData || allData.chartData.length === 0) {
        return (
            <div className={cn("flex items-center justify-center h-[50vh] text-[#666]", className)}>
                No evaluation data yet.
            </div>
        );
    }

    const config = buildChartConfig(allData.keys);

    return (
        <div>
            {allData.keys.length > 0 && (
                <div className="flex gap-[0.5vw] mb-[0.5vw]">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputClass} />
                </div>
            )}
            <ChartContainer config={config} className={cn("h-[50vh] w-full", className)}>
                <LineChart data={filteredData} onClick={(data) => {
                    if (data?.activePayload?.[0] && onNavigate && allData.meta) {
                        const key = data.activePayload[0].dataKey as string;
                        const id = allData.meta[key];
                        if (id) onNavigate(id);
                    }
                }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {allData.keys.map((key: string, i: number) => (
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={COLORS[i % COLORS.length]}
                            strokeWidth={2}
                            dot={{ r: 3, fill: COLORS[i % COLORS.length] }}
                            activeDot={{ r: 5, fill: COLORS[i % COLORS.length] }}
                        />
                    ))}
                </LineChart>
            </ChartContainer>
        </div>
    );
}
