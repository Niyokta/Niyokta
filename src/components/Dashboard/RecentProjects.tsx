'use client'
import React from "react";
import { useAppSelector } from "@/lib/reduxHooks";
import ProjectsMap,{NoProjects} from "./ProjectsMap";
import { primary_accent_text } from "@/resource/theme";
export default function RecentProjects(){
    const projects=useAppSelector(state=>state.user.projects)
    const username=useAppSelector(state=>state.user.userName)
    const sortedProjects=[...projects].reverse();
    const topfive=sortedProjects.slice(0,5);
    return(
        <div className="md:mt-[50px]">
            <p className="text-[15px] md:text-[30px] pt-[30px] font-bold md:text-center" style={{color:primary_accent_text}}>Recent Projects</p>
            {
                username=="" ? <NoProjects/> : <ProjectsMap projects={topfive}/>
            }
        </div>
    )
}