'use client'
import React from "react";
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowUp, BiEdit } from "../general/reacticons"
import { useAppSelector } from "@/lib/reduxHooks";
import PersonalInfoBox from "./PersonalInfoBox";
import { border_color, box_shadow, div_color, primary_accent_text, secondary_accent_text } from "@/resource/theme";
export default function PersonalInfo() {
    const [part, setpart] = React.useState(false);
    return (
        <div className="w-full min-h-[70px] max-h-[500px] mt-[20px] flex flex-col" style={{ boxShadow: box_shadow,backgroundColor:div_color }}>
            <div className="w-full h-[70px] flex items-center justify-between px-[20px]">
                <p className="text-[20px] font-bold">Personal Information</p>
                {!part ? <IoIosArrowDown className="w-[30px] h-[30px] cursor-pointer" onClick={
                    () => {
                        setpart(!part)
                    }
                } /> : <IoIosArrowUp className="w-[30px] h-[30px] cursor-pointer" onClick={
                    () => {
                        setpart(!part)
                    }
                } />}
            </div>

            {/* content  */}


            <div className="w-full max-h-[450px] font-light text-[14px] p-[20px] border-t-[1px]" style={{ display: part ? 'block' : 'none', userSelect: 'none',borderColor:border_color }} >
                <div className="px-[20px] mb-[30px]">
                    <div className="flex">
                        <p className="text-[30px] pr-[10px] uppercase font-medium">{useAppSelector(state => state.user.userName)}</p>
                        <BiEdit className="w-[15px] h-[15px] cursor-pointer" />
                    </div>
                    <div className="flex w-[200px] text-[12px] h-[30px] items-center">
                        <Link href={useAppSelector(state => state.user.linkedin)} className="text-blue-600 font-light pr-[7px]" style={{color:secondary_accent_text}}>LinkedIn | </Link>
                        <Link href={useAppSelector(state => state.user.github)} className="text-blue-600 font-light pr-[7px]" style={{color:secondary_accent_text}}>GitHub |</Link>
                        <Link href={useAppSelector(state => state.user.x)} className="text-blue-600 font-light" style={{color:secondary_accent_text}}>Twitter/X</Link>
                    </div>
                </div>
                <div>
                    <PersonalInfoBox key1="Email ID" val1={useAppSelector(state => state.user.email)} key2="Phone Number" val2={useAppSelector(state => state.user.phoneNumber)} />
                    <PersonalInfoBox key1="Date of Birth" val1={useAppSelector(state => state.user.birth_date)} key2="Nationality" val2={useAppSelector(state => state.user.country)} />
                    <PersonalInfoBox key1="Working Hours" val1={useAppSelector(state => state.user.working_hours)} key2="" val2="" />
                </div>
            </div>
        </div>
    )
}