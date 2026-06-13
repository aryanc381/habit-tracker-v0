import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getTasksByTicketId, createTask, updateTaskStatus } from "@/services/tasks.service"
import api from "@/services/api"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import type { Ticket } from "../kanban/KanbanBoard"

interface TicketDetailProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    ticket: Ticket
    goalId: string
}

export function TicketDetail({ open, onOpenChange, ticket, goalId }: TicketDetailProps) {
    const [tasks, setTasks] = useState<any[]>([])
    const [skills, setSkills] = useState<any[]>([])
    const [addingSkillId, setAddingSkillId] = useState<string | null>(null)
    const [newTaskTitle, setNewTaskTitle] = useState("")

    useEffect(() => {
        if (!open) return
        fetchTasks()
        fetchSkills()
    }, [open])

    const fetchTasks = async () => {
        try {
            const res = await getTasksByTicketId(ticket.id)
            if (res.data.status !== 200) {
                toast.error(res.data.msg)
                return
            }
            setTasks(res.data.tasks)
        } catch {
            toast.error("Failed to load tasks.")
        }
    }

    const fetchSkills = async () => {
        try {
            const res = await api.get(`/skills/goalBased/${goalId}`)
            if (res.data.status !== 200) {
                toast.error(res.data.msg)
                return
            }
            setSkills(res.data.skills.map((s: any) => s.skill))
        } catch {
            toast.error("Failed to load skills.")
        }
    }

    const handleCreateTask = async (skillId: string) => {
        if (!newTaskTitle.trim()) return
        try {
            const res = await createTask({ title: newTaskTitle.trim(), skillId, ticketId: ticket.id })
            if (res.data.status !== 200) {
                toast.error(res.data.msg)
                return
            }
            toast.success(res.data.msg)
            setNewTaskTitle("")
            setAddingSkillId(null)
            fetchTasks()
        } catch {
            toast.error("Backend unavailable.")
        }
    }

    const handleToggleStatus = async (taskId: string, currentStatus: boolean) => {
        try {
            const res = await updateTaskStatus(taskId, !currentStatus)
            if (res.data.status !== 200) {
                toast.error(res.data.msg)
                return
            }
            fetchTasks()
        } catch {
            toast.error("Backend unavailable.")
        }
    }

    const tasksForSkill = (skillId: string) => tasks.filter((t: any) => t.skillId === skillId)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[40vw] rounded-[0vw]">
                <DialogHeader>
                    <DialogTitle className="text-[1.5vw]">{ticket.title}</DialogTitle>
                    <DialogDescription className="text-[0.75vw]">{ticket.description}</DialogDescription>
                </DialogHeader>

                <div className="space-y-[0.8vw]">
                    {skills.map((skill: any) => (
                        <div key={skill._id}>
                            <div className="flex items-center justify-between border-t pt-[0.5vw] mb-[0.3vw]">
                                <span className="text-[0.7vw] font-medium">{skill.name}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-[1.2vw] w-[1.2vw] rounded-[0vw]"
                                    onClick={() => setAddingSkillId(addingSkillId === skill._id ? null : skill._id)}
                                >
                                    <Plus className="h-[0.7vw] w-[0.7vw]" />
                                </Button>
                            </div>

                            {addingSkillId === skill._id && (
                                <div className="flex gap-[0.3vw] mb-[0.3vw]">
                                    <Input
                                        value={newTaskTitle}
                                        onChange={(e) => setNewTaskTitle(e.target.value)}
                                        className="h-[1.5vw] text-[0.6vw] rounded-[0vw]"
                                        placeholder="Task name"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleCreateTask(skill._id)
                                        }}
                                    />
                                    <Button
                                        size="sm"
                                        className="h-[1.5vw] text-[0.6vw] rounded-[0vw]"
                                        onClick={() => handleCreateTask(skill._id)}
                                    >
                                        Add
                                    </Button>
                                </div>
                            )}

                            {tasksForSkill(skill._id).length === 0 && !addingSkillId && (
                                <p className="text-[0.55vw] text-muted-foreground">No tasks yet.</p>
                            )}

                            {tasksForSkill(skill._id).map((task: any) => (
                                <div key={task._id} className="flex items-center gap-[0.4vw] py-[0.15vw]">
                                    <Checkbox
                                        checked={task.status}
                                        onCheckedChange={() => handleToggleStatus(task._id, task.status)}
                                        className="rounded-[0vw] h-[0.7vw] w-[0.7vw]"
                                    />
                                    <span className={cn("text-[0.65vw]", task.status && "line-through text-muted-foreground")}>
                                        {task.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
