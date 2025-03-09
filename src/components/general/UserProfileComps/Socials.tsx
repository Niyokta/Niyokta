import React from "react";
import Link from "next/link";
import { FaLinkedinIn, FaGithub, FaXTwitter } from "../reacticons"
import { border_color, box_shadow, div_color } from "@/resource/theme";
export default function Socials({ linkedin, github, x }: { linkedin: string, github: string, x: string }) {
    return (
        <div className="w-full font-light text-[13px] mt-[20px] p-[20px] rounded-md" style={{ boxShadow: box_shadow ,backgroundColor:div_color}}>
            <p className="font-bold text-[20px] pb-[10px] mb-[20px] border-b-2" style={{borderColor:border_color}}>Socials</p>
            <div className=" w-[300px] flex justify-between">
                <Link href={linkedin}><FaLinkedinIn className="w-[40px] h-[40px]"/></Link>
                <Link href={github}><FaGithub className="w-[40px] h-[40px]"/></Link>
                <Link href={x}><FaXTwitter className="w-[40px] h-[40px]"/></Link>
            </div>
        </div>
    )
}