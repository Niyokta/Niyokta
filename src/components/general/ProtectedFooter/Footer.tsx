import { footerItems } from "@/helper/FooterItems";
import { box_shadow, div_color } from "@/resource/theme";
import React from "react";

export default function Footer(){
    return(
        <div className="w-full h-[500px] p-[50px] rounded-md mt-[50px]" style={{backgroundColor:div_color,boxShadow:box_shadow}}>
            <div className="w-full h-[400px] grid grid-cols-4 auto-rows-min gap-4">
                {
                    footerItems.map((item,index)=>{
                        return(
                            <p className="text-[15px] font-light underline text-center cursor-pointer" key={index}>{item.itemLabel}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}