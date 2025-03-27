
import React from "react";
import { PlaceBidComponent } from "@/components";

export default async function PlaceBid({params}:{params:Promise<{project_id:number}>}){
    const projectId=(await params).project_id

    return(
        <PlaceBidComponent projectId={projectId}/>
    )
}