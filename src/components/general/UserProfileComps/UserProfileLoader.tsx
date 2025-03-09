import { Skeleton } from "@/components/ui/skeleton";
import { box_shadow, div_color } from "@/resource/theme";
import React from "react";

export default function UserProfileLoader() {
    return (
        <div className="w-full h-full">
            <div className="p-[20px] rounded-md h-[285px] animate-pulse" style={{ boxShadow: box_shadow,backgroundColor:div_color }}>
                {/* <Skeleton className="w-[400px] h-[100px]"/>
                <Skeleton className="w-[300px] h-[20px] mt-[10px]"/> */}
            </div>

            {/* socials */}
            <div className="w-full h-[120px] font-light text-[13px] mt-[20px] p-[20px] rounded-md animate-pulse" style={{ boxShadow: box_shadow,backgroundColor:div_color }}>
                {/* <p className="font-bold text-[20px] pb-[10px] mb-[20px]">Socials</p>
                <div className=" w-[300px] flex justify-between">
                    <Skeleton className="w-[70px] h-[70px]" />
                    <Skeleton className="w-[70px] h-[70px]" />
                    <Skeleton className="w-[70px] h-[70px]" />
                </div> */}
            </div>
            {/* experience  */}
            <div className="w-full h-[200px] font-light text-[13px] mt-[20px] p-[20px] rounded-md animate-pulse" style={{ boxShadow: box_shadow,backgroundColor:div_color }}>
                {/* <p className="font-bold text-[20px] pb-[10px] mb-[20px] ">Experience</p>
                <Skeleton className="w-[300px] h-[100px] text-[12px] mb-[10px] p-[10px]">

                </Skeleton> */}
            </div>

            {/* Education  */}
            <div className="w-full h-[200px] font-light text-[13px] mt-[20px] p-[20px] rounded-md animate-pulse" style={{ boxShadow: box_shadow,backgroundColor:div_color }}>
                {/* <p className="font-bold text-[20px] pb-[10px] mb-[20px] ">Education</p>
                <Skeleton className="w-[300px] h-[100px] text-[12px] mb-[10px] p-[10px]">

                </Skeleton> */}
            </div>
        </div>
    )
}