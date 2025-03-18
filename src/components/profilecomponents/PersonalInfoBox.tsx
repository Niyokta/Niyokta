import { border_color, box_shadow,primary_accent_text } from "@/resource/theme";
import React from "react";

export default function PersonalInfoBox({key1,val1,key2,val2}:{key1:string,val1:string,key2:string,val2:string}){
    return(
        <div className="w-full min-h-[70px] flex flex-col md:flex-row md:items-center md:my-[20px] justify-between text-[12px] sm:text-[15px] mt-[10px] md:mt-[0px]">
            <span className="w-full min-h-[50px] md:w-[50%] p-[10px] md:p-[20px] rounded-md border-[1px]" style={{borderColor:border_color}}>
                <p className=" font-light" style={{color:primary_accent_text}}>{key1}</p>
                <p className="font-medium">{val1}</p>
            </span>
            <span className={`w-full min-h-[50px] md:w-[48%] p-[10px] md:p-[20px] rounded-md ${key2===""?"hidden":"block"} border-[1px] mt-[10px] md:mt-[0px]` } style={{borderColor:border_color}}>
                <p className="font-light" style={{color:primary_accent_text}}>{key2}</p>
                <p className="font-medium">{val2}</p>
            </span>
        </div>
    )
}