import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ExpandableScreen, ExpandableScreenTrigger, ExpandableScreenContent } from "@/components/ui/expandable-screen";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { CiCirclePlus } from "react-icons/ci";
import { getAllSkills } from "@/services/skills.service";
import type { IAllSkills } from "@/services/skills.service";
import { toast } from "sonner";
import { createGoal } from "@/services/goal.service";

const levelColor: Record<string, string> = {
    beginner: "bg-green-600",
    intermediate: "bg-orange-600",
    advanced: "bg-red-600",
};

const levelChip: Record<string, string> = {
    beginner: "bg-green-100 border-green-700 text-green-800",
    intermediate: "bg-orange-100 border-orange-700 text-orange-800",
    advanced: "bg-red-100 border-red-700 text-red-800",
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
                                        <DropdownMenuItem className="rounded-[0vw] cursor-pointer transition-colors text-black decoration-black focus:bg-gray-100 focus:text-black focus:underline data-[highlighted]:bg-gray-100 data-[highlighted]:text-black data-[highlighted]:underline data-[highlighted]:decoration-black data-[highlighted]:font-medium">
                                            <div className="flex items-center gap-[0.25vw] !text-black">
                                                <CiCirclePlus className="text-black" />
                                                <p className="!text-black">New Skill</p>
                                            </div>
                                        </DropdownMenuItem>
                                        {skills.map((skill) => (
                                            <DropdownMenuItem onSelect={(e) => { e.preventDefault(); toggleSkill(skill.id); }} className="rounded-[0vw] cursor-pointer transition-colors focus:bg-gray-100 data-[highlighted]:bg-gray-100 data-[highlighted]:text-black" key={skill.id}>
                                                <div className="flex w-full justify-between items-center">
                                                    <div className="flex items-center gap-[0.5vw]">
                                                        <span className="w-[1vw]">{skillIds.includes(skill.id) ? "✓" : ""}</span>
                                                        <p className="!text-gray-500">{skill.name}</p>
                                                    </div>
                                                    <p className={`pt-[0.2vw] pb-[0.2vw] pr-[0.5vw] pl-[0.5vw] w-[7vw] text-center text-white ${levelColor[skill.level] ?? "bg-gray-600"}`}>{skill.level}</p>
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
                </div>
            </ExpandableScreenContent>
        </ExpandableScreen>
    )
}