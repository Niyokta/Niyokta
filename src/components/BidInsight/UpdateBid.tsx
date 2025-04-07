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
export default function UpdateBid({ bid }: { bid: MyBidType }) {

    const [updatedBidDetails,setupdatedBidDetails]=React.useState({
        proposal:bid.proposal,
        biddingPrice:bid.bidding_price
    })
    const [usePrev,setusePrev]=React.useState({
        proposal:true,
        biddingPrice:true
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <GrUpdate className="w-[15px] h-[15px] cursor-pointer mx-auto" color="blue" title="Update Bid" style={{ cursor: bid.status === "pending" ? "pointer" : "not-allowed" }} />
            </DialogTrigger>
            <DialogContent className="w-[700px]" style={{ backgroundColor: div_color }}>
                <DialogHeader>
                    <DialogTitle>Update Bid</DialogTitle>
                    <DialogDescription>
                        Make changes to your bid here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <p className='text-[15px] font-medium pb-[5px]'>Updated Proposal</p>
                    <Textarea className='h-[300px]'></Textarea>
                    <div className='flex w-full gap-2 pt-[10px] items-center'>
                        <Checkbox />
                        <p className='text-[15px] font-light'>Use Previous Proposal</p>
                    </div>
                    <p className='text-[15px] font-medium pt-[20px] pb-[5px]'>New Bidding Price</p>
                    <Input type='number'/>
                    <div className='flex w-full gap-2 pt-[10px] items-center'>
                        <Checkbox />
                        <p className='text-[15px] font-light'>Use Previous Bidding Price</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
