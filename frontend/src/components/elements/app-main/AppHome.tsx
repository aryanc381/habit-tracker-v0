import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { HabitChart } from "./MainChart";
import { NewGoal } from "./NewGoal";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllGoals } from "@/services/goal.service";
import { formatDate } from "@/lib/date";

export function AppHome() {
   const [goals, setGoals] = useState<{id:string; name:string; description: string; startDate: string; etaDate: string; status: string}[]>([]);
   useEffect(() => {
    const userId = localStorage.getItem("userId");
    if(!userId) { toast.error(`Could not load data for user.`); return; }
    getAllGoals(userId)
        .then((res) => setGoals(res.data.goals ?? []))
        .catch(() => toast.error(`Couldn't load goals`));
   }, [])
   return(
        <div className="flex flex-col justify-center m-[1vw]">
            <div className="">
                <Card className="rounded-[0vw] p-[1vw] border border-gray-500">
                    <CardTitle className="text-[3vw] tracking-[-0.1vw]">Main tracker</CardTitle>
                    <CardDescription className="text-[1vw] mt-[-1vw]">This is what growth has been looking like to me since a while now.</CardDescription>
                    <CardContent><HabitChart /></CardContent>
                </Card>
            </div>
            <div className="mt-[2vw] ">
                <div className="flex justify-between">
                    <p className="text-[2vw] ml-[0.25vw] font-semibold tracking-[-0.05vw]">Goals</p>
                    <NewGoal buttonName="new goal" />
                </div>
                <div className="flex gap-[1vw] mt-[1vw] w-full overflow-x-auto pb-[0.5vw]">
                    {goals.map((goal) => (
                        <Card key={goal.id} className="w-[20vw] h-[11vw] shrink-0 p-[1vw] gap-[0.75vw] rounded-[0vw] border border-gray-500">
                            <div className="flex items-center justify-between gap-[0.5vw]">
                                <CardTitle className="truncate text-[1.1vw]">{goal.name}</CardTitle>
                                <span className="shrink-0 text-[0.7vw] uppercase tracking-wide text-gray-400 border border-gray-600 px-[0.4vw] py-[0.1vw]">{goal.status}</span>
                            </div>
                            <CardDescription className="line-clamp-2 break-words text-gray-400">{goal.description}</CardDescription>
                            <div className="flex justify-between text-[0.75vw] text-gray-500 mt-[0.25vw]">
                                <span>{formatDate(goal.startDate)}</span>
                                <span>{formatDate(goal.etaDate)}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}