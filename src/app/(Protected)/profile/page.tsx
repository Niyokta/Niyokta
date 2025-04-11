
import React,{useEffect} from "react";
import { PersonalInfo, Education, Experience, Projects } from "@/components";
import { useAppDispatch,useAppSelector } from "@/lib/reduxHooks";
import { loadingstate } from "@/lib/features/userdetails";
export default function profile() {
    
    return (
        <>
            <PersonalInfo />
            <Projects />
            <Education />
            <Experience />
        </>
    )
}