import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { BidType, MyBidType } from "@/lib/types/BidType"
import { PiHandWithdraw } from "react-icons/pi";
import { GrUpdate } from "react-icons/gr";
export function BidTable({ bids }: { bids: MyBidType[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[10%] text-center">No.</TableHead>
                    <TableHead className="w-[40%] text-center">Project Title</TableHead>
                    <TableHead className="w-[15%] text-center">Biding Amount</TableHead>
                    <TableHead className="w-[15%] text-center">Status</TableHead>
                    <TableHead className="w-[10%] text-center">Update</TableHead>
                    <TableHead className="w-[10%] text-center">Withdraw</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bids.map((bid,index) => (
                    <TableRow key={bid.bid_id}>
                        <TableCell className="w-[10%] text-center font-medium">{index+1}</TableCell>
                        <TableCell className="w-[40%] text-left">{bid.project_title}</TableCell>
                        <TableCell className="w-[15%] text-center ">₹ {Number(bid.bidding_price).toLocaleString()}</TableCell>
                        <TableCell className="w-[15%] text-center capitalize font-medium" style={{color:bid.status==="pending" ? "#E67E22" : bid.status==="accepted"?"green":"red"}}>{bid.status}</TableCell>
                        <TableCell className="w-[10%]"><GrUpdate className="w-[15px] h-[15px] cursor-pointer mx-auto" color="blue" title="Update Bid"/></TableCell>
                        <TableCell className="w-[10%]"><PiHandWithdraw className="w-[20px] h-[20px] cursor-pointer mx-auto" title="Withdraw Bid" color="red"/></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
