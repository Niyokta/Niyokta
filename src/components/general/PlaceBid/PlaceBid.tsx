'use client'
import React from "react";
import { ProjectModel } from "@/lib/types/ProjectType";
import { DummyProject } from "@/lib/types/ProjectType";
import { useToast } from "@/hooks/use-toast";
export default function PlaceBidComponent({ projectId }: { projectId: number }) {
    const {toast}=useToast()
    const [projectDetails,setProjectDetails]=React.useState<ProjectModel>(DummyProject)
    const [loading,setloading]=React.useState(true)
    const fetchProjectDetails = async () => {
        const response = await fetch("/api/Project/getProject", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                projectId: projectId
            })
        })
        const res = await response.json();
        setProjectDetails(res.project)
        if (res.status === 200) setloading(false);
        else toast({ title: res.message })
    }
    React.useEffect(() => {
        fetchProjectDetails()
    }, [])
    return (
        <div>
            placing bid
        </div>
    )
}