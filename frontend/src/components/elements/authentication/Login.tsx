import { useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center">
            <MagicCard className="w-full max-w-md">
                <div className="p-[1vw] leading-[2vw]">
                    <div className="">
                        <p className="text-[1.5vw]">Login</p>
                        <p className="text-gray-400">Welcome back, login to your habit-tracker.</p>
                    </div>
                    <div className="mt-[1vw]">
                        <p className="mt-[0.35vw]">Email</p>
                        <Input value={email} onChange={(e) => {setEmail(e.target.value)}} className="rounded-[0.1vw] h-[2vw]" placeholder="aryan@riverline.ai"/>
                        <p className="mt-[0.35vw]">Password</p>                        
                        <Input value={password} onChange={(e) => {setPassword(e.target.value)}} className="rounded-[0.1vw] h-[2vw]" placeholder="*******************" />
                    </div>
                    <div className="flex justify-end mt-[2vw] gap-[0.5vw]">
                        <Button className="rounded-[0.1vw] p-[1vw] w-[5vw] cursor-pointer" onClick={() => {navigate(-1)}}>Back</Button>
                        <Button className="rounded-[0.1vw] p-[1vw] w-[5vw] cursor-pointer" onClick={() => {}}>Login</Button>
                    </div>
                </div>
            </MagicCard>
        </div>
    );
}