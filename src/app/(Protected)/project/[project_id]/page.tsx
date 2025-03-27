import React from "react";
import ProjectDetails from "@/components/general/ProjectDetails/ProjectDetails";
export default async function Project({params}:{params:Promise<{project_id:number}>}){
  const projectId=(await params).project_id
  return(
    <ProjectDetails projectId={Number(projectId)}/>
  )
}