import { DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ExpandableScreen, ExpandableScreenTrigger, ExpandableScreenContent } from "@/components/ui/expandable-screen";
import { Input } from "@/components/ui/input";
import { DropdownMenu } from "radix-ui";

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
                            <DropdownMenuTrigger>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Input className="border-gray-300 p-[1vw] rounded-[0vw]" placeholder="basketball-beginner" />
                    </div>
                </div>
            </ExpandableScreenContent>
        </ExpandableScreen>
    )
}