import React from "react";
import { Button } from "../ui/button";
import { ProjectModel } from "@/lib/types/ProjectType";
import Link from "next/link";
import { div_color } from "@/resource/theme";
export default function ProjectsMap({ projects }: { projects: ProjectModel[] }) {
    return (
        <div className="mt-[50px]" style={{backgroundColor:div_color}}>
            <div className="w-full h-[50px] border-b-[1px] border-black flex items-center font-medium">
                <p className="w-[15%] h-[50%] border-r-[1px] border-black text-center">Hosted On</p>
                <p className="w-[55%] h-[50%] border-r-[1px] border-black text-center">Project Title</p>
                <p className="w-[15%] h-[50%] border-r-[1px] border-black text-center">Status</p>
                <p className="w-[15%] h-[50%] text-center"> Budget Range </p>
            </div>
            {
                projects.map((project, index) => {
                    return (
                        <div key={index} className="w-full h-[50px] border-b-[1px] border-black  flex items-center">
                            <p className="w-[15%] h-[50%] border-r-[1px] border-black text-center">{`${project.created_at?.slice(8, 10)} / ${project.created_at?.slice(5, 7)} / ${project.created_at?.slice(0, 4)}`}</p>
                            <p className="w-[55%] h-[50%] border-r-[1px] border-black text-justify px-[20px]">{project.title.slice(0,80)+" ......"}</p>
                            <p className="w-[15%] h-[50%] border-r-[1px] border-black text-center font-bold capitalize" style={{color:project.status==="completed"?"green":"red"}}>{project.status}</p>
                            <p className="w-[15%] h-[50%] text-center">₹ {Number(project.min_budget).toLocaleString('en-US')} - ₹ {Number(project.max_budget).toLocaleString('en-US')}</p>
                        </div>
                    )
                })
            }
            <div className="w-full flex justify-end px-[10px] text-[15px] underline text-blue-600 font-medium cursor-pointer py-[10px]"><Link href="/projects">view all Projects</Link></div>
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