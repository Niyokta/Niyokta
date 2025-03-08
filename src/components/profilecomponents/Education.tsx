'use client'
import React from "react";
import { IoIosArrowDown, IoIosArrowUp, MdDelete } from "../general/reacticons"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
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
import { useAppSelector,useAppDispatch } from "@/lib/reduxHooks";
import { addeducation, removeeducation } from "@/lib/features/userdetails";
import { border_color, box_shadow, button_text, div_color, normal_button_bg, normal_hover_button_bg, text_color } from "@/resource/theme";
export default function Education() {
    const dispatch=useAppDispatch()
    const { toast } = useToast();
    const [part, setpart] = React.useState(false);
    const [newedu, setnewedu] = React.useState({
        cname: '',
        institute: '',
        startyear: '',
        endyear: ''
    })
    const userid=useAppSelector(state=>state.user.userid)
    const educations = useAppSelector(state => state.user.education);
    const handleclick = async () => {
        if (educations.length >= 5) {
            toast({ title: "Maximum Limit Reached", description: "Please remove one to add new", variant: 'destructive' })
        }
        await fetch('/api/User/AddEducation', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                user: userid,
                coursename: newedu.cname,
                yearfrom: newedu.startyear,
                yearto: newedu.endyear,
                institute: newedu.institute
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if(res.status==="200"){
                    dispatch(addeducation({useid:userid,coursename:newedu.cname,yearfrom:newedu.startyear,yearto:newedu.startyear,institute:newedu.institute}))
                }
                toast({ title: res.message, description: "Please refresh the page" })
            })
    }
    const handledelete = async (id: number) => {
        await fetch('/api/User/DeleteEducation', {
            method: 'POST',
            body: JSON.stringify({
                educationId: id
            })
        })
        dispatch(removeeducation(id))
        toast({ title: "Record Deleted Successfully", description: "Please refresh the page" })
    }
    return (
        <div className="w-full min-h-[70px] max-h-[900px] mt-[20px] flex flex-col" style={{ boxShadow: box_shadow, userSelect: 'none',backgroundColor:div_color }}>
            <div className="w-full h-[70px] flex items-center justify-between px-[20px]">
                <p className="text-[20px] font-bold">Education</p>
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
            <div className="w-full max-h-[900px] p-[20px] border-t-[1px]" style={{ display: part ? 'block' : 'none',borderColor:border_color }}>
                {
                     educations.length === 0 ? (
                        <div className="w-[100%] h-[200px] flex items-center justify-center text-[30px] font-medium">No education Added</div>
                    ) : (
                        <div>
                            {
                                educations.map((edu, index) => {
                                    return (
                                        <div key={index} className="w-[100%] h-[120px] flex items-center p-[20px] cursor-pointer border-[1px] rounded-md mt-[10px]" style={{borderColor:border_color}}>
                                            <div className="w-[90%] h-[100%] flex flex-col" style={{}}>
                                                <p className="text-[13px] font-medium">{edu.courseName}</p>
                                                <p className="text-[25px] font-bold">{edu.institute}</p>
                                                <div className="flex text-[10px] font-light"><p>{edu.yearFrom} - </p> <p>{edu.yearTo}</p></div>
                                            </div>
                                            <Dialog>
                                                <DialogTrigger className=""><MdDelete className="w-[20px] h-[20px] hover:animate-ping" style={{ color: '838383' }} /></DialogTrigger>
                                                <DialogContent className="w-[500px]" style={{backgroundColor:div_color,color:text_color,borderColor:border_color}}>
                                                    <DialogHeader>
                                                        <DialogTitle>Delete Education</DialogTitle>
                                                        <DialogDescription className="h-[150px] flex flex-col ">
                                                            <span className="w-[90%] flex flex-col mt-[30px]" style={{}}>
                                                                <span className="text-[13px] font-medium">{edu.courseName}</span>
                                                                <span className="text-[25px] font-bold">{edu.institute}</span>
                                                                <span className="flex text-[10px] font-light"><span>{edu.yearFrom} - </span> <span>{edu.yearTo}</span></span>
                                                            </span>
                                                            <span className="font-medium text-[20px] text-left mt-[20px]">Do you really want to delete this record ?</span>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button type="submit" className="mx-auto w-[100%]" onClick={() => { handledelete(edu.id) }}>Delete Record</Button>
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
                    <DialogTrigger className="w-[100%] mx-auto h-[40px] flex justify-end px-[20px] mt-[20px]"><div className={`w-[150px] h-[100%] justify-center bg-[${normal_button_bg}] hover:bg-[${normal_hover_button_bg}] text-[${button_text}] rounded-md`}><p className="mx-auto pt-[8px] font-medium">Add Education</p></div></DialogTrigger>
                    <DialogContent className="w-[500px]" style={{backgroundColor:div_color,borderColor:border_color,color:text_color}}>
                        <DialogHeader>
                            <DialogTitle>Add Education</DialogTitle>
                            <DialogDescription className="h-[250px] flex flex-col items-center justify-around">
                                <Input placeholder="Course Name" onChange={(e) => setnewedu((prev) => ({ ...prev, cname: e.target.value }))} />
                                <Input placeholder="Institute Name" onChange={(e) => setnewedu((prev) => ({ ...prev, institute: e.target.value }))} />
                                <Input placeholder="Start Year" onChange={(e) => setnewedu((prev) => ({ ...prev, startyear: e.target.value }))} />
                                <Input placeholder="End Year" onChange={(e) => setnewedu((prev) => ({ ...prev, endyear: e.target.value }))} />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit" className="mx-auto w-[100%]" onClick={handleclick}>Add Education</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}