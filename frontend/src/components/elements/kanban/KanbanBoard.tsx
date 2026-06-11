import { ComponentProps, useState } from "react"
import { Badge } from "@/components/reui/badge"
import {
    Frame,
    FrameHeader,
    FramePanel,
    FrameTitle,
} from "@/components/reui/frame"
import {
    Kanban,
    KanbanBoard,
    KanbanColumn,
    KanbanColumnContent,
    KanbanItem,
    KanbanItemHandle,
    KanbanOverlay,
} from "@/components/kanban/kanban"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

export interface Ticket {
    id: string
    title: string
    description: string
    progress: number
    votes: number
    labels: string[]
}

type TicketStatus = "pending" | "in_progress" | "average" | "fail" | "success"

const COLUMNS: Record<TicketStatus, { title: string; color: string }> = {
    pending: { title: "Pending", color: "bg-[#a3a3a3]" },
    in_progress: { title: "In Progress", color: "bg-[#3b82f6]" },
    average: { title: "Average", color: "bg-[#f59e0b]" },
    fail: { title: "Fail", color: "bg-[#ef4444]" },
    success: { title: "Success", color: "bg-[#22c55e]" },
}

const LABEL_COLORS: Record<string, string> = {
    backend: "bg-[#1e293b] text-[#38bdf8]",
    frontend: "bg-[#1e1b2e] text-[#a78bfa]",
    design: "bg-[#1b1b1b] text-[#f472b6]",
    docs: "bg-[#172554] text-[#60a5fa]",
    perf: "bg-[#1c1917] text-[#fb923c]",
    testing: "bg-[#052e16] text-[#4ade80]",
    breaking: "bg-[#2d1b1b] text-[#f87171]",
}

function TicketCard({
    ticket,
    asHandle,
    ...props
}: { ticket: Ticket; asHandle?: boolean } & Omit<
    ComponentProps<typeof KanbanItem>,
    "value" | "children"
>) {
    const content = (
        <Frame variant="ghost" spacing="sm" className="[--frame-radius:0] p-0">
            <FramePanel className="p-[0.5vw] transition-colors hover:bg-[#1c1c1c]">
                <div className="flex flex-col gap-[0.4vw]">
                    <span className="text-[0.75vw] font-medium text-[#e5e5e5]">{ticket.title}</span>
                    <p className="text-[#545454] line-clamp-2 text-[0.6vw]">
                        {ticket.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-[0.2vw]">
                        {ticket.labels.map((lbl) => (
                            <span key={lbl} className={`text-[0.5vw] px-[0.2vw] py-[0.05vw] ${LABEL_COLORS[lbl] ?? "bg-[#1a1a2e] text-[#888]"}`}>
                                {lbl}
                            </span>
                        ))}
                    </div>
                    <Progress value={ticket.progress} className="h-[0.3vw] rounded-none" />
                    <div className="flex items-center justify-between">
                        <span className="text-[#545454] text-[0.55vw] tabular-nums">
                            {ticket.progress}% complete
                        </span>
                        <span className="text-[#545454] text-[0.55vw] tabular-nums">
                            {ticket.votes} votes
                        </span>
                    </div>
                </div>
            </FramePanel>
        </Frame>
    )

    return (
        <KanbanItem value={ticket.id} {...props}>
            {asHandle ? <KanbanItemHandle>{content}</KanbanItemHandle> : content}
        </KanbanItem>
    )
}

interface KanbanBoardProps {
    tickets: Record<TicketStatus, Ticket[]>
    onTicketsChange: (tickets: Record<TicketStatus, Ticket[]>) => void
    onTicketClick?: (ticket: Ticket) => void
    columnHeight?: string
}

export function TicketKanban({ tickets, onTicketsChange, onTicketClick, columnHeight = "max-h-[55vh]" }: KanbanBoardProps) {
    return (
        <Kanban
            value={tickets}
            onValueChange={onTicketsChange}
            getItemValue={(item) => item.id}
        >
            <KanbanBoard className="!grid-cols-5 gap-[0.4vw]">
                {Object.entries(tickets).map(([colId, items]) => {
                    const col = COLUMNS[colId as TicketStatus]
                    return (
                        <KanbanColumn key={colId} value={colId}>
                            <Frame spacing="sm" className={`[--frame-radius:0] p-[0.5vw] gap-[0.3vw] h-full ${columnHeight}`}>
                                <FrameHeader className="flex flex-row items-center gap-[0.35vw] px-[0.3vw]">
                                    <div className={cn("w-[0.45vw] h-[0.45vw] rounded-full", col.color)} />
                                    <FrameTitle className="text-[0.7vw] font-medium text-white tracking-wide">{col.title}</FrameTitle>
                                    <Badge variant="outline" className="ml-auto rounded-none h-auto text-[0.55vw] px-[0.3vw] py-[0.05vw]">
                                        {items.length}
                                    </Badge>
                                </FrameHeader>
                                <KanbanColumnContent
                                    value={colId}
                                    className="flex flex-col gap-[0.3vw] p-[0.75vw] overflow-y-auto flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                                >
                                    {items.map((ticket) => (
                                        <div key={ticket.id} onClick={() => onTicketClick?.(ticket)}>
                                            <TicketCard ticket={ticket} asHandle />
                                        </div>
                                    ))}
                                </KanbanColumnContent>
                            </Frame>
                        </KanbanColumn>
                    )
                })}
            </KanbanBoard>
            <KanbanOverlay className="bg-muted/10 border-2 border-dashed" />
        </Kanban>
    )
}
