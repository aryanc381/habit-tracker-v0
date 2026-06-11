import { Button } from "@/components/ui/button";
import { ExpandableScreen, ExpandableScreenTrigger, ExpandableScreenContent } from "@/components/ui/expandable-screen";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { createTicket } from "@/services/tickets.service";

interface NewTicketProps {
    goalId: string;
    onTicketCreated?: () => void;
}

export function NewTicket({ goalId, onTicketCreated }: NewTicketProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreation = async () => {
        if(!name || !description) {
            toast.error("Missing ticket details.");
            return;
        }
        try {
            const res = await createTicket({ name, description, goalId });
            if(res.data.status !== 200) {
                toast.error(res.data.msg);
                return;
            }
            toast.success(res.data.msg);
            setName('');
            setDescription('');
            onTicketCreated?.();
        } catch {
            toast.error("Backend unavailable.");
        }
    };

    return(
        <ExpandableScreen layoutId="new-ticket" contentRadius="0.1vw" triggerRadius="0.1vw">
            <ExpandableScreenTrigger>
                <Button className="cursor-pointer rounded-[0.1vw]">Add Ticket</Button>
            </ExpandableScreenTrigger>
            <ExpandableScreenContent className="bg-white border border-gray-500">
                <div className="p-[3vw] text-black">
                    <div className="mb-[1.5vw] border-b border-gray-200 pb-[1vw]">
                        <h2 className="text-[10vw] text-black tracking-[-0.55vw] mt-[-4vw] font-semibold">New Ticket</h2>
                        <p className="mt-4 text-muted-foreground text-gray-900">Add a new ticket to this goal.</p>
                    </div>
                    <div className="max-w-[45vw] space-y-[1.2vw]">
                        <div>
                            <p className="mb-[0.4vw] text-xs uppercase tracking-wide text-gray-500 font-medium">Name</p>
                            <Input value={name} onChange={(e) => setName(e.target.value)} className="border-gray-300 p-[1vw] rounded-[0.1vw]" placeholder="Design landing page" />
                        </div>
                        <div>
                            <p className="mb-[0.4vw] text-xs uppercase tracking-wide text-gray-500 font-medium">Description</p>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} className="border-gray-300 p-[1vw] rounded-[0.1vw]" placeholder="Create the main hero section" />
                        </div>
                        <div>
                            <p className="mb-[0.4vw] text-xs uppercase tracking-wide text-gray-500 font-medium">Goal</p>
                            <Input value={goalId} disabled className="border-gray-300 p-[1vw] rounded-[0.1vw] text-gray-400" />
                        </div>
                        <div>
                            <Button variant={'secondary'} disabled={!name || !description} className="w-full rounded-[0.1vw] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleCreation}>Create ticket</Button>
                        </div>
                    </div>
                </div>
            </ExpandableScreenContent>
        </ExpandableScreen>
    );
}
