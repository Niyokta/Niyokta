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
import { CgChevronDoubleLeft, CgChevronDoubleRight } from 'react-icons/cg';

import { useToast } from '@/hooks/use-toast';
import DeleteProject from './DeleteProject';
export default function ListProject() {
    const {toast}=useToast()
    const projects = useAppSelector(state => state.user.projects)
    const sortedprojects=[...projects].sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const [finalProjects,setfinalProjects]=React.useState(sortedprojects)
    const [indexing,setindex]=React.useState({
        first:0,
        last:8
    })
    const lastindex=projects.length

    async function deleteproject(id:number){
        await fetch('/api/User/RemoveProject',{
            method:'POST',
            body:JSON.stringify({
                projectID:id
            })
        })
        .then((res)=>res.json())
        .then((res)=>{
            removeProjectFromTable(id);
            toast({title:res.message,description:""});
        })
    }
    function removeProjectFromTable(id:number){
        setfinalProjects(finalProjects.filter(project=>project.project_id!=id))
    }
    return (
        projects.length > 0 ? <div className='w-full h-[500px] py-[20px] px-[20px] rounded-md mt-[10px]' style={{ backgroundColor: div_color, boxShadow: box_shadow }}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[5%] text-center">No.</TableHead>
                        <TableHead className="w-[40%] text-center">Project Title</TableHead>
                        <TableHead className="w-[10%] text-center">Project Status</TableHead>
                        <TableHead className="w-[10%] text-center">Creation Date</TableHead>
                        <TableHead className="w-[10%] text-center">Bid Count</TableHead>
                        <TableHead className="w-[10%] text-center">Min. Price</TableHead>
                        <TableHead className="w-[10%] text-center">Max. Price</TableHead>
                        <TableHead className="w-[5%] text-center">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {finalProjects.slice(indexing.first,indexing.last).map((project, index) => {
                        const date = new Date(project.created_at);
                        const projectDate = date.getDate();
                        const projectMonth = date.getMonth() + 1;
                        const projectYear = date.getFullYear();
                        const currentPage=Math.ceil(indexing.last/8)
                        const temp=(currentPage-1) * 8;
                        return (
                            <TableRow key={index} className=''>
                                <TableCell className="w-[5%] text-center">{temp+index + 1}</TableCell>
                                <TableCell className='w-[40%] text-left capitalize'>{project.title.slice(0, 70)}</TableCell>
                                <TableCell className='w-[10%] text-center capitalize'>{project.status}</TableCell>
                                <TableCell className="w-[10%] text-center">{`${projectDate < 10 ? "0":""}${projectDate} - ${projectMonth < 10 ? "0":""}${projectMonth} - ${projectYear}`}</TableCell>
                                <TableCell className="w-[10%] text-center">{project.bids.length}</TableCell>
                                <TableCell className="w-[10%] text-center">{`Rs. ${Number(project.min_budget).toLocaleString()}`}</TableCell>
                                <TableCell className="w-[10%] text-center">{`Rs. ${Number(project.max_budget).toLocaleString()}`}</TableCell>
                                <TableCell className="w-[5%] text-center cursor-pointer"><DeleteProject deleteProject={deleteproject} projectId={project.project_id}/></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={8} className=''>
                            <div className='w-[200px] flex mx-auto pt-[30px] text-[15px] items-center justify-between'>
                                <CgChevronDoubleLeft className='opacity-45 cursor-pointer' onClick={()=>{
                                    if(indexing.first > 0){
                                        setindex({first:indexing.first-8,last:indexing.last-8});
                                    }
                                }}/>
                                <p className='px-[10px] py-[2px] font-bold rounded-sm opacity-45' style={{backgroundColor:"inherit",boxShadow:box_shadow}}>{1}</p>
                                <p className='px-[10px] py-[2px] font-bold rounded-sm' style={{backgroundColor:"inherit",boxShadow:box_shadow}}>{Math.ceil(indexing.last/8)}</p>
                                <p className='px-[10px] py-[2px] font-bold rounded-sm opacity-45' style={{backgroundColor:"inherit",boxShadow:box_shadow}}>{lastindex/8===0 ? 1 : Math.ceil(finalProjects.length/8)}</p>
                                <CgChevronDoubleRight className='opacity-45 cursor-pointer' onClick={()=>{
                                    if(finalProjects.length > indexing.last){
                                        setindex({first:indexing.first+8,last:indexing.last+8})
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
