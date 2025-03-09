import React from "react";
import { FaLinkedinIn, FaGithub, FaXTwitter } from "./reacticons"
import { box_shadow, div_color, secondary_accent_text } from "@/resource/theme";
type Payload = {
    username: string,
    email: string,
    linkedin: string,
    github: string,
    x: string,
    DOB: string,
    workingHours: string,
    phoneNumber: string,
    country: string
}
export default function UserCard({ payload ,filter}: { payload: Payload,filter:string }) {
    return (
        <div className="p-[20px] rounded-md text-light text-[12px]" style={{ boxShadow: box_shadow,backgroundColor:div_color ,display:filter===""?"block":payload.username.includes(filter)?"block":"none"}}>
            <p className="text-[20px] font-medium" style={{color:secondary_accent_text}}>{payload.username.length > 20 ? payload.username.slice(0, 20) : payload.username}</p>
            <p className="text-[12px]">{payload.country===""?"India":payload.country}</p>
            <span className="flex w-[60px] justify-between items-center mt-[10px]">
                <FaLinkedinIn className="w-[12px] h-[12px] cursor-pointer"/>
                <FaGithub className="w-[12px] h-[12px] cursor-pointer"/>
                <FaXTwitter className="w-[12px] h-[12px] cursor-pointer"/>
            </span>
            <p className="pt-[20px] ">D.O.B : {payload.DOB}</p>
            <p className="pt-[10px] ">Working Hours: {payload.workingHours}</p>
        </div>
    )
}