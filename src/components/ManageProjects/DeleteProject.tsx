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
import { Trash } from 'lucide-react';
import { Button } from '../ui/button';
export default function DeleteProject({ deleteProject,projectId }: { deleteProject: (id:number)=>void ,projectId:number}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
            <Trash className='mx-auto w-[15px] h-[15px]' color='red'/>
            </DialogTrigger>
            <DialogContent className="w-[700px]" style={{ backgroundColor: div_color }}>
                <DialogHeader>
                    <DialogTitle>{`Delete Project`}</DialogTitle>
                    <DialogDescription>
                        {`This is the proposal written by the bidder on your project`}
                    </DialogDescription>
                </DialogHeader>
                    <p className='capitalize py-[20px]'>Do you really want to delete this project</p>
                    <div className='flex justify-end'>
                        <Button type='submit' onClick={()=>{
                            deleteProject(projectId)
                        }}>Delete</Button>
                    </div>
            </DialogContent>
        </Dialog>
    )
}
