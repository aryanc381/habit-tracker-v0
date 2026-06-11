import { getGoalById } from "@/services/goal.service";
import { getTicketsByGoalId, updateTicketStatus } from "@/services/tickets.service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { HabitChart } from "../app-main/MainChart";
import { Card } from "@/components/ui/card";
import { TicketKanban, type Ticket } from "../kanban/KanbanBoard";
import { Button } from "@/components/ui/button";
import { NewTicket } from "./NewTicket";

interface GoalInfo {
    userId: string;
    name: string;
    description: string;
    startDate: string;
    etaDate: string;
    skillIds: string;
    status: "planned" | "in_progress" | "off-track" | "failed" | "completed";
}

const STATUSES: Record<string, string> = {
    pending: "pending",
    in_progress: "in_progress",
    average: "average",
    fail: "fail",
    success: "success",
};

export function GoalMain() {
    const { goalId } = useParams();
    const [goalInfo, setGoalInfo] = useState<GoalInfo>();
    const [tickets, setTickets] = useState<Record<string, Ticket[]>>({});
    const navigate = useNavigate();

    const fetchTickets = async () => {
        if (!goalId) return;
        try {
            const res = await getTicketsByGoalId(goalId);
            if (res.data.status !== 200) {
                toast.error(res.data.msg);
                return;
            }
            const grouped: Record<string, Ticket[]> = {};
            for (const key of Object.keys(STATUSES)) {
                grouped[key] = [];
            }
            for (const t of res.data.tickets) {
                const status = t.level?.status ?? "pending";
                if (!grouped[status]) grouped[status] = [];
                grouped[status].push({
                    id: t.id,
                    title: t.name,
                    description: t.description ?? "",
                    progress: t.level?.overallCompletionPercentage ?? 0,
                    createdAt: t.createdAt,
                    labels: [],
                });
            }
            setTickets(grouped);
        } catch {
            toast.error("Failed to load tickets.");
        }
    };

    const handleTicketsChange = (newColumns: Record<string, Ticket[]>) => {
        const oldColumns = tickets;
        setTickets(newColumns);

        for (const [status, items] of Object.entries(newColumns)) {
            const oldIds = new Set((oldColumns[status] ?? []).map((t) => t.id));
            for (const ticket of items) {
                if (!oldIds.has(ticket.id)) {
                    updateTicketStatus(ticket.id, status as any);
                    break;
                }
            }
        }
    };

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
    }, [goalId]);

    useEffect(() => {
        fetchTickets();
    }, [goalId]);

    return(
        <div className="m-[1vw]">
            <div className="flex justify-between">
                <div className="text-white">
                    <p className="text-[2vw]">{goalInfo?.name}</p>
                    <p className="text-[1vw]">{goalInfo?.description}</p>
                </div>
                <div className="flex gap-[0.25vw]">
                    <Button variant={'outline'} className="cursor-pointer rounded-[0vw]" onClick={() => {navigate(-1)}}>Go back</Button>
                    <NewTicket goalId={goalId!} onTicketCreated={fetchTickets} />
                </div>
            </div>
            
            <div className="mt-[1vw]">
                <Card className="pr-[2vw] rounded-[0vw] border">
                    <HabitChart className="h-[30vh]" />
                </Card>
            </div>
            <div className="mt-[1vw]">
                <TicketKanban columnHeight="h-[50vh]" tickets={tickets} onTicketsChange={handleTicketsChange} onTicketClick={(t) => console.log("clicked", t.id)} />
            </div>
        </div>
    );
}
