import React from "react";
import { Skeleton } from "../ui/skeleton";
import { loader_background } from "@/resource/theme";
import { RefinedAnalyticsDataType } from "@/lib/types/AnalyticsData";

export default function ChartLoader() {
    const customData = [100, 200, 150, 300, 200, 350, 80, 150, 120, 280, 200, 150, 150, 100, 200, 150, 300, 200, 350, 80, 150, 120, 280, 200, 150, 150]
    return (
        <div className="w-full h-full p-[20px] flex flex-col">
            <p className="text-[15px]">Loading Analytics</p>
            <div className="flex w-full h-full">
                {
                    customData.map((data,index) => {
                        return (
                            <div className="w-[40px] h-full flex flex-col justify-end mx-[5px]" key={index}>
                                <Skeleton className="w-[40px]" style={{ height: data }} color={loader_background} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}