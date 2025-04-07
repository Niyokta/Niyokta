import React from 'react'
import { GrUpdate } from "react-icons/gr";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { div_color } from '@/resource/theme';
import { Textarea } from '../ui/textarea';
import { MyBidType } from '@/lib/types/BidType';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '@/hooks/use-toast';
export default function UpdateBid({ bid }: { bid: MyBidType }) {
    const {toast}=useToast()
    const [updatedBidDetails,setupdatedBidDetails]=React.useState({
        proposal:bid.proposal,
        biddingPrice:bid.bidding_price,
        wordCount:0
    })
    const [usePrev,setusePrev]=React.useState({
        proposal:false,
        biddingPrice:false
    })
    async function updateBid(){
        try{
            if(bid.status!="pending"){
                toast({title:`Can not update ${bid.status} bid`})
                return;
            }
            await fetch('/api/User/UpdateBid',{
                method:'POST',
                body:JSON.stringify({
                    bidId:bid.bid_id,
                    proposal:usePrev.proposal ? bid.proposal : updatedBidDetails.proposal,
                    biddingPrice:usePrev.biddingPrice ? bid.bidding_price : updatedBidDetails.biddingPrice
                })
            })
            .then((res)=>res.json())
            .then((res)=>{
                toast({title:res.message,description:""});
            })
        }
        catch(err){
            if(err instanceof Error)toast({title:err.message})
                else toast({title:"Unknown Error Occured"})
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <GrUpdate className="w-[15px] h-[15px] cursor-pointer mx-auto" color="blue" title="Update Bid" style={{ cursor: bid.status === "pending" ? "pointer" : "not-allowed" }} />
            </DialogTrigger>
            <DialogContent className="w-[700px]" style={{ backgroundColor: div_color }}>
                <DialogHeader>
                    <DialogTitle>Update Bid</DialogTitle>
                    <DialogDescription>
                        {`Make changes to your bid here. Click save when you're done.`}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <p className='text-[15px] font-medium pb-[5px]'>Updated Proposal</p>
                    <Textarea className='h-[300px] font-light' value={updatedBidDetails.proposal} onChange={(e)=>{
                        const content = e.target.value;
                        if (content.length < 2001) {
                            setupdatedBidDetails(() => ({ ...updatedBidDetails, proposal: e.target.value, wordCount: e.target.value.length }))
                        }
                    }} spellCheck={false}></Textarea>
                    <p className='text-[15px] text-right'>{updatedBidDetails.wordCount} / 2000</p>
                    <div className='flex w-full gap-2 pt-[10px] items-center'>
                        <Checkbox onCheckedChange={()=>setusePrev(()=>({...usePrev,proposal:!usePrev.proposal}))}/>
                        <p className='text-[15px] font-light'>Use Previous Proposal</p>
                    </div>
                    <p className='text-[15px] font-medium pt-[20px] pb-[5px]'>New Bidding Price</p>
                    <Input type='number' value={bid.bidding_price} onChange={(e)=>{
                        setupdatedBidDetails(()=>({...updatedBidDetails,biddingPrice:e.target.value}))
                    }}/>    
                    <div className='flex w-full gap-2 pt-[10px] items-center'>
                        <Checkbox onCheckedChange={()=>setusePrev(()=>({...usePrev,biddingPrice:!usePrev.biddingPrice}))}/>
                        <p className='text-[15px] font-light'>Use Previous Bidding Price</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={updateBid}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
