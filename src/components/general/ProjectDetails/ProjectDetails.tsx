'use client'
import { ProjectModel,DummyProject } from "@/lib/types/ProjectType";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import DetailsLoader from "./DetailsLoader";
import SkillsRequired from "./SkillsRequired";
import Category from "./Category";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { box_shadow, primary_accent_text, secondary_accent_text, text_color } from "@/resource/theme";
export default function ProjectDetails({projectId}:{projectId:number}){
    const {toast}=useToast()
    const [projectDetails,setProjectDetails]=React.useState<ProjectModel>(DummyProject)
    const [loading,setloading]=React.useState<true|false>(true)

    const fetchProjectDetails=async()=>{
        const response=await fetch("/api/Project/getProject",{
            method:"POST",
            credentials:"include",
            body:JSON.stringify({
                projectId:projectId
            })
        })
        const res=await response.json();
        setProjectDetails(res.project)
        if(res.status===200) setloading(false);
        else toast({title:res.message})
    }
    React.useEffect(()=>{
        fetchProjectDetails()
    },[])
    return(
        loading?<DetailsLoader/>:
        <div className="w-[90%] md:w-[50%] mx-auto px-[20px] md:px-[60px] py-[50px] md:pt-[100px] min-h-screen text-[12px] md:text-[15px] font-light" style={{boxShadow:box_shadow}}>
            <div className="w-full h-[50px] flex items-center font-medium text-[13px] md:text-[20px] ">{projectDetails.title.length > 150? projectDetails.title?.slice(0,150)+".....":projectDetails.title}</div>
            <p className="flex pt-[5px]"><p>Status : </p><p className="font-bold text-red-600 px-[5px] pb-[20px] md:mb-[50px]">{projectDetails.status}</p></p>
            <div className="w-full min-h-[200px] max-h-[500px] overflow-hidden md:mt-[20px] flex flex-col md:flex-row">
                <div className="md:w-[60%] w-[100%] h-full py-[0px] md:py-[20px] ">{projectDetails.description}</div>
                <div className="md:w-[40%] w-[100%] h-full py-[20px] md:px-[30px]">
                    <p className="font-medium" style={{color:secondary_accent_text}}>Client Name</p>
                    <p className="pb-[10px] md:pb-[20px]">{projectDetails.client_name}</p>
                    <p className="font-medium" style={{color:secondary_accent_text}}>Client Country</p>
                    <p className="pb-[10px] md:pb-[20px]">{projectDetails.client_country?projectDetails.client_country:"India"}</p>
                    <p className="font-medium" style={{color:secondary_accent_text}}>Opening Date</p>
                    <p className="pb-[10px] md:pb-[20px]">{projectDetails.created_at?.slice(0,10)}</p>
                </div>
            </div>
            <div className="w-full md:mt-[50px] h-[100px] flex items-center gap-5 font-medium justify-between md:justify-normal">
                <div className="flex flex-col md:flex-row w-[40%] items-center gap-2">
                    <p className="md:pr-[20px] md:text-[18px]" style={{color:secondary_accent_text}}>Minimum Bid</p>
                    <Input value={Number(projectDetails.min_budget).toLocaleString('en-US')} disabled className="max-w-[100px] text-center"/>
                </div>
                <div className="flex flex-col md:flex-row w-[40%] items-center justify-end gap-2">
                    <p className="md:pr-[20px] md:text-[18px]" style={{color:secondary_accent_text}}>Maximum Bid</p>
                    <Input value={Number(projectDetails.max_budget).toLocaleString('en-US')} disabled className="max-w-[100px] text-center"/>
                </div>

            </div>
            
            <p className="md:text-[20px] mt-[20px] font-bold" style={{color:secondary_accent_text}}>Skills Required</p>
            <SkillsRequired skills={projectDetails.skills_required}/>
            <p className="md:text-[20px] pt-[20px] font-bold" style={{color:secondary_accent_text}}>Category</p>
            <Category categories={projectDetails.category}/>
            
            <div className="w-full flex justify-end mt-[20px]">
                <Button className="w-[120px] h-[40px] md:w-[200px] md:h-[50px] md:text-[20px]" variant="default">Sign In To Bid</Button>
            </div>
        </div>
    )
}