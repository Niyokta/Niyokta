
import React from "react";
import Image from "next/image";
import RecentProjects from "./RecentProjects";
export default function DashboardComponent() {
    return (
        <div className="w-full h-full">
            <div className="w-full h-[200px] md:h-[750px]">
                <video src="/images/welcome.mp4" className="w-full h-full" autoPlay muted></video>
            </div>
            <RecentProjects />
        </div>
    )
}