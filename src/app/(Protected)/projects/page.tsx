'use client'
import React, { useRef, useState } from 'react';
import { AllProjectsLoader } from '@/components';
import { DummyProject, ProjectModel } from '@/lib/types/ProjectType';
import { useToast } from '@/hooks/use-toast';
import ProjectFilter from '@/components/Projects/ProjectFilter';
import { filterType } from '@/lib/types/FilterTypes';
import ProjectCard from '@/components/Projects/ProjectCard';
import { CgChevronDoubleLeft, CgChevronDoubleRight } from 'react-icons/cg';
import { ScrollText } from 'lucide-react';
import { box_shadow, div_color } from '@/resource/theme';
export default function Home() {
  const { toast } = useToast();
  const [loading, setloading] = React.useState<true | false>(true)
  const [projects, setProjects] = React.useState<ProjectModel[]>([DummyProject]);
  const [filter, setfilter] = React.useState<filterType>({
    skillFilter: [],
    categoryFilter: []
  })
  const [index, setindex] = useState({
    first: 0,
    last: 8,
  })
  const totalProjects = useRef<number>(0)
  React.useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('api/Project/allProjects', {
          method: 'GET',
          credentials: "include"
        });
        const data = await response.json();
        const projects = data.projects;

        const filteredProjects = projects.filter((project: ProjectModel) => {
          const categoryMatch =
            filter.categoryFilter.length === 0 ||
            project.category.some((cat) =>
              filter.categoryFilter.some((selected) => cat.toLowerCase().includes(selected.toLowerCase()))
            );

          const skillMatch =
            filter.skillFilter.length === 0 ||
            project.skills_required.some((skill) =>
              filter.skillFilter.some((selected) => skill.toLowerCase().includes(selected.toLowerCase()))
            );
          return categoryMatch && skillMatch;
        })
        const sortedProjects = filteredProjects.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setProjects(sortedProjects)
        setindex({ first: 0, last: 8 })
        totalProjects.current = filteredProjects.length;
        setloading(false)

      } catch (error) {
        if (error instanceof Error) toast({ title: error.message })
        else toast({ title: "Unexpected Error Occured" })
      }
    }
    fetchProjects();
  }, [filter]);

  return (
    loading ? (
      <AllProjectsLoader />
    ) :
      <div className='w-full flex flex-col md:flex-row py-[20px] justify-between'>
        {/* filter  */}
        <ProjectFilter filter={filter} setfilter={setfilter} />
        <div className='w-full md:w-[68%]'>
          {/* porject list  */}
          <div className='w-full grid auto-rows-min grid-cols-1 md:grid-cols-1 gap-5 mt-[20px] md:mt-[0px]'>
            {projects.length === 0 ?
              <div className='w-full flex flex-col items-center justify-center h-[300px]'>
                <ScrollText className='w-[100px] h-[100px]' />
                <p className='text-[15px] font-medium pt-[20px]'>No Projects To Show At This Moment</p>
              </div>
              : projects.slice(index.first, index.last).map((project, index) => (
                <ProjectCard key={index} project_id={project.project_id} filter={[]} skills={project.skills_required} category={project.category} title={project.title} client_name={project.client_name} client_country={project.client_country} min_budget={project.min_budget} />
              ))}
          </div>
          {/* pagination  */}
          <div className='w-[200px] h-[50px] mx-auto flex justify-between items-center mt-[50px]'>
            <CgChevronDoubleLeft className='w-[20px] h-[20px] cursor-pointer' onClick={() => {
              if (index.first > 0) {
                setindex(() => ({ ...index, first: index.first - 8, last: index.last - 8 }));
              }
            }} />
            <p className='px-[10px] py-[2px] opacity-35 rounded-md font-bold' style={{ backgroundColor: div_color, boxShadow: box_shadow }}>{1}</p>
            <p className='px-[10px] py-[2px] rounded-md font-bold' style={{ backgroundColor: div_color, boxShadow: box_shadow }}>{index.last / 8}</p>
            <p className='px-[10px] py-[2px] opacity-35 rounded-md font-bold' style={{ backgroundColor: div_color, boxShadow: box_shadow }}>{Math.ceil(totalProjects.current / 8) > 0 ? Math.ceil(totalProjects.current / 8) : 1}</p>
            <CgChevronDoubleRight className='w-[20px] h-[20px] cursor-pointer' onClick={() => {
              if (index.first + 8 < totalProjects.current) {
                setindex(() => ({ ...index, first: index.first + 8, last: index.last + 8 }));
              }
            }} />
          </div>
        </div>
      </div>
  );
}
