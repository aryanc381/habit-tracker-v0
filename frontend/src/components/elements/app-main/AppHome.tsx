import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { HabitChart } from "./MainChart";
import { NewGoal } from "./NewGoal";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllGoals, changeGoalStatus, type GoalStatus } from "@/services/goal.service";
import { formatDate } from "@/lib/date";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const STATUSES: GoalStatus[] = ["planned", "in_progress", "off-track", "failed", "completed"];

const statusColor: Record<string, string> = {
    planned: "text-gray-300 border-gray-500",
    in_progress: "text-blue-400 border-blue-500",
    "off-track": "text-orange-400 border-orange-500",
    failed: "text-red-400 border-red-500",
    completed: "text-green-400 border-green-500",
};

export function AppHome() {
   const [goals, setGoals] = useState<{id:string; name:string; description: string; startDate: string; etaDate: string; status: string}[]>([]);
   useEffect(() => {
    const userId = localStorage.getItem("userId");
    if(!userId) { toast.error(`Could not load data for user.`); return; }
    getAllGoals(userId)
        .then((res) => setGoals(res.data.goals ?? []))
        .catch(() => toast.error(`Couldn't load goals`));
   }, [])

   const handleStatusChange = async (goalId: string, status: GoalStatus) => {
       try {
           const res = await changeGoalStatus(goalId, status);
           if(res.data.status !== 200) { toast.error(res.data.msg); return; }
           setGoals((prev) => prev.map((g) => g.id === goalId ? { ...g, status } : g));
           toast.success(res.data.msg);
       } catch {
           toast.error("Couldn't update status.");
       }
   };

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
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className={`shrink-0 uppercase tracking-wide text-[0.7vw] border px-[0.4vw] py-[0.1vw] cursor-pointer hover:bg-gray-800 ${statusColor[goal.status] ?? "text-gray-400 border-gray-600"}`}>{goal.status?.replace("_", " ")}</button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="rounded-[0vw] bg-white text-black border border-gray-300">
                                        {STATUSES.map((s) => (
                                            <DropdownMenuItem key={s} onSelect={() => handleStatusChange(goal.id, s)} className="rounded-[0vw] capitalize cursor-pointer text-[0.8vw] data-[highlighted]:bg-gray-100 data-[highlighted]:text-black">{s.replace("_", " ")}</DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
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