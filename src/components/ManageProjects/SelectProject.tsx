import { useAppSelector } from '@/lib/reduxHooks'
import { ProjectModel } from '@/lib/types/ProjectType'
import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { border_color, div_color } from '@/resource/theme'


export default function SelectProject({setactiveProjectId}:{setactiveProjectId:React.Dispatch<React.SetStateAction<number | null>>}) {
    const projects = useAppSelector(state => state.user.projects)
    const [filteredProjects, setfilteredProjects] = React.useState<ProjectModel[]>([])

    React.useEffect(() => {
        const filtered = projects.filter((project:ProjectModel) => project.status == "pending")
        setfilteredProjects(filtered);
    }, [])
    return (
        <div className='w-full'>
            <Select onValueChange={(e)=>setactiveProjectId(Number(e))} >
                <SelectTrigger className="w-full h-[50px] text-[15px] outline-none px-[20px]" style={{borderColor:border_color}}>
                    <SelectValue placeholder="Select a Project To Monitor Bids" />
                </SelectTrigger>
                <SelectContent style={{backgroundColor:div_color}}>
                    <SelectGroup className=''>
                        {
                            filteredProjects.map((project,index)=>{
                                return(
                                    <SelectItem value={project.project_id.toString()} key={index}>{project.title}</SelectItem>
                                )
                            })
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
