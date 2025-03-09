'use client'
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";
import {MdDelete,IoIosArrowUp,IoIosArrowDown,ImCross} from "../general/reacticons"
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
import { useAppSelector } from "@/lib/reduxHooks";
import { border_color, box_shadow, button_text, div_color, normal_button_bg, normal_hover_button_bg, primary_accent_text, secondary_accent_text, text_color } from "@/resource/theme";
export default function Projects() {
    const userid=useAppSelector(state=>state.user.userid)
    const clientname=useAppSelector(state=>state.user.userName)
    const clientcountry=useAppSelector(state=>state.user.country);
    const projects=useAppSelector(state=>state.user.projects)
    const { toast } = useToast();
    const [newproject, setnewproject] = React.useState({
        title: '',
        maxbudget: '',
        description: '',
        minbudget: '',
    })
    const [skill, setskill] = React.useState<string>('');
    const [skills, setskills] = React.useState<string[]>([]);
    const [category, setcategory] = React.useState<string>('');
    const [categories, setcategories] = React.useState<string[]>([]);
    const [part, setpart] = React.useState(false);
    const createnewproject = async () => {
        fetch('/api/User/AddProject', {
            method: 'POST',
            body: JSON.stringify({
                user: userid,
                title: newproject.title,
                description: newproject.description,
                maxprice: newproject.maxbudget,
                skills: skills,
                categories: categories,
                minprice: newproject.minbudget,
                client_name: clientname,
                client_country:clientcountry
            })
        })
            .then((res) => res.json())
            .then((res) => {
                toast({ title: res.message, description: "Please Refresh the Page" })
            })
    }
    const handledelete=async(id:number)=>{
        await fetch('/api/User/RemoveProject',{
            method:'POST',
            body:JSON.stringify({
                projectID:id
            })
        })
        .then((res)=>res.json())
        .then((res)=>{
            toast({title:res.message,description:"Please refresh the page"});
        })
    }
    return (
        <div className="w-full min-h-[70px] mt-[20px] flex flex-col" style={{ boxShadow: box_shadow,backgroundColor:div_color }}>
            <div className="w-full h-[70px] flex items-center justify-between px-[20px]">
                <p className="text-[20px] font-bold">Your Projects</p>
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
            <div className="w-full  p-[20px] border-t-[1px]" style={{ display: part ? 'block' : 'none',borderColor:border_color }}>
                {
                    projects.length === 0 ? (
                        <div className="w-full h-[100px] flex items-center justify-center text-[30px] font-bold">
                            <p>No Projects to Show</p>
                        </div>
                    ) : (
                        projects.map((project, index) => {
                            return (
                                <div className="w-[100%] h-[70px] flex items-center px-[20px] rounded-md border-[1px] mt-[10px]" key={index} style={{borderColor:border_color}}>
                                    <div className="w-[90%]">
                                        <p className="text-[15px] font-light">{project.title.length > 150?project.title.slice(0,150)+" .....":project.title}</p>
                                        <p className="text-[13px] font-light">{project.created_at.slice(0,10)} | Rs. {project.min_budget} - Rs. {project.max_budget}</p>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger className=""><MdDelete className="w-[20px] h-[20px]"/></DialogTrigger>
                                        <DialogContent className="w-[500px]" style={{backgroundColor:div_color,borderColor:border_color,color:text_color}}>
                                            <DialogHeader>
                                                <DialogTitle>Remove Project</DialogTitle>
                                                <DialogDescription className="h-[150px] flex flex-col ">
                                                    <span className="w-[90%] flex flex-col mt-[30px]" style={{}}>
                                                        <span className="text-[13px] font-medium">{project.title.length > 100 ? project.title.slice(0,100)+" .....":project.title}</span>
                                                        
                                                        <span className=" text-[10px] font-light">{project.created_at.slice(0,10)} | Rs. {project.min_budget} - Rs. {project.max_budget}</span>
                                                    </span>
                                                    <span className="font-medium text-[20px] text-left mt-[20px]">Do you really want to delete this record ?</span>
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button type="submit" className="mx-auto w-[100%]" onClick={()=>handledelete(project.project_id)}>Delete Record</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            )
                        })
                    )
                }
                <Dialog>
                    <DialogTrigger className="w-[100%] mx-auto h-[40px] flex justify-end px-[20px] mt-[20px]"><div className={`w-[150px] h-[100%] justify-center rounded-md bg-[${normal_button_bg}] hover:bg-[${normal_hover_button_bg}]`} style={{color:button_text}}><p className="mx-auto pt-[8px] font-medium">Add New Project</p></div></DialogTrigger>
                    <DialogContent className="w-[450px] md:w-[900px]" style={{backgroundColor:div_color,borderColor:border_color,color:text_color}}>
                        <DialogHeader>
                            <DialogTitle>Host a New Project</DialogTitle>
                            <DialogDescription className="h-[700px] flex flex-col">
                                <Label htmlFor="email" className="mt-[20px] mb-[10px]">Title</Label>
                                <Input onChange={(e) => setnewproject((prev) => ({ ...prev, title: e.target.value }))} />
                                <Label htmlFor="email" className="mt-[20px] mb-[10px]">Minimum Bid Price</Label>
                                <Input type="number" onChange={(e) => setnewproject((prev) => ({ ...prev, minbudget: e.target.value }))} />
                                <Label htmlFor="email" className="mt-[20px] mb-[10px]">Maximum Bid Price</Label>
                                <Input type="number" onChange={(e) => setnewproject((prev) => ({ ...prev, maxbudget: e.target.value }))} />
                                <Label htmlFor="email" className="mt-[20px] mb-[10px]">Add Skills</Label>
                                <Input value={skill} onChange={(e) => setskill(e.target.value)} onKeyDown={(e) => {

                                    if (e.key === 'Enter') {
                                        if (skills.length >= 10) {
                                            toast({ title: "Maximum Limit Reached", description: "Remove any skill to add new" });
                                            return;
                                        }
                                        if (skill.length > 20) {
                                            toast({ title: "Skill can be of max 30 letters", description: "Remove any category to add new" });
                                            return;
                                        }
                                        setskills((prev) => ([...prev, skill]));
                                        setskill("")
                                    }
                                }} />
                                <span className="w-[100%] mt-[20px] max-h-[100px] flex">{
                                    skills.map((skill, index) => {
                                        return (
                                            <span key={index} className="bg-[#e8e8e8] p-[10px] mr-[10px] rounded-md font-medium flex items-center"><span className="pr-[10px]">{skill}</span><ImCross className="w-[10px] h-[10px] cursor-pointer font-bold" onClick={() => setskills((skills) => skills.filter((s) => s !== skill))} /></span>
                                        )
                                    })
                                }</span>
                                <Label htmlFor="email" className="mt-[20px] mb-[10px]">Add Categorie</Label>
                                <Input value={category} onChange={(e) => setcategory(e.target.value)} onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        if (categories.length >= 5) {
                                            toast({ title: "Maximum Limit Reached", description: "Remove any category to add new" });
                                            return;
                                        }
                                        if (category.length > 30) {
                                            toast({ title: "Category can be of max 30 letters", description: "Remove any category to add new" });
                                            return;
                                        }
                                        setcategories((prev) => ([...prev, category]));
                                        setcategory("")
                                    }
                                }} />
                                <span className="w-[100%] mt-[20px] max-h-[100px] flex">{
                                    categories.map((catg, index) => {
                                        return (
                                            <span key={index} className="bg-[#e8e8e8] p-[10px] mr-[10px] rounded-md font-medium flex items-center"><span className="pr-[10px]">{catg}</span><ImCross className="w-[10px] h-[10px] cursor-pointer font-bold" onClick={() => setcategories((categories) => categories.filter((s) => s !== catg))} /></span>
                                        )
                                    })
                                }</span>
                                <Label htmlFor="email" className="mt-[20px] mb-[10px]">Description</Label>
                                <Textarea className="w-[100%] h-[200px]" onChange={(e) => setnewproject((prev) => ({ ...prev, description: e.target.value }))} />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit" className="mx-auto w-[100%]" onClick={createnewproject}>Host Project</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}