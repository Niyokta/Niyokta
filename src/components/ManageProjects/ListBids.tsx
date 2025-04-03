import { useAppSelector } from '@/lib/reduxHooks'
import { BidType } from '@/lib/types/BidType';
import { ProjectModel } from '@/lib/types/ProjectType';
import React from 'react'
import NoBidsOnProject from './NoBidsOnProject';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useRouter } from 'next/navigation';
import { convertRatingToStar } from '@/helper/textconversion';
import { CircleCheckBig } from 'lucide-react';
import { BadgeX } from 'lucide-react';
export default function ListBids({ activeProjectId }: { activeProjectId: number | null }) {
    const projects = useAppSelector(state => state.user.projects);
    const router = useRouter()
    const activeProject = projects.filter((project: ProjectModel) => project.project_id === activeProjectId)[0];
    return (
        activeProject.bids.length > 0 ?
            <div className='w-full py-[50px]'>
                <Table>

                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[5%] text-center'>No.</TableHead>
                            <TableHead className='w-[10%] text-center'>Bidder Name</TableHead>
                            <TableHead className='w-[10%] text-center'>Bidding Amount</TableHead>
                            <TableHead className='w-[10%] text-center'>{`Bidder's Country`}</TableHead>
                            <TableHead className='w-[10%] text-center'>{`Working Hours`}</TableHead>
                            <TableHead className='w-[10%] text-center'>{`Bidder's Rating`}</TableHead>
                            <TableHead className='w-[5%] text-center'>Profile</TableHead>
                            <TableHead className='w-[5%] text-center'>Proposal</TableHead>
                            <TableHead className='w-[5%] text-center'>Accept</TableHead>
                            <TableHead className='w-[5%] text-center'>Reject</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activeProject.bids.map((bid: BidType, index) => (
                            <TableRow key={index}>
                                <TableCell className='w-[5%] text-center'>{index + 1}</TableCell>
                                <TableCell className='w-[10%] text-center capitalize'>{bid.freelancer_name}</TableCell>
                                <TableCell className='w-[10%] text-center'>Rs. {Number(bid.bidding_price).toLocaleString()}</TableCell>
                                <TableCell className='w-[10%] text-center'>{bid.user.country}</TableCell>
                                <TableCell className='w-[10%] text-center'>{bid.user.workingHours}</TableCell>
                                <TableCell className='w-[10%] text-center text-[15px]'>{convertRatingToStar(bid.user.freelancer_rating)}</TableCell>
                                <TableCell className='w-[5%] text-center cursor-pointer' onClick={() => router.push(`/${bid.freelancer_name}`)}>View</TableCell>
                                <TableCell className='w-[5%] text-center  cursor-pointer'>Read</TableCell>
                                <TableCell className='w-[5%] text-center cursor-pointer' title='Accept Bid'>
                                    <CircleCheckBig className='w-[20px] h-[20px] mx-auto' color='green'/>
                                </TableCell>
                                <TableCell className='w-[5%] text-center cursor-pointer' title='Reject Bid'>
                                    <BadgeX className='w-[20px] h-[20px] mx-auto' color='red'/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div> : <NoBidsOnProject />
    )
}
