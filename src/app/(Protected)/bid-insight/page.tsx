'use client'
import AreaChartForBidInsight from "@/components/BidInsight/AreaChartForBidInsight";
import { BidTable } from "@/components/BidInsight/BidTable";
import YearlyBidInsightAreaChart from "@/components/BidInsight/YearlyBidInsightAreaChart";
import { returnMonthByNumber } from "@/helper/date";
import { useAppSelector } from "@/lib/reduxHooks";
import { border_color, box_shadow, div_color, primary_accent_text, primary_background_color } from "@/resource/theme";
import React from "react";


export default function BidInsight() {
    const bids = useAppSelector(state => state.user.bids)
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const [monthlyChart, setmonthlyChart] = React.useState<boolean>(true)
    function refineBidData() {
        const totalbidmap = new Map<String, number>();
        const acceptedbidmap = new Map<String, number>();

        let temp = 1;
        while (temp <= currentMonth) {
            const monthName = returnMonthByNumber(temp);
            totalbidmap.set(monthName, 0);
            acceptedbidmap.set(monthName, 0);
            temp = temp + 1;
        }

        bids.map((bid) => {
            const biddate = new Date(bid.submitted_at);
            const bidMonth = biddate.getMonth() + 1;
            const bidyear = biddate.getFullYear();

            if (bidyear === currentYear) {
                const bidmonthname = returnMonthByNumber(bidMonth);
                const bidstillnow = totalbidmap.get(bidmonthname);
                if (bidstillnow !== undefined) {
                    totalbidmap.set(bidmonthname, bidstillnow + 1);
                    if (bid.status === "accepted") {
                        const acceptedtillnow = acceptedbidmap.get(bidmonthname)
                        if(acceptedtillnow!=undefined){
                            acceptedbidmap.set(bidmonthname, acceptedtillnow + 1) 
                        }
                    }
                }
            }
        })
        const refinedData: { monthName: String, total: number, accepted: number }[] = [];
        totalbidmap.forEach((value, key) => {
            const acceptedval=acceptedbidmap.get(key);
            if (acceptedval != undefined) {
                const data = {
                    monthName: key,
                    total: value,
                    accepted: acceptedval
                }
                refinedData.push(data);
            }
        })
        return refinedData;
    }
    function refineYearlyData() {
        const refineddata: { year: String, total: number, accepted: number }[] = []
        const totalBidMap = new Map<number, number>();
        const acceptedBidMap = new Map<number, number>();
        let firstyear = currentYear;
        bids.map((bid) => {
            const biddate = new Date(bid.submitted_at);
            const bidyear = biddate.getFullYear();
            if (bidyear < firstyear) firstyear = bidyear
            const prev = totalBidMap.get(bidyear);
            if (prev === undefined) totalBidMap.set(bidyear, 1);
            else {
                totalBidMap.set(bidyear, prev + 1);
            }
            if (bid.status === "accpeted") {
                const prevAccepted = acceptedBidMap.get(bidyear);
                if (prevAccepted === undefined) acceptedBidMap.set(bidyear,1);
                else acceptedBidMap.set(bidyear,prevAccepted+1);
            }
        })
        for (let i = firstyear; i <= currentYear; i++) {
            const data = totalBidMap.get(i);
            const accpetedData=acceptedBidMap.get(i)
            if (data === undefined) totalBidMap.set(i, 0);
            if(accpetedData===undefined) acceptedBidMap.set(i,0);
        }
        const sortedTotalBidMap = new Map([...totalBidMap.entries()].sort((a, b) => a[0] - b[0]));
        sortedTotalBidMap.forEach((value:number, key:number) => {
            const year=String(key)
            const acceptedVal=acceptedBidMap.get(key);
            if(acceptedVal!=undefined){
                const data={
                    year:year,
                    total:value,
                    accepted:acceptedVal
                }
                refineddata.push(data);
            }
        })
        return refineddata;
    }
    return (
        <div className="w-full">
            <div className="flex w-full justify-end">
                <select className="outline-none py-[20px] text-[15px] font-medium" onChange={() => setmonthlyChart(!monthlyChart)}>
                    <option value="">Monthly Bid Insight</option>
                    <option value="">Yearly Bid Insight</option>
                </select>
            </div>
            <div className="w-full rounded-xl" style={{ boxShadow: box_shadow }}>
                {monthlyChart ? <AreaChartForBidInsight refinedData={refineBidData()} /> : <YearlyBidInsightAreaChart refinedData={refineYearlyData()} />}
            </div>
            <p className="py-[20px] text-[15px] font-medium uppercase">Your Bids</p>
            <div className="w-full p-[20px] rounded-md" style={{backgroundColor:div_color,boxShadow:box_shadow}}>
                <div className="w-full min-h-[30px]">
                    <BidTable bids={bids}/>
                </div>
            </div>
        </div>
    )
}