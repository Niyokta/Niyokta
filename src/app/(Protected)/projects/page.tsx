'use client'
import React, { useRef } from 'react';
import ProjectCard from '@/components/Projects/ProjectCard';
import { Checkbox } from "@/components/ui/checkbox"
import { AllProjectsLoader } from '@/components';
import { CgChevronDoubleLeft, CgChevronDoubleRight } from '@/components/general/reacticons';
import { DummyProject, ProjectModel } from '@/lib/types/ProjectType';
import { useToast } from '@/hooks/use-toast';
import { border_color, div_color } from '@/resource/theme';
export default function Home() {
  const {toast}=useToast();
  const [loading,setloading]=React.useState<true | false>(true)
  const [projects, setProjects] = React.useState<ProjectModel[]>([DummyProject]);
  const [filter,setfilter]=React.useState<string[]>([])
  const [pageNumber,setpageNumber]=React.useState<number>(1);
  const firstIndex=useRef<number>((pageNumber-1)*10);
  const lastIndex=useRef<number>(pageNumber*10);
  const firstPage=useRef<number>(1);
  const lastPage=useRef<number>(0);
  React.useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('api/Project/allProjects',{
          method: 'GET',
          credentials:"include"
        });
        const data = await response.json();
        const filteredData=data.projects.filter((s:ProjectModel)=>s.project_id!==4 && s.project_id!==5);
        lastPage.current=Math.ceil((filteredData.length/10));
        if(data.status==="200") setloading(false);
        setProjects(filteredData); 

      } catch (error) {
        if(error instanceof Error)toast({title:error.message})
          else toast({title:"Unexpected Error Occured"})
      }
    }

    fetchProjects();
  }, []);

  return (
    loading?(
      <AllProjectsLoader/>
    ):
    <div>
      <div className='w-full h-[100px] flex items-center justify-end'>
        <Checkbox className='w-[15px] h-[15px] border-[1px]' onCheckedChange={()=>{
          if(filter.includes("Web Development")){
            const temp=filter.filter(s=>s!="Web Development");
            setfilter(temp);
          }
          else{
            setfilter([...filter,"Web Development"])
          }
        }} style={{borderColor:border_color}}/> <p className='px-[10px] font-light text-[13px]'>Web Development</p>
        <Checkbox className='w-[15px] h-[15px] border-[1px]' onCheckedChange={()=>{
          if(filter.includes("Graphic Design")){
            const temp=filter.filter(s=>s!="Graphic Design");
            setfilter(temp);
          }
          else{
            setfilter([...filter,"Graphic Design"])
          }
        }} style={{borderColor:border_color}}/> <p className='px-[10px] font-light text-[13px]'>Graphic Design</p>
        <Checkbox className='w-[15px] h-[15px] border-[1px]' onCheckedChange={()=>{
          if(filter.includes("Android Development")){
            const temp=filter.filter(s=>s!="Android Development");
            setfilter(temp);
          }
          else{
            setfilter([...filter,"Android Development"])
          }
        }} style={{borderColor:border_color}}/> <p className='px-[10px] font-light text-[13px]'>Android Development</p>
      </div>
      
      <div className='grid grid-flow-row grid-col-1 md:grid-cols-2 gap-10'>
        {projects.slice(firstIndex.current,lastIndex.current).map((project,index) => (
          <ProjectCard key={index} project_id={project.project_id} filter={filter} skills={project.skills_required} category={project.category} title={project.title} client_name={project.client_name} client_country={project.client_country} min_budget={project.min_budget} />
        ))}
      </div>

      {/* pagination */}
      <div className='w-[200px] h-[50px] mx-auto flex justify-between items-center mt-[50px]'>
        <CgChevronDoubleLeft className='w-[20px] h-[20px] cursor-pointer' onClick={()=>{
          if(pageNumber > 1){
            firstIndex.current=(pageNumber-2)*10;
            lastIndex.current=(pageNumber-1)*10;
            setpageNumber(pageNumber-1);
          }
        }}/>
        <p className='px-[10px]  py-[2px] opacity-35 rounded-md' style={{backgroundColor:div_color}}>{firstPage.current}</p>
        <p className='px-[10px]  py-[2px] rounded-md' style={{backgroundColor:div_color}}>{pageNumber}</p>
        <p className='px-[10px]  py-[2px] opacity-35 rounded-md' style={{backgroundColor:div_color}}>{lastPage.current}</p>
        <CgChevronDoubleRight className='w-[20px] h-[20px] cursor-pointer' onClick={()=>{
          if(pageNumber < lastPage.current){
            firstIndex.current=(pageNumber)*10;
            lastIndex.current=(pageNumber+1)*10;
            setpageNumber(pageNumber+1);
          }
        }}/>
      </div>
    </div>
  );
}