'use client'
import React from "react";
import { useAppSelector } from "@/lib/reduxHooks";
import GeneralLoader from "@/components/general/GeneralLoader";
import ClientChat from "@/components/ClientChat/ClientChat";
export default function ChildLayout({children}:{children:React.ReactNode}){
    const username=useAppSelector(state=>state.user.userName);

    return(
        username==""?<GeneralLoader/>:(
            <div>
                {children}
                <ClientChat/>
            </div>
        )
    )
}