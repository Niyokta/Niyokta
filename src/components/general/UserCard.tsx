import React from "react";
import { FaLinkedinIn, FaGithub, FaXTwitter } from "./reacticons"
import { box_shadow, div_color, primary_accent_text, secondary_accent_text } from "@/resource/theme";
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
export default function UserCard({ payload, filter }: { payload: Payload, filter: string }) {
    return (
        <div className="p-[10px] md:p-[20px] rounded-md font-light text-[11px] md:text-[12px] justify-between items-center" style={{ boxShadow: box_shadow, backgroundColor: div_color, display: filter === "" ? "flex" : payload.username.toUpperCase().includes(filter) ? "flex" : "none" }}>
            <div className="w-[60%] h-full">
                <p className="text-[12px]" style={{ color: primary_accent_text }}>{payload.country === "" ? "India" : payload.country}</p>
                <p className="text-[15px] md:text-[20px] font-medium capitalize" style={{ color: secondary_accent_text }}>{payload.username.length > 20 ? payload.username.slice(0, 20) : payload.username}</p>
                <p className="">Available : {payload.workingHours}</p>
            </div>
            <div className="w-[15%] h-full">
                <span className="flex w-full h-full justify-between items-center">
                    <FaLinkedinIn className="w-[12px] h-[12px] cursor-pointer" />
                    <FaGithub className="w-[12px] h-[12px] cursor-pointer" />
                    <FaXTwitter className="w-[12px] h-[12px] cursor-pointer" />
                </span>
            </div>
        </div>
    )
}