import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { loader_background } from "@/resource/theme";
export default function DetailsLoader(){
    return(
        <div className="w-[90%] md:w-[50%] mx-auto px-[20px] py-[50px] h-screen">
            <Skeleton className="w-full h-[50px]" style={{backgroundColor:loader_background}}/>
            <Skeleton className="w-[200px] h-[20px] mt-[10px] bg-[#eeeeee]" style={{backgroundColor:loader_background}}/>
            <Skeleton className="w-full h-[500px] mt-[20px] bg-[#eeeeee]" style={{backgroundColor:loader_background}}/>
            <Skeleton className="w-full h-[120px] mt-[10px] bg-[#eeeeee]" style={{backgroundColor:loader_background}}/>
            <Skeleton className="w-full h-[120px] mt-[10px] bg-[#eeeeee]" style={{backgroundColor:loader_background}}/>
            <span className="w-full flex justify-end"><Skeleton className="w-[400px] h-[50px] mt-[20px]" style={{backgroundColor:loader_background}}/></span>
        </div>
    )
}