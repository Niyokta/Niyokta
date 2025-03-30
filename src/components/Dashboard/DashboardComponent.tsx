'use client'
import React, { useEffect } from "react";
import RecentProjects from "./RecentProjects";
import CustomChart from "./CustomChart";
import { box_shadow } from "@/resource/theme";
import ChartLoader from "./ChartLoader";
import { useAppSelector } from "@/lib/reduxHooks";
import { returnFullDate, returnMonthByNumber } from "@/helper/date";
import { RefinedAnalyticsDataType } from "@/lib/types/AnalyticsData";
import { useRef } from "react";
export default function DashboardComponent() {
    const [loading, setloading] = React.useState({
        PostCharLoading: true,
        ProjectChartLoading: true,
        ProjectChartMonthlyLoading: true
    })
    const date = new Date();
    const currentyear = date.getFullYear()
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate()
    const refinedData = useRef<RefinedAnalyticsDataType[]>();
    const refinedMonthlyData = useRef<RefinedAnalyticsDataType[]>();
    const projects = useAppSelector(state => state.user.projects);

    function refineDataYearly() {

        const projectMap = new Map<number, number>();

        projects.map((project) => {
            const projectdate = new Date(project.created_at);
            const projectYear = projectdate.getFullYear();

            if (projectYear === currentyear) {
                const month = projectdate.getMonth() + 1;
                let projects = projectMap.get(month);
                if (projects == undefined) projects = 0;
                projectMap.set(month, projects + 1);
            }

        })
        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        for (const tempmonth of months) {
            const monthprojects = projectMap.get(tempmonth);
            if (monthprojects === undefined && tempmonth <= currentMonth) {
                projectMap.set(tempmonth, 0);
            }
        }
        const sortedMap = new Map([...projectMap.entries()].sort((a, b) => a[0] - b[0]));

        const refined: RefinedAnalyticsDataType[] = [];
        sortedMap.forEach((value, key) => {
            const temp = {
                xLabel: returnMonthByNumber(key),
                yCount: Number(value)
            }
            refined.push(temp);
        })
        refinedData.current = refined;
        setloading(() => ({ ...loading, ProjectChartLoading: false }))
    }

    function refineDataMonthly() {
        const projectMap = new Map<number, number>();

        projects.map((project) => {
            const projectdate = new Date(project.created_at);
            const projectMonth = projectdate.getMonth() + 1;

            if (projectMonth === currentMonth) {
                const creationdate = projectdate.getDate();
                let projects = projectMap.get(creationdate);
                if (projects == undefined) projects = 0;
                projectMap.set(creationdate, projects + 1);
            }
        })
        const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
        for (const day of days) {
            const postofday = projectMap.get(day);
            if (postofday === undefined && day <= currentDay) projectMap.set(day, 0);
        }

        const sortedMap = new Map([...projectMap.entries()].sort((a, b) => a[0] - b[0]));

        const refined: RefinedAnalyticsDataType[] = [];
        sortedMap.forEach((value, key) => {
            const temp = {
                xLabel: returnFullDate(key, currentMonth, currentyear),
                yCount: Number(value)
            }
            refined.push(temp);
        })
        refinedMonthlyData.current = refined;
        setloading(() => ({ ...loading, ProjectChartLoading: false, ProjectChartMonthlyLoading: false }))
    }
    useEffect(() => {
        refineDataYearly()
        refineDataMonthly()
    }, [])
    return (
        <div className="w-full h-full">
            <div className="w-full hidden md:block">
                <p className="text-[15px] font-medium px-[10px] uppercase">Monthly Project Analytics</p>
                <div className="w-full h-[400px] flex justify-between my-[20px]">
                    <div className="w-[100%] h-full rounded-md overflow-hidden" style={{ boxShadow: box_shadow }}>
                        {loading.ProjectChartMonthlyLoading ? <ChartLoader /> : <CustomChart refinedData={refinedMonthlyData.current ? refinedMonthlyData.current : []} title={`${returnMonthByNumber(currentMonth)}`} />}
                    </div>
                </div>
                <p className="text-[15px] font-medium px-[10px] uppercase">Yearly Project Analytics</p>
                <div className="w-full h-[400px] flex justify-between my-[20px]">
                    <div className="w-[100%] h-full rounded-md overflow-hidden" style={{ boxShadow: box_shadow }}>
                        {loading.ProjectChartLoading ? <ChartLoader /> : <CustomChart refinedData={refinedData.current ? refinedData.current : []} title={`${currentyear}`} />}
                    </div>
                </div>
            </div>
            <div className="w-full h-[200px] md:h-[750px]">
                <video src="/images/welcome.mp4" className="w-full h-full" autoPlay muted></video>
            </div>
            <RecentProjects />
        </div>
    )
}