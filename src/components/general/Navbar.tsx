'use client'
import React from "react";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/lib/reduxHooks";
import { loadingstate } from "@/lib/features/userdetails";
import { border_color, box_shadow, div_color, navbar_background, navbar_logo_color, navbar_text_color, primary_accent_text, primary_background_color, text_color } from "@/resource/theme";
export default function Navbar() {
    const dispatch=useAppDispatch();
    const {toast}=useToast();
    const router = useRouter();
    const handlesignout=async ()=>{
        dispatch(loadingstate(true));
        const response=await fetch('/api/Auth/SignOut',{
            method:'GET'
        })
        const res=await response.json();
        console.log("message : ",res.message)
        console.log(res)
        if(res.status=="200") {
            router.replace('/auth/signin');
            toast({title:res.message});
            return;
        }
    }
    return (
            <div className="w-[100%] h-[60px] rounded-md flex justify-between px-[20px] items-center mt-[20px]" style={{ boxShadow: box_shadow,userSelect:'none',backgroundColor:navbar_background,color:navbar_text_color }}>
                <ul>
                    <li className="font-bold md:text-[25px] cursor-pointer" style={{color:navbar_logo_color}} onClick={()=>router.push("/dashboard")}>Niyokta</li>
                </ul>
                <ul className="flex w-[70%] md:w-[20%] justify-around text-[12px] md:text-[17px] items-center font-medium">
                    <li onClick={() => router.push('/projects')} className="cursor-pointer underline underline-offset-2">Projects</li>
                    <li onClick={() => router.push('/people')} className="cursor-pointer underline underline-offset-2">People</li>
                    <li>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="items-center flex" ><CgProfile className="w-[30px] h-[30px]"/></DropdownMenuTrigger>
                            <DropdownMenuContent className="mt-[30px] md:mr-[50px] md:w-[200px] border-[1px]" style={{backgroundColor:div_color,boxShadow:box_shadow,color:text_color,borderColor:border_color}}>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer" onClick={()=>{dispatch(loadingstate(true));router.push('/profile')}}>My Profile</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={()=>router.push('/dashboard')}>Dashboard</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={()=> router.push("/manage-projects")} >Manage Projects</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={()=> router.push("/bid-insight")} >Bid Insights</DropdownMenuItem>
                                <DropdownMenuItem>Premium Membership</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Accounts</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Withdraw</DropdownMenuItem>
                                <DropdownMenuItem>Transaction History</DropdownMenuItem>
                                <DropdownMenuItem>Your Wallet</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Theme</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className="cursor-pointer font-medium" onClick={handlesignout}>Sign Out</DropdownMenuLabel>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </li>
                </ul>

            </div>
    )
}