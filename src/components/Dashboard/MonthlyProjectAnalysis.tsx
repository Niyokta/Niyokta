import React from "react";
import { RefinedAnalyticsDataType } from "@/lib/types/AnalyticsData";
import { box_shadow } from "@/resource/theme";
import ChartLoader from "./ChartLoader";
import { returnMonthByNumber } from "@/helper/date";
import CustomChart from "./CustomChart";
export default function MonthlyProjectAnalysis({ loading, refinedData, currentMonth }: { loading: boolean, refinedData: RefinedAnalyticsDataType[], currentMonth: number }) {
    const date=new Date();
    const currentyear=date.getFullYear()
    return (
        <>
            <div className="w-full h-[400px] flex justify-between my-[20px]">
                <div className="w-[100%] h-full rounded-md overflow-hidden" style={{ boxShadow: box_shadow }}>
                    {loading ? <ChartLoader /> : <CustomChart refinedData={refinedData} title={`${returnMonthByNumber(currentMonth)} ${currentyear}`} />}
                </div>
            </div>
        </>
    )
}