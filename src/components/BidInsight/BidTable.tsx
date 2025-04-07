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
import { useToast } from "@/hooks/use-toast";
import UpdateBid from "./UpdateBid";
export function BidTable({ bids }: { bids: MyBidType[] }) {
    const {toast}=useToast()

    function removeBidsFromTable(bidId:number){
        bids=bids.filter((bid)=>bid.bid_id!=bidId)
    }
    async function withdrawBid(status:string,bidId:number) {
        try{
            if(status=="accepted"){
                toast({title:"Can Not Withdraw Accepted Bid"})
                return;
            }
            await fetch('/api/User/DeleteBid',{
                method:'POST',
                body:JSON.stringify({
                    bidId:bidId
                })
            })
            .then((res)=>res.json())
            .then((res)=>{
                removeBidsFromTable(bidId);
                toast({title:res.message,description:""});
            })
        }
        catch(err){
            if(err instanceof Error)toast({title:err.message})
                else toast({title:"Unknown Error Occured"})
        }
    }
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
                        <TableCell className="w-[10%]"><UpdateBid bid={bid}/></TableCell>
                        <TableCell className="w-[10%]"><PiHandWithdraw className="w-[20px] h-[20px] cursor-pointer mx-auto" title="Withdraw Bid" color="red" style={{cursor:bid.status==="pending"?"pointer":"not-allowed"}} onClick={()=>withdrawBid(bid.status,bid.bid_id)}/></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
