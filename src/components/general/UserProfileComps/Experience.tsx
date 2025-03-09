import React from "react";
import { div_color,box_shadow, border_color } from "@/resource/theme";
export type ExpPayload={
    company:string,descriprion:string,id:number,title:string,userId:number,yearFrom:string,yearTo:string
}
export default function Experience({experiences}:{experiences:ExpPayload[]}){
    return(
        <div className="w-full font-light text-[13px] mt-[20px] p-[20px] rounded-md" style={{boxShadow: box_shadow ,backgroundColor:div_color}}>
            <p className="font-bold text-[20px] pb-[10px] mb-[20px] border-b-2" style={{borderColor:border_color}}>Experience</p>
            {
                experiences.length===0?<div className="flex items-center justify-center">
                No Experiences Added
            </div>:
                experiences.map((experience, index) => {
                    return (
                        <div className="w-[300px] h-[100px] text-[12px] mb-[10px] p-[10px]"  key={index}>
                            <p className="">{experience.title}</p>
                            <p className="text-[20px] font-medium">{experience.company}</p>
                            <span><p>{experience.yearFrom} - {experience.yearTo}</p></span>
                        </div>
                    )
                })
            }
        </div>
    )
}