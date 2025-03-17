import React from "react";
import { Button } from "../ui/button";
import { ProjectModel } from "@/lib/types/ProjectType";
import Link from "next/link";
import { box_shadow, div_color, secondary_accent_text } from "@/resource/theme";
export default function ProjectsMap({ projects }: { projects: ProjectModel[] }) {
    return (
        <div className="mt-[20px] text-[12px] md:text-[17px] md:mt-[50px] rounded-md" style={{backgroundColor:div_color,boxShadow:box_shadow}}>
            <div className="w-full h-[50px] border-b-[1px] border-black flex items-center font-bold text-[14px]" style={{color:secondary_accent_text}}>
                <p className="w-[30%] md:w-[15%] border-r-[1px] border-black text-center">Hosted On</p>
                <p className="w-[70%] md:w-[55%]  md:border-r-[1px] border-black text-center">Project Title</p>
                <p className="w-[15%] border-r-[1px] border-black text-center hidden md:block">Status</p>
                <p className="w-[15%] text-center hidden md:block"> Budget Range </p>
            </div>
            {
                projects.map((project, index) => {
                    return (
                        <div key={index} className="w-full min-h-[50px] border-b-[1px] border-black  flex items-center">
                            <p className="w-[30%] md:w-[15%]  border-r-[1px] border-black text-center">{`${project.created_at?.slice(8, 10)} / ${project.created_at?.slice(5, 7)} / ${project.created_at?.slice(0, 4)}`}</p>
                            <p className="w-[70%] md:w-[55%] md:border-r-[1px] border-black md:text-justify px-[10px] md:px-[20px]">{project.title.slice(0,80)}</p>
                            <p className="w-[15%] border-r-[1px] border-black text-center font-bold capitalize hidden md:block" style={{color:project.status==="completed"?"green":"red"}}>{project.status}</p>
                            <p className="w-[15%] text-center hidden md:block">₹ {Number(project.min_budget).toLocaleString('en-US')} - ₹ {Number(project.max_budget).toLocaleString('en-US')}</p>
                        </div>
                    )
                })
            }
            <div className="w-full flex justify-end px-[10px] underline text-blue-600 font-medium cursor-pointer py-[10px]"><Link href="/projects">view all Projects</Link></div>
        </div>
    )
}

export function NoProjects() {
    return (
        <div className="w-full h-[200px] flex flex-col items-center justify-center text-[25px] font-medium" style={{ boxShadow: "1px 1px 5px 1px #eeeeee" }}>
            <p className="py-[10px]">No Projects to show</p>
            <Button variant="outline">Create New Project</Button>
        </div>
    )
}