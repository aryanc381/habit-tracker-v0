import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { HabitChart } from "./MainChart";
import { NewGoal } from "./NewGoal";

export function AppHome() {
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
                <div className="flex gap-[1vw] mt-[1vw]">
                    <Card className="w-[15vw] p-[1vw] rounded-[0vw] border border-gray-500">hello</Card>
                    <Card className="w-[15vw] p-[1vw] rounded-[0vw] border border-gray-500">hello</Card>
                    <Card className="w-[15vw] p-[1vw] rounded-[0vw] border border-gray-500">hello</Card>
                </div>
            </div>
        </div>
    );
}