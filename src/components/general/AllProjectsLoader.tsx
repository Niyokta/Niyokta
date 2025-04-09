import React from "react";
import { Skeleton } from "../ui/skeleton";
import { loader_background } from "@/resource/theme";
export default function AllProjectsLoader(){
    return(
      <div className="w-full flex gap-3">
      <Skeleton className="w-[30%] h-screen mt-[20px]" style={{backgroundColor:loader_background}}/>
      <div className=" flex-1 flex-col mt-[20px]">
        <Skeleton className="w-full h-[200px] mb-[20px]" style={{backgroundColor:loader_background}}/>
        <Skeleton className="w-full h-[200px] mb-[20px]" style={{backgroundColor:loader_background}}/>
        <Skeleton className="w-full h-[200px] mb-[20px]" style={{backgroundColor:loader_background}}/>
        <Skeleton className="w-full h-[200px] mb-[20px]" style={{backgroundColor:loader_background}}/>
      </div>
    </div>
    )
}