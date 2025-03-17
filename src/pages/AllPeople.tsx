'use client'
import React from "react";
import { UserCard } from "@/components";
import { Input } from "@/components/ui/input";
import { box_shadow, div_color } from "@/resource/theme";
export default function AllPeople() {
    const [loading, setloading] = React.useState<true | false>(true);
    const [users, setusers] = React.useState([{
        username: "",
        email: "",
        country: "",
        workingHours: "",
        DOB: "",
        linkedin: "",
        github: "",
        x: "",
        phoneNumber: ""
    }]);
    const [search, setsearch] = React.useState<string>("");
    const getAllUsers = async () => {
        const allUsers = await fetch(`/api/User/GetAllUsers`, {
            method: "GET",
            credentials: "include"
        })
        const res = await allUsers.json();
        if (res.status === "200") {
            setusers(res.users)
            setloading(false);
        }

    }
    React.useEffect(() => {
        getAllUsers();
    }, [])
    return (
        loading ? (
            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mt-[50px]">
                <div className="min-w-[100px] h-[100px] rounded-md animate-pulse" style={{backgroundColor:div_color,boxShadow:box_shadow}}></div>
                <div className="min-w-[100px] h-[100px] rounded-md animate-pulse" style={{backgroundColor:div_color,boxShadow:box_shadow}}></div>
                <div className="min-w-[100px] h-[100px] rounded-md animate-pulse" style={{backgroundColor:div_color,boxShadow:box_shadow}}></div>
                <div className="min-w-[100px] h-[100px] rounded-md animate-pulse" style={{backgroundColor:div_color,boxShadow:box_shadow}}></div>
                <div className="min-w-[100px] h-[100px] rounded-md animate-pulse" style={{backgroundColor:div_color,boxShadow:box_shadow}}></div>
                <div className="min-w-[100px] h-[100px] rounded-md animate-pulse" style={{backgroundColor:div_color,boxShadow:box_shadow}}></div>
                <div className="min-w-[100px] h-[100px] rounded-md animate-pulse" style={{backgroundColor:div_color,boxShadow:box_shadow}}></div>
                <div className="min-w-[100px] h-[100px] rounded-md animate-pulse" style={{backgroundColor:div_color,boxShadow:box_shadow}}></div>
                <div className="min-w-[100px] h-[100px] rounded-md animate-pulse" style={{backgroundColor:div_color,boxShadow:box_shadow}}></div>
            </div>
        ) : (
            <>
                <div className="h-[70px] md:h-[100px] w-full flex justify-end items-center">
                    <Input placeholder="Search By Username" className="w-full md:w-[300px] md:rounded-[50px] px-[20px] " onChange={(e) => setsearch(e.target.value)} />
                </div>
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                    {
                        users.length === 0 ? <p>Length 0</p> : users.map((user, index) => {
                            return (
                                <UserCard key={index} filter={search.toUpperCase()} payload={{
                                    username: user.username, email: user.email, linkedin: user.linkedin, github: user.github, x: user.x, workingHours: user.workingHours, DOB: user.DOB, country: user.country, phoneNumber: user.phoneNumber
                                }} />
                            )
                        })
                    }
                </div>
            </>
        )

    )
}
