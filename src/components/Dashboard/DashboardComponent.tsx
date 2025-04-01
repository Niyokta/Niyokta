'use client'
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/reduxHooks";
import { returnFullDate, returnMonthByNumber } from "@/helper/date";
import { RefinedAnalyticsDailyDataType, RefinedAnalyticsDataType } from "@/lib/types/AnalyticsData";
import { useRef } from "react";
import { MonthlyProjectChart } from "./MonthlyProjectChart";
import { DailyProjectChart } from "./DailyProjectChart";
import { ProjectTypePieChart } from "./ProjectTypePieChart";
import { AnnualCostSpending } from "./AnnualCostSpending";
export default function DashboardComponent() {
    const [loading, setloading] = React.useState({
        PostCharLoading: true,
        ProjectChartLoading: true,
        ProjectChartMonthlyLoading: true
    })

    const [activeProjectAnalysis, setactiveProjectAnalysis] = React.useState<boolean>(true)
    const date = new Date();
    const currentyear = date.getFullYear()
    const currentMonth = date.getMonth()+1;
    const currentDay = date.getDate();
    const refinedData = useRef<RefinedAnalyticsDataType[]>();
    const refineDailyData = useRef<RefinedAnalyticsDailyDataType[]>();
    const refinedCostData=useRef<{month:String,spent:number,earned:number}[]>([])
    const projects = useAppSelector(state => state.user.projects);
    const bids=useAppSelector(state=>state.user.bids)
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
                month: returnMonthByNumber(key),
                projects: value
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

        const refined: RefinedAnalyticsDailyDataType[] = [];
        sortedMap.forEach((value, key) => {
            const temp = {
                date: returnFullDate(key, currentMonth, currentyear),
                projects: value
            }
            refined.push(temp);
        })
        refineDailyData.current = refined;
        setloading(() => ({ ...loading, ProjectChartLoading: false, ProjectChartMonthlyLoading: false }))
    }
    function annualCostAnalysis(){
        const spentMap=new Map<number,number>();
        const earnedMap=new Map<number,number>();

        let temp=1;
        while(temp <= currentMonth){
            spentMap.set(temp,0);
            earnedMap.set(temp,0);
            temp=temp+1;
        }
        projects.map((project)=>{
            const projectdate=new Date(project.created_at);
            const projectyear=projectdate.getFullYear();
            const projectMonth=projectdate.getMonth()+1;
            if(projectyear===currentyear){
                const spenttilldate=spentMap.get(projectMonth)
                if(spenttilldate===undefined)spentMap.set(projectMonth,project.closing_price);
                else spentMap.set(projectMonth,spenttilldate+project.closing_price);
            }
        })
        bids.map((bid)=>{
            const biddate=new Date(bid.submitted_at);
            const bidyear=biddate.getFullYear();
            const bidmonth=biddate.getMonth()+1;
            if(bidyear===currentyear && bid.status==="completed"){
                const earnedtilldate=earnedMap.get(bidmonth);
                if(earnedtilldate===undefined) earnedMap.set(bidmonth,Number(bid.bidding_price));
                else earnedMap.set(bidmonth,earnedtilldate+Number(bid.bidding_price));
            }
        })
        const refinedData:{month:String,
            spent:number,
            earned:number}[]=[];

        for(let i=1;i<=currentMonth;i++){
            const earned=earnedMap.get(i);
            const spent=spentMap.get(i);
            const month=returnMonthByNumber(i);
            if(earned!=undefined && spent!=undefined){
                refinedData.push({
                    month:month,
                    earned:earned,
                    spent:spent,
                })
            }
        }
        refinedCostData.current=refinedData
    }
    useEffect(() => {
        pieChartData()
        annualCostAnalysis();
        refineDataYearly()
        refineDataMonthly()
    }, [])
    return (
        <div className="w-full h-full">
            <p className="text-[15px] font-medium uppercase px-[10px]">Project Analysis</p>
            <div className="w-full flex my-[20px] justify-between">
                <div className="w-[49%]"><ProjectTypePieChart ongoing={pieData.ongoing} pending={pieData.pending} completed={pieData.completed}/></div>
                <div className="w-[49%]"><AnnualCostSpending chartData={refinedCostData.current?refinedCostData.current:[]}/></div>
            </div>
            <div className="w-full">
                <div className="w-full flex justify-end py-[10px]">
                    <select onChange={(e) => {
                        setactiveProjectAnalysis(!activeProjectAnalysis)
                    }} className="text-[15px] font-medium outline-none">
                        <option value="Yearly Analysis">Monthly Project Analysis</option>
                        <option value="Yearly Analysis">Daily Project Analysis</option>
                    </select>
                </div>
                {
                    activeProjectAnalysis ? <MonthlyProjectChart chartData={refinedData.current?refinedData.current:[]}/> : <DailyProjectChart chartData={refineDailyData.current?refineDailyData.current:[]}/>
                }
            </div>
        </div>
    )
}