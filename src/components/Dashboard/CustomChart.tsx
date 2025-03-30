'use client'
import React, { useEffect, useState } from "react";
import { dummyChartData } from "@/resource/data/dummyData";
import { RefinedAnalyticsDataType } from "@/lib/types/AnalyticsData";
import { div_color, navbar_background } from "@/resource/theme";
export default function CustomChart({refinedData,title}:{refinedData:RefinedAnalyticsDataType[],title:String}) {
    const [chartScale,setchartScale]=useState<number>(0);
    function findHightestNumber():Number{
        let hightest=0;
        refinedData.map((data)=>{
            if(data.yCount > hightest) hightest=data.yCount
        })
        console.log("highest number : ",hightest)
        return hightest;
    }
    function findScale(a:any):Number{
        const heightinpixel=400;
        const heightwithouttitle=heightinpixel-100;

        const scale=heightwithouttitle/a;
        console.log("scale is : ",scale)
        setchartScale(scale);
        return scale;

    }
    useEffect(()=>{
        const heightest=findHightestNumber();
        const scale=findScale(heightest);
    },[])
    return (
        <div className="w-full h-full mb-[50px] font-medium flex flex-col justify-end p-[20px]" style={{backgroundColor:div_color}}>
            <p className="text-[15px]" style={{borderColor:navbar_background}}>{title}</p>
            <div className="flex w-full h-full">
                {
                    refinedData.map((data, index) => {
                        return (
                            <div className={`h-full w-[3%] mx-[5px] flex flex-col justify-end`} key={index}>
                                <p className="text-center text-[12px]">{data.yCount}</p>
                                <div className="rounded-sm" style={{ height: (chartScale * data.yCount)+10,backgroundColor:navbar_background }} title={data.xLabel.toString()}>
                                </div>
                            </div>
                        )

                    })
                }
            </div>
        </div>
    )
}