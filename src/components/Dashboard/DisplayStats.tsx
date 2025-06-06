import React from "react";
import StatsCard from "./StatsCard";
import { convertRatingToStar } from "@/helper/textconversion";

export default function DisplayStats({projects,bids,revenue,rating}:{projects:Number,bids:Number,revenue:Number,rating:Number}) {
    return (
        <div className="w-full flex flex-col md:flex-row my-[10px] md:my-[20px] justify-between">
            <StatsCard title="Total Projects" description="Projects Hosted Till Date" content={projects.toLocaleString()}/>
            <StatsCard title="Total Bids" description="Bids Placed Till Date" content={bids.toLocaleString()}/>
            <StatsCard title="Total Revenue" description="Total Earnings Till Date" content={`Rs. ${revenue.toLocaleString()}`}/>
            <StatsCard title="Freelancer Rating" description="Your Freelancer Rating" content={convertRatingToStar(String(0))}/>
        </div>
    )
}