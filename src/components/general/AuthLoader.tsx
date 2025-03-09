import { border_color, box_shadow, div_color } from "@/resource/theme";
import React from "react";

export default function AuthLoader(){
    return(
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[400px] h-[350px] border-2 animate-pulse rounded-md" style={{boxShadow:box_shadow,borderColor:border_color,backgroundColor:div_color}}>
            </div>
        </div>
    )
}