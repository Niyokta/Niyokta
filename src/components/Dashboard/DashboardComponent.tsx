'use client'
import React, { useEffect, useState } from "react";
import RecentProjects from "./RecentProjects";
import { useAppSelector } from "@/lib/reduxHooks";
import { returnFullDate, returnMonthByNumber } from "@/helper/date";
import { RefinedAnalyticsDataType } from "@/lib/types/AnalyticsData";
import { useRef } from "react";
import YearlyProjectAnalysis from "./YearlyProjectAnalysis";
import MonthlyProjectAnalysis from "./MonthlyProjectAnalysis";
export default function DashboardComponent() {
    const [loading, setloading] = React.useState({
        PostCharLoading: true,
        ProjectChartLoading: true,
        ProjectChartMonthlyLoading: true
    })

    const [activeProjectAnalysis, setactiveProjectAnalysis] = React.useState<boolean>(true)
    const date = new Date();
    const currentyear = date.getFullYear()
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate()
    const refinedData = useRef<RefinedAnalyticsDataType[]>();
    const refinedMonthlyData = useRef<RefinedAnalyticsDataType[]>();
    const projects = useAppSelector(state => state.user.projects);
    const [pieData, setpieData] = useState<{ completed: number, ongoing: number, pending: number }>({
        ongoing: 0,
        pending: 0,
        completed: 0
    })
    function pieChartData() {
        let completed = 0;
        let ongoing = 0;
        let pending = 0;
        projects.map((project) => {
            if (project.status === "pending") pending++;
            else if (project.status === "completed") completed++;
            else ongoing++;
        })
        setpieData({ ongoing: ongoing, completed: completed, pending: pending })
    }
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
        pieChartData()
        refineDataYearly()
        refineDataMonthly()
    }, [])
    return (
        <div className="w-full h-full">
            <p className="text-[15px] font-medium uppercase px-[10px]">Project Analysis</p>
            <div className="w-full hidden md:block">
                <div className="w-full flex justify-end">
                    <select onChange={(e) => {
                        setactiveProjectAnalysis(!activeProjectAnalysis)
                    }} className="text-[15px] font-medium outline-none">
                        <option value="Yearly Analysis">Yearly Project Analysis</option>
                        <option value="Yearly Analysis">Monthly Project Analysis</option>
                    </select>
                </div>
                {
                    activeProjectAnalysis ? <YearlyProjectAnalysis loading={loading.ProjectChartLoading} refinedData={refinedData.current ? refinedData.current : []} currentyear={currentyear} /> : <MonthlyProjectAnalysis loading={loading.ProjectChartMonthlyLoading} refinedData={refinedMonthlyData.current ? refinedMonthlyData.current : []} currentMonth={currentMonth} />
                }
            </div>

            <div className="w-full h-[200px] md:h-[750px] md:hidden">
                <video src="/images/welcome.mp4" className="w-full h-full" autoPlay muted></video>
            </div>
            <RecentProjects />
        </div>
    )
}