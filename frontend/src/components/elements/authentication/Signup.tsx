import { useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { signup } from "@/services/auth.service";
import { toast } from "sonner";

export function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async() => {
        try {
            const res = await signup(name, email, password);
            if(res.status === 200) { toast.success(res.data.msg); navigate('/login'); }
            else { toast.error(res.data.msg); }
        } catch(err) { toast.error('Backend server is not running.'); }
    }  

    return (
        <div className="flex min-h-screen items-center justify-center">
            <MagicCard className="w-full max-w-md">
                <div className="p-[1vw] leading-[2vw]">
                    <div className="">
                        <p className="text-[1.5vw]">Signup</p>
                        <p className="text-gray-400">Enter your credentials to get access of the habit-tracker.</p>
                    </div>
                    <div className="mt-[1vw]">
                        <p>Full Name</p>
                        <Input value={name} onChange={(e) => {setName(e.target.value)}} className="rounded-[0.1vw] h-[2vw]" placeholder="aryan chauhan" />
                        <p className="mt-[0.35vw]">Email</p>
                        <Input value={email} onChange={(e) => {setEmail(e.target.value)}} className="rounded-[0.1vw] h-[2vw]" placeholder="aryan@riverline.ai"/>
                        <p className="mt-[0.35vw]">Password</p>                        
                        <Input value={password} onChange={(e) => {setPassword(e.target.value)}} className="rounded-[0.1vw] h-[2vw]" placeholder="*******************" />
                    </div>
                    <div className="flex justify-end mt-[2vw] gap-[0.5vw]">
                        <Button className="rounded-[0.1vw] p-[1vw] w-[5vw] cursor-pointer" onClick={() => {navigate(-1)}}>Back</Button>
                        <Button className="rounded-[0.1vw] p-[1vw] w-[5vw] cursor-pointer" onClick={() => {handleSignup();}}>Signup</Button>
                    </div>
                </div>
            </MagicCard>
        </div>
    );
}