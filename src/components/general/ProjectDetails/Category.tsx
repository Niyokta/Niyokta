import { box_shadow, div_color } from "@/resource/theme";
import React from "react";

export default function Category({categories}:{categories:string[]}){
    return(
        <div className="w-full h-[70px] items-center text-[12px] md:text-[15px] grid grid-flow-row grid-cols-2 md:grid-cols-5">
            {
                categories.map((category,index)=>{
                    return(
                        <p key={index} className="px-[7px] min-h-[50px] mr-[20px] rounded-md font-medium text-center flex justify-center items-center" style={{backgroundColor:div_color,boxShadow:box_shadow}}>{category}</p>
                    )
                })
            }
        </div>
    )
}