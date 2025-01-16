'use client'
import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "../general/reacticons";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { MdDelete } from "react-icons/md";
import { addexperience,removeexperience } from "@/lib/features/userdetails";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { useAppSelector,useAppDispatch } from "@/lib/reduxHooks";

export default function Experience() {
    const dispatch=useAppDispatch();
    const { toast } = useToast();
    const [part, setpart] = React.useState(false);
    const [newexp, setnewexp] = React.useState({
        title: '',
        company: '',
        from: '',
        to: '',
        description: ''
    })
    const userid=useAppSelector(state=>state.user.userid)
    const experiences=useAppSelector((state=>state.user.experience))
    const handleclick = async () => {
        if (experiences.length >= 5) {
            toast({ title: "Maximum Limit Reached", description: "You can not add more than 5 experiences. Delete one to add new", variant: 'destructive' })
            return;
        }
        // console.log(newexp)
        await fetch('/api/User/AddExperience', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                user: userid,
                title: newexp.title,
                company: newexp.company,
                from: newexp.from,
                to: newexp.to,
                description: newexp.description
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if(res.status==="200"){
                    dispatch(addexperience({userId:userid,company:newexp.company,title:newexp.title,yearfrom:newexp.from,yearto:newexp.to,description:newexp.description}))
                }
               
                toast({ title: res.message })
            })
    }
    const handledelete=async(id:number)=>{
        await fetch('/api/User/DeleteExperience',{
            method:'POST',
            body:JSON.stringify({
                experienceId:id
            })
        })
        dispatch(removeexperience(id))
        toast({title:"Record Deleted Successfully",description:"Please refresh the page"})
    }

    return (
        <div className="w-full min-h-[70px] max-h-[1200px] mt-[20px] flex flex-col" style={{ boxShadow: "0.1px 0.1px 0.1px 1px #dee0e2", userSelect: 'none' }}>
            <div className="w-full h-[70px] flex items-center justify-between px-[20px]">
                <p className="text-[20px] font-bold">Experience</p>
                {!part ? <IoIosArrowDown className="w-[30px] h-[30px] cursor-pointer" onClick={
                    () => {
                        setpart(!part)
                    }
                } /> : <IoIosArrowUp className="w-[30px] h-[30px] cursor-pointer" onClick={
                    () => {
                        setpart(!part)
                    }
                } />}
            </div>

            <div className="w-full max-h-[900px] p-[20px]" style={{ display: part ? 'block' : 'none' }}>
                {
                    experiences.length === 0 ? (
                        <div className="w-[100%] h-[200px] flex items-center justify-center text-[30px] font-medium">No experience Added</div>
                    ) : (
                        <div>
                            {
                                experiences.map((exp, index) => {
                                    return (
                                        <div key={index} className="w-[100%] h-[120px] flex items-center  hover:bg-[#f7f7f7] p-[20px] cursor-pointer">
                                            <div className="w-[90%] h-[100%] flex flex-col" style={{}}>
                                                <p className="text-[13px] font-medium">{exp.title}</p>
                                                <p className="text-[25px] font-bold">{exp.company}</p>
                                                <div className="flex text-[10px] font-light"><p>{exp.yearFrom} - </p> <p>{exp.yearTo}</p></div>
                                            </div>
                                            <Dialog>
                                                <DialogTrigger className=""><MdDelete className="w-[20px] h-[20px] hover:animate-ping" style={{ color: '838383' }} /></DialogTrigger>
                                                <DialogContent className="bg-white w-[500px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Delete Education</DialogTitle>
                                                        <DialogDescription className="h-[150px] flex flex-col ">
                                                            <span className="w-[90%] flex flex-col mt-[30px]" style={{}}>
                                                                <span className="text-[13px] font-medium">{exp.title}</span>
                                                                <span className="text-[25px] font-bold">{exp.company}</span>
                                                                <span className="flex text-[10px] font-light"><span>{exp.yearFrom} - </span> <span>{exp.yearTo}</span></span>
                                                            </span>
                                                            <span className="font-medium text-[20px] text-left mt-[20px]">Do you really want to delete this record ?</span>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button type="submit" className="mx-auto w-[100%]" onClick={() => { handledelete(exp.id) }}>Delete Record</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
                <Dialog>
                    <DialogTrigger className="w-[100%] mx-auto h-[40px] flex justify-end px-[20px] mt-[20px]"><div className="w-[150px] h-[100%] shadow-sm shadow-[#b2b2b2] justify-center"><p className="mx-auto pt-[8px] font-medium">Add Experience</p></div></DialogTrigger>
                    <DialogContent className="bg-white w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Add Experience</DialogTitle>
                            <DialogDescription className="h-[250px] flex flex-col items-center justify-around">
                                <Input placeholder="Title or Role" onChange={(e) => setnewexp((prev) => ({ ...prev, title: e.target.value }))} />
                                <Input placeholder="Organization Name" onChange={(e) => setnewexp((prev) => ({ ...prev, company: e.target.value }))} />
                                <Input placeholder="Start Year" onChange={(e) => setnewexp((prev) => ({ ...prev, from: e.target.value }))} />
                                <Input placeholder="End Year" onChange={(e) => setnewexp((prev) => ({ ...prev, to: e.target.value }))} />
                                <Input placeholder="Description" onChange={(e) => setnewexp((prev) => ({ ...prev, description: e.target.value }))} />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button className="mx-auto w-[100%]" onClick={handleclick}>Add Experience</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}