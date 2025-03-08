import React from "react";
import { Skeleton } from "../ui/skeleton";
import { loader_background } from "@/resource/theme";
export default function AllProjectsLoader(){
    return(
        <div className='grid grid-flow-row grid-col-1 md:grid-cols-2 gap-10 mt-[100px]'>
          <Skeleton className='h-[150px]' style={{backgroundColor:loader_background}}/>
          <Skeleton className='h-[150px]' style={{backgroundColor:loader_background}}/>
          <Skeleton className='h-[150px]' style={{backgroundColor:loader_background}}/>
          <Skeleton className='h-[150px]' style={{backgroundColor:loader_background}}/>
          <Skeleton className='h-[150px]' style={{backgroundColor:loader_background}}/>
          <Skeleton className='h-[150px]' style={{backgroundColor:loader_background}}/>
          <Skeleton className='h-[150px]' style={{backgroundColor:loader_background}}/>
          <Skeleton className='h-[150px]' style={{backgroundColor:loader_background}}/>
        </div>
    )
}