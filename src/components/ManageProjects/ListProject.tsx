import { useAppSelector } from '@/lib/reduxHooks'
import { box_shadow, div_color } from '@/resource/theme'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { returnMonthByNumber } from '@/helper/date'
import { CgChevronDoubleLeft, CgChevronDoubleRight } from 'react-icons/cg';
import { Trash } from 'lucide-react';
export default function ListProject() {
    const projects = useAppSelector(state => state.user.projects)
    const [index,setindex]=React.useState({
        first:0,
        last:8
    })
    const lastindex=projects.length
    return (
        projects.length > 0 ? <div className='w-full h-[400px] p-[20px] rounded-md mt-[50px]' style={{ backgroundColor: div_color, boxShadow: box_shadow }}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[10%] text-center">No.</TableHead>
                        <TableHead className="w-[40%] text-center">Project Title</TableHead>
                        <TableHead className="w-[10%] text-center">Project Status</TableHead>
                        <TableHead className="w-[10%] text-center">Creation Date</TableHead>
                        <TableHead className="w-[10%] text-center">Proposal Count</TableHead>
                        <TableHead className="w-[10%] text-center">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.slice(index.first,index.last).map((project, index) => {
                        const date = new Date();
                        const projectDate = date.getDate();
                        const projectMonth = date.getMonth() + 1;
                        const projectmonthname = returnMonthByNumber(projectMonth)
                        const projectYear = date.getFullYear();
                        return (
                            <TableRow key={index}>
                                <TableCell className="w-[10%] text-center font-medium">{index + 1}</TableCell>
                                <TableCell className='w-[40%] text-left'>{project.title.slice(0, 80)}</TableCell>
                                <TableCell className='w-[10%] text-center capitalize'>{project.status}</TableCell>
                                <TableCell className="w-[10%] text-center">{`${projectDate} ${projectmonthname} ${projectYear}`}</TableCell>
                                <TableCell className="w-[10%] text-center">{project.bids.length}</TableCell>
                                <TableCell className="w-[10%] text-center cursor-pointer"><Trash className='mx-auto w-[15px] h-[15px]' color='red' /></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6} className=''>
                            <div className='w-[200px] flex mx-auto pt-[20px] text-[15px] items-center justify-between'>
                                <CgChevronDoubleLeft className='opacity-45' onClick={()=>{
                                    if(index.first > 0){
                                        setindex({first:index.first-8,last:index.last-8});
                                    }
                                }}/>
                                <p className='px-[10px] py-[2px] font-bold rounded-sm opacity-45' style={{backgroundColor:"inherit",boxShadow:box_shadow}}>{1}</p>
                                <p className='px-[10px] py-[2px] font-bold rounded-sm' style={{backgroundColor:"inherit",boxShadow:box_shadow}}>{Math.ceil(index.last/8)}</p>
                                <p className='px-[10px] py-[2px] font-bold rounded-sm opacity-45' style={{backgroundColor:"inherit",boxShadow:box_shadow}}>{lastindex/8===0 ? 1 : Math.ceil(lastindex/8)}</p>
                                <CgChevronDoubleRight className='opacity-45' onClick={()=>{
                                    if(lastindex > index.last){
                                        setindex({first:index.first+8,last:index.last+8})
                                    }
                                }}/>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
            : <div className='w-full h-[400px] p-[20px] rounded-md mt-[50px]'>

            </div>
    )
}
