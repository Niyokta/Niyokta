import React from "react";
import { RefinedAnalyticsDataType } from "@/lib/types/AnalyticsData";
import { box_shadow } from "@/resource/theme";
import ChartLoader from "./ChartLoader";
import CustomChart from "./CustomChart";
export default function YearlyProjectAnalysis({loading,refinedData,currentyear}:{loading:boolean,refinedData:RefinedAnalyticsDataType[],currentyear:Number}) {
    return (
        <>
            <div className="w-full h-[400px] flex justify-between my-[20px]">
                <div className="w-[100%] h-full rounded-md overflow-hidden" style={{ boxShadow: box_shadow }}>
                    {loading ? <ChartLoader /> : <CustomChart refinedData={refinedData} title={`January ${currentyear} - December ${currentyear}`} />}
                </div>
            </div>
        </>
    )
}