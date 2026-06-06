import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { HabitChart } from "./MainChart";
import { NewGoal } from "./NewGoal";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllGoals } from "@/services/goal.service";

export function AppHome() {
   const [goals, setGoals] = useState<{id:string; name:string}[]>([]);
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
                    <CardTitle>Main tracker</CardTitle>
                    <CardDescription>This is what growth has been looking like to me since a while now.</CardDescription>
                    <CardContent><HabitChart /></CardContent>
                </Card>
            </div>
            <div className="mt-[2vw] ">
                <div className="flex justify-between">
                    <p className="text-[1vw] ml-[0.25vw]">Goals</p>
                    <NewGoal buttonName="new goal" />
                </div>
                <div className="flex flex-wrap gap-[1vw] mt-[1vw]">
                    {goals.map((goal) => (
                        <Card key={goal.id} className="w-[15vw] p-[1vw] rounded-[0vw] border border-gray-500">{goal.name}</Card>
                    ))}
                </div>
            </div>
        </div>
    );
}