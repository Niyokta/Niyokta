
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { div_color } from '@/resource/theme';
import { MyBidType } from '@/lib/types/BidType';
export default function ReadProposal({ bid }: { bid: MyBidType }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <p>Read</p>
            </DialogTrigger>
            <DialogContent className="w-[700px]" style={{ backgroundColor: div_color }}>
                <DialogHeader>
                    <DialogTitle>{`Bid's Proposal`}</DialogTitle>
                    <DialogDescription>
                        {`This is the proposal written by the bidder on your project`}
                    </DialogDescription>
                </DialogHeader>
                    <div className='h-[400px]  overflow-y-scroll'>
                        <p className='text-[15px] font-light'>Author : {bid.freelancer_name}</p>
                        <p className='py-[20px] font-light'>{bid.proposal}</p>
                    </div>
            </DialogContent>
        </Dialog>
    )
}
