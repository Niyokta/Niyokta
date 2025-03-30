import React from "react";
import { Button } from "../ui/button";
import { ProjectModel } from "@/lib/types/ProjectType";
import Link from "next/link";
import { box_shadow, div_color, secondary_accent_text } from "@/resource/theme";
import { returnMonthByNumber } from "@/helper/date";
export default function ProjectsMap({ projects }: { projects: ProjectModel[] }) {
    return (
        <>

            {
                projects.map((project, index) => {
                    const date = new Date(project.created_at ? project.created_at : "")
                    return (
                        <div key={index} className="w-full rounded-md p-[20px] my-[20px] text-[13px]" style={{ backgroundColor: div_color, boxShadow: box_shadow }}>
                            <p className="text-[15px] font-medium">{project.title}</p>
                            <p className="text-[13px] font-light">{project.description}</p>
                            <div className="w-full flex justify-between pt-[10px]">
                                <p>Total Bids - {project.bids.length}</p>
                                <p>Created On - {`${date.getDate()} ${returnMonthByNumber(date.getMonth() + 1)} ${date.getFullYear()}`}</p>
                                <p>Minimum Price - {project.min_budget}</p>
                                <p>Maximum Price - {project.max_budget}</p>
                                <p>Status - {project.status}</p>
                            </div>
                        </div>
                    )
                })
            }
            <div className="w-full flex justify-end">
                <Link href={"/projects"} className="text-[15px] font-light underline px-[10px]">View All Projects</Link>
            </div>

        </>

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