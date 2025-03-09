import React from "react";
import { div_color,box_shadow,border_color } from "@/resource/theme";
export type EduPayload = {
    courseName: string,
    id: number
    institute: string,
    userId: number,
    yearFrom: string,
    yearTo: string
}
export default function Education({ educations }: { educations: EduPayload[] }) {
    return (
        <div className="w-full min-h-[100px] font-light text-[13px] mt-[20px] p-[20px] rounded-md" style={{boxShadow: box_shadow ,backgroundColor:div_color}}>
            <p className="font-bold text-[20px] pb-[10px] mb-[20px] border-b-2" style={{borderColor:border_color}}>Education</p>
            {
                educations.length===0?<div className="flex items-center justify-center">
                    No Education Added
                </div>:
                educations.map((education, index) => {
                    return (
                        <div className="w-[300px] h-[100px] text-[12px] mb-[10px] p-[10px]"  key={index}>
                            <p className="">{education.courseName}</p>
                            <p className="text-[20px] font-medium">{education.institute}</p>
                            <span><p>{education.yearFrom} - {education.yearTo}</p></span>
                        </div>
                    )
                })
            }
        </div>
    )
}