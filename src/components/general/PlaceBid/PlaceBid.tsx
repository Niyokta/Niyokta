'use client'
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { primary_accent_text, secondary_accent_text } from "@/resource/theme";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/lib/reduxHooks";

type BidDetailsType = {
    proposal: string,
    wordcount: number,
    biddingPrice: number
}

export default function PlaceBidComponent({ min, max, projectId, projectTitle, clientCountry, clientName }: { min: string, max: string, projectId: number, projectTitle: string, clientCountry: string, clientName: string }) {
    const { toast } = useToast();

    const [biddetail, setbiddetail] = React.useState<BidDetailsType>({
        proposal: "",
        wordcount: 0,
        biddingPrice: 0
    })
    const [errors, seterrors] = React.useState({
        errorInPrice: true,
        priceError: "",
    })
    const freelancerID = useAppSelector(state => state.user.userid);
    const freelancerName = useAppSelector(state => state.user.userName);
    const freelancerRating = useAppSelector(state => state.user.freelancer_rating);
    async function handleplacebid() {

        /* to give in body
        freelancer_id
        project_id
        bidding_price
        freelancer_name
        proposal
        project_title
        client_country
        client_name
        freelancer_rating
        */
        if (errors.errorInPrice) {
            toast({ title: "Invalid Bidding Price Provided" })
        }
        try {

            fetch("/api/User/PlaceBid", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    freelancer_id: freelancerID,
                    project_id: projectId,
                    bidding_price: biddetail.biddingPrice,
                    freelancer_name: freelancerName,
                    proposal: biddetail.proposal,
                    project_title: projectTitle,
                    client_country: clientCountry,
                    client_name: clientName,
                    freelancer_rating: freelancerRating
                })
            })
                .then((res) => res.json())
                .then((res) => toast({ title: res.message }))
        }
        catch (err) {
            if (err instanceof Error) {
                toast({ title: err.message });
            }
            else toast({ title: "Unknown Error Occured" })
        }
    }
    return (
        <div>
            <p className="text-[15px] md:text-[30px] font-bold pt-[20px] md:pt-[40px] md:py-[20px]" style={{ color: primary_accent_text }}>Biding Price</p>
            <Input type="number" className="md:h-[50px] md:text-[20px]" onChange={(e) => {
                const minimum = Number(min);
                const maximum = Number(max);
                const current = Number(e.target.value);
                if (current < minimum) {
                    seterrors(() => ({ ...errors, errorInPrice: true, priceError: "* Price should be more than Minimum Bid-Price" }));
                }
                else if (current > maximum) {
                    seterrors(() => ({ ...errors, errorInPrice: true, priceError: "* Price should not exceed Maximum Bid-Price" }));
                }
                else {
                    setbiddetail(() => ({ ...biddetail, biddingPrice: current }));
                    seterrors(() => ({ ...errors, errorInPrice: false, priceError: "" }));
                }
            }} />
            <p className="text-red-600 pt-[5px] font-medium text-right">{errors.priceError}</p>
            <p className="text-[15px] md:text-[30px] font-bold pt-[20px] md:pt-[40px] md:py-[20px]" style={{ color: primary_accent_text }}>Your Proposal</p>
            <Textarea className="h-[200px] md:h-[350px] md:text-[15px]" value={biddetail.proposal} onChange={(e) => {
                const content = e.target.value;
                if (content.length < 2001) {
                    setbiddetail(() => ({ ...biddetail, proposal: e.target.value, wordcount: e.target.value.length }))
                }
            }} spellCheck={false} />
            <p className="text-right py-[5px]">{biddetail.wordcount} / 2000</p>
            <div className="w-full flex justify-end pt-[30px] "><Button onClick={handleplacebid} className="md:text-[20px] md:font-bold">Submit Proposal</Button></div>
        </div>
    )
}