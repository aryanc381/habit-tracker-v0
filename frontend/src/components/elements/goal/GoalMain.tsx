import { getGoalById } from "@/services/goal.service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { HabitChart } from "../app-main/MainChart";
import { Card } from "@/components/ui/card";
import { TicketKanban, type Ticket } from "../kanban/KanbanBoard";
import { Button } from "@/components/ui/button";

interface GoalInfo {
    userId: string;
    name: string;
    description: string;
    startDate: string;
    etaDate: string;
    skillIds: string;
    status: "planned" | "in_progress" | "off-track" | "failed" | "completed";
}

export function GoalMain() {
    const { goalId } = useParams();
    const [goalInfo, setGoalInfo] = useState<GoalInfo>();
    const navigate = useNavigate();
    const [tickets, setTickets] = useState<Record<string, Ticket[]>>({
        pending: [
            { id: "t1", title: "Design landing page", description: "Create main hero section with feature callouts", progress: 0, votes: 142, labels: ["design", "frontend"] },
            { id: "t2", title: "Set up CI/CD pipeline", description: "GitHub Actions for automated deploy", progress: 0, votes: 98, labels: ["backend"] },
            { id: "t3", title: "Write API docs", description: "Document all REST endpoints with examples", progress: 0, votes: 56, labels: ["docs"] },
        ],
        in_progress: [
            { id: "t4", title: "User auth flow", description: "Login, signup, and JWT refresh", progress: 65, votes: 234, labels: ["backend"] },
            { id: "t5", title: "Dashboard widgets", description: "Chart components and data fetching", progress: 40, votes: 176, labels: ["frontend"] },
            { id: "t6", title: "Search feature", description: "Full-text search with debounced input", progress: 30, votes: 112, labels: ["frontend", "backend"] },
        ],
        average: [
            { id: "t7", title: "Notification system", description: "Real-time alerts via WebSockets", progress: 50, votes: 89, labels: ["backend"] },
        ],
        fail: [
            { id: "t8", title: "Mobile responsive nav", description: "Hamburger menu and touch interactions", progress: 20, votes: 67, labels: ["frontend"] },
        ],
        success: [
            { id: "t9", title: "Database migrations", description: "Prisma schema and initial seed data", progress: 100, votes: 203, labels: ["backend"] },
            { id: "t10", title: "Dark mode toggle", description: "Theme switcher with localStorage persistence", progress: 100, votes: 456, labels: ["frontend"] },
        ],
        }) 
    useEffect(() => {
        if (!goalId) return;
        (async () => {
            try {
                const res = await getGoalById(goalId);
                setGoalInfo(res.data.goalObject);
            } catch {
                    toast.error("Failed to load goal.");
                }
            })();
        }, [goalId]
    );

    return(
        <div className="m-[1vw]">
            <div className="flex justify-between">
                <div className="text-white">
                    <p className="text-[2vw]">{goalInfo?.name}</p>
                    <p className="text-[1vw]">{goalInfo?.description}</p>
                </div>
                <div className="flex gap-[0.25vw]">
                    <Button variant={'outline'} className="cursor-pointer rounded-[0vw]" onClick={() => {navigate(-1)}}>Go back</Button>
                    <Button className="cursor-pointer rounded-[0vw]">Add Ticket</Button>
                </div>
            </div>
            
            <div className="mt-[1vw]">
                <Card className="pr-[2vw] rounded-[0vw] border">
                    <HabitChart className="h-[30vh]" />
                </Card>
            </div>
            <div className="mt-[1vw]">
                <TicketKanban columnHeight="h-[50vh]" tickets={tickets} onTicketsChange={setTickets} onTicketClick={(t) => console.log("clicked", t.id)} />
            </div>
        </div>
    )
}