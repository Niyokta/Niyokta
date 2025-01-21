'use client'
import React from "react";
import { useAppDispatch } from "@/lib/reduxHooks";
import { updateUser } from "@/lib/features/userdetails";
import { useToast } from "@/hooks/use-toast";
export default function UserDataFetching() {
    const {toast}=useToast()
    const dispatch=useAppDispatch();
    const fetchdata = async () => {

        //  ---------------- If you need to persist the user data even after refresh and make no api calls after every refresh, uncomment below (written by - Sahayak - not copied) ------------------
        
        // const userinlocal=localStorage.getItem('UserInfo')
        // if(userinlocal){
        //     const userdata=JSON.parse(userinlocal)
        //     const payload={
        //         id:userdata.id,
        //         username:userdata.username,
        //         phone:userdata.phoneNumber,
        //         education:userdata.education,
        //         experience:userdata.experience,
        //         email:userdata.email,
        //         projects:userdata.projects,
        //         bids:userdata.bids
        //     }
        //     dispatch(updateUser(payload));
        //     return;
        // };
        await fetch('/api/User', {
            method: 'GET',
            credentials: 'include'
        })
        .then((res => res.json()))
        .then((res) => {
            if (res.status == "200") {
                const payload={
                    id:res.user.id,
                    username:res.user.username,
                    phone:res.user.phoneNumber,
                    education:res.user.educations,
                    experience:res.user.experiences,
                    email:res.user.email,
                    projects:res.user.projects,
                    bids:res.user.bids,
                    working_hours:res.user.workingHours,
                    birth_date:res.user.DOB,
                    freelancer_rating:res.user.freelancer_rating,
                    linkedin:res.user.linkedin,
                    github:res.user.github,
                    x:res.user.x,
                    country:res.user.country
                }
                dispatch(updateUser(payload));
            }
            else{
                toast({title:"Something went wrong!"})
            }
        })
    }
    
    React.useEffect(() => {
        fetchdata()
    })
    return (
        <></>
    )
}