import React from "react";
import { Skeleton } from "../ui/skeleton";
import { loader_background } from "@/resource/theme";

export default function GeneralLoader() {
    return (
        <div className="w-full h-screen py-[20px]">
            <Skeleton className="w-full h-[200px]" style={{backgroundColor:loader_background}}/>
            <Skeleton className="w-full h-[400px] mt-[20px]" style={{backgroundColor:loader_background}}/>
            <Skeleton className="w-full h-[100px] mt-[20px]" style={{backgroundColor:loader_background}}/>
            <Skeleton className="w-full h-[100px] mt-[20px]" style={{backgroundColor:loader_background}}/>
        </div>
    )
}