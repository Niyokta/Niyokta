'use client'
import { useAppSelector } from '@/lib/reduxHooks'
import React from 'react'

export default function Ongoing() {
  const projects=useAppSelector(state=>state.user.projects)
  const ongoingProjects=projects.filter((project)=>project.status==="ongoing");
  return (
    <div className='w-full p-[20px]'>
      {ongoingProjects.map((project,index)=>{
        return(
          <div key={index}>
            {project.title}
          </div>
        )
      })}
    </div>
  )
}
