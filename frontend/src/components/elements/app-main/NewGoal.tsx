import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ExpandableScreen, ExpandableScreenTrigger, ExpandableScreenContent } from "@/components/ui/expandable-screen";
import { Input } from "@/components/ui/input";
import { CiCirclePlus } from "react-icons/ci";

const skills = [
    { id: 1, name: 'basketball', level: 'beginner' },
    { id: 2, name: 'football', level: 'intermediate' }
];

export function NewGoal({ buttonName }: { buttonName: string }) {
    return(
        <ExpandableScreen layoutId="new-goal" contentRadius="0.1vw" triggerRadius="0.1vw">
            <ExpandableScreenTrigger>
                <div className="inline-flex items-center justify-center rounded-[0vw] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{buttonName}</div>
            </ExpandableScreenTrigger>
            <ExpandableScreenContent className="bg-white border border-gray-500 !w-[60vw] !h-[60vh]">
                <div className="p-[3vw] text-black">
                    <h2 className="text-2xl text-black">New Goal</h2>
                    <p className="mt-4 text-muted-foreground text-gray-900">Be extra sure before adding a goal to your quarter.</p>
                    <div className="mt-[1vw]">
                        <p className="mb-[0.25vw]">Name</p>
                        <Input className="border-gray-300 p-[1vw] rounded-[0vw]" placeholder="Basketball" />
                    </div>
                    <div className="mt-[1vw]">
                        <p className="mb-[0.25vw]">Description</p>
                        <Input className="border-gray-300 p-[1vw] rounded-[0vw]" placeholder="To become good at dribbling" />
                    </div>
                    <div className="mt-[1vw]">
                        <p className="mb-[0.25vw]">Skills</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger><Button className="border-gray-300 p-[1vw] rounded-[0vw]" >Add Skills</Button></DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[40vw] rounded-[0.1vw] bg-white text-black border border-gray-300">
                                <DropdownMenuItem className="focus:bg-transparent focus:text-inherit">
                                    <div className="flex items-center gap-[0.25vw]">
                                        <CiCirclePlus />
                                        <p>New Skill</p>
                                    </div>
                                </DropdownMenuItem>
                                {skills.map((skill) => (
                                    <DropdownMenuItem className="focus:bg-transparent focus:text-inherit" key={skill.id}>
                                        <div className="flex w-full justify-between items-center">
                                            <p>{skill.name}</p>
                                            <p className="pt-[0.2vw] pb-[0.2vw] pr-[0.5vw] pl-[0.5vw] bg-gray-900 border border-gray-600 w-[7vw] text-center text-white">{skill.level}</p>
                                        </div>
                                    </DropdownMenuItem> 
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </ExpandableScreenContent>
        </ExpandableScreen>
    )
}