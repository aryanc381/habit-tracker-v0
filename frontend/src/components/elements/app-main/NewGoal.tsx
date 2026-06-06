import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ExpandableScreen, ExpandableScreenTrigger, ExpandableScreenContent } from "@/components/ui/expandable-screen";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { getAllSkills, createSkill } from "@/services/skills.service";
import type { IAllSkills } from "@/services/skills.service";
import { toast } from "sonner";
import { createGoal } from "@/services/goal.service";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";

const levelChip: Record<string, string> = {
    beginner: "bg-green-100 border-green-700 !text-green-800",
    intermediate: "bg-orange-100 border-orange-700 !text-orange-800",
    advanced: "bg-red-100 border-red-700 !text-red-800",
};

export function NewGoal({ buttonName }: { buttonName: string }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState<IAllSkills[]>([]);
    const [skillIds, setSkillIds] = useState<string[]>([]);
    const [range, setRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: undefined,
    });
    const [skillOpen, setSkillOpen] = useState(false);
    const [skillName, setSkillName] = useState('');
    const [skillDesc, setSkillDesc] = useState('');
    const [skillLevel, setSkillLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");

    const loadSkills = async () => {
        try {
            const res = await getAllSkills();
            setSkills(res.data.skills);
        } catch (err) {
            toast.error(`Failed to load skills ${err}`);
        }
    };

    const handleGoalCreation = async () => {
        if(!range?.to || !range?.from || !name || !description || skillIds.length === 0) {
            toast.error(`Missing / empty details.`)
            return;
        }
        const userId = localStorage.getItem("userId");
        if(!userId || userId === "undefined") {
            localStorage.removeItem("userId");
            toast.error("Please log in again.");
            return;
        }
        const payload = { name, description, startDate: range.from, etaDate: range.to, skillIds, userId };
        try {
            const res = await createGoal(payload);
            if(res.data.status !== 200) {
                toast.error(res.data.msg);
                return;
            }
            toast.success(res.data.msg);
        } catch(err) {
            toast.error('Backend unavailable.')
        }
    }

    const handleSkillCreation = async () => {
        if(!skillName || !skillDesc) {
            toast.error(`Missing skill details.`);
            return;
        }
        try {
            const res = await createSkill({ name: skillName, description: skillDesc, level: skillLevel });
            if(res.data.status !== 200) {
                toast.error(res.data.msg);
                return;
            }
            toast.success(res.data.msg);
            setSkillName('');
            setSkillDesc('');
            setSkillLevel('beginner');
            setSkillOpen(false);
            loadSkills();
        } catch(err) {
            toast.error('Backend unavailable.');
        }
    };

    const toggleSkill = (id: string) => {
        setSkillIds((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
    };

    const selectedSkills = skills.filter((s) => skillIds.includes(s.id));

    return(
        <ExpandableScreen layoutId="new-goal" contentRadius="0.1vw" triggerRadius="0.1vw">
            <ExpandableScreenTrigger>
                <div className="inline-flex items-center justify-center rounded-[0vw] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{buttonName}</div>
            </ExpandableScreenTrigger>
            <ExpandableScreenContent className="bg-white border border-gray-500 ">
                <div className="p-[3vw] text-black">
                    <div className="mb-[1.5vw] border-b border-gray-200 pb-[1vw]">
                        <h2 className="text-[10vw] text-black tracking-[-0.75vw] mt-[-4vw] font-semibold">New Goal</h2>
                        <p className="mt-4 text-muted-foreground text-gray-900">Be extra sure before adding a goal to your quarter.</p>
                    </div>
                    <div className="max-w-[45vw] space-y-[1.2vw]">
                        <div>
                            <p className="mb-[0.4vw] text-xs uppercase tracking-wide text-gray-500 font-medium">Name</p>
                            <Input value={name} onChange={(e) => setName(e.target.value)} className="border-gray-300 p-[1vw] rounded-[0vw] focus:ring-2 focus:ring-gray-300 focus:border-gray-400" placeholder="Basketball" />
                        </div>
                        <div>
                            <p className="mb-[0.4vw] text-xs uppercase tracking-wide text-gray-500 font-medium">Description</p>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} className="border-gray-300 p-[1vw] rounded-[0vw] focus:ring-2 focus:ring-gray-300 focus:border-gray-400" placeholder="To become good at dribbling" />
                        </div>
                        <div>
                            <p className="mb-[0.4vw] text-xs uppercase tracking-wide text-gray-500 font-medium">Skills</p>
                            <div className="flex flex-wrap items-center gap-[0.5vw]">
                                <DropdownMenu onOpenChange={(open) => open && loadSkills()}>
                                    <DropdownMenuTrigger><Button className="bg-white border-gray-300 p-[1vw] rounded-[0vw] cursor-pointer">Add Skills</Button></DropdownMenuTrigger>
                                    <DropdownMenuContent className="mt-[0.25vw] w-[40vw] rounded-[0.1vw] bg-white text-black border border-gray-300">
                                        <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setSkillOpen(true); }} className="rounded-[0vw] cursor-pointer transition-colors text-black decoration-black focus:bg-gray-100 focus:text-black focus:underline data-[highlighted]:bg-gray-100 data-[highlighted]:text-black data-[highlighted]:underline data-[highlighted]:decoration-black data-[highlighted]:font-medium">
                                            <div className="flex items-center gap-[0.25vw] !text-black">
                                                <p className="!text-black ml-[1.45vw]">New Skill</p>
                                            </div>
                                        </DropdownMenuItem>
                                        {skills.map((skill) => (
                                            <DropdownMenuItem onSelect={(e) => { e.preventDefault(); toggleSkill(skill.id); }} className="rounded-[0vw] cursor-pointer transition-colors focus:bg-gray-100 data-[highlighted]:bg-gray-100 data-[highlighted]:text-black" key={skill.id}>
                                                <div className="flex w-full justify-between items-center">
                                                    <div className="flex items-center gap-[0.5vw]">
                                                        <span className="w-[1vw] flex items-center justify-center">{skillIds.includes(skill.id) && <Check className="w-[0.9vw] h-[0.9vw] !text-black" strokeWidth={3} />}</span>
                                                        <p className="!text-gray-500">{skill.name}</p>
                                                    </div>
                                                    <p className={`text-[0.7vw] capitalize text-center border px-[0.5vw] py-[0.2vw] w-[7vw] ${levelChip[skill.level] ?? "bg-gray-100 border-gray-500 text-gray-700"}`}>{skill.level}</p>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {selectedSkills.map((skill) => (
                                    <span key={skill.id} className={`flex items-center gap-[0.4vw] border px-[0.6vw] py-[0.3vw] rounded-[0vw] text-sm ${levelChip[skill.level] ?? "bg-gray-100 border-gray-500 text-gray-700"}`}>
                                        {skill.name}
                                        <button type="button" onClick={() => toggleSkill(skill.id)} className="cursor-pointer font-bold leading-none">×</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="mb-[0.4vw] text-xs uppercase tracking-wide text-gray-500 font-medium">ETA Date</p>
                            <Calendar mode="range" selected={range} onSelect={setRange} className="mt-[0.5vw] light border border-gray-300" />
                        </div>
                        <div>
                            <Button variant={'secondary'} disabled={!name || !range?.to} className="w-full rounded-[0vw] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => {handleGoalCreation()}}>Create goal</Button>
                        </div>
                    </div>

                    <Dialog open={skillOpen} onOpenChange={setSkillOpen}>
                        <DialogContent className="bg-white text-black rounded-[0vw] border border-gray-300">
                            <DialogHeader>
                                <DialogTitle>Create Skill</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-[1vw] mt-[0.5vw]">
                                <div>
                                    <p className="mb-[0.4vw] text-xs uppercase tracking-wide text-gray-500 font-medium">Name</p>
                                    <Input value={skillName} onChange={(e) => setSkillName(e.target.value)} className="border-gray-300 p-[1vw] rounded-[0vw]" placeholder="Dribbling" />
                                </div>
                                <div>
                                    <p className="mb-[0.4vw] text-xs uppercase tracking-wide text-gray-500 font-medium">Description</p>
                                    <Input value={skillDesc} onChange={(e) => setSkillDesc(e.target.value)} className="border-gray-300 p-[1vw] rounded-[0vw]" placeholder="Ball handling basics" />
                                </div>
                                <div>
                                    <p className="mb-[0.4vw] text-xs uppercase tracking-wide text-gray-500 font-medium">Level</p>
                                    <div className="flex gap-[0.5vw]">
                                        {(["beginner", "intermediate", "advanced"] as const).map((lvl) => (
                                            <button key={lvl} type="button" onClick={() => setSkillLevel(lvl)} className={`flex-1 capitalize border px-[0.5vw] py-[0.4vw] rounded-[0vw] cursor-pointer text-sm ${skillLevel === lvl ? levelChip[lvl] : "bg-white border-gray-300 text-gray-600"}`}>{lvl}</button>
                                        ))}
                                    </div>
                                </div>
                                <Button variant={'secondary'} disabled={!skillName || !skillDesc} onClick={() => handleSkillCreation()} className="w-full rounded-[0vw] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Create skill</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </ExpandableScreenContent>
        </ExpandableScreen>
    )
}