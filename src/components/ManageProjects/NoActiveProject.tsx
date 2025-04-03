import React from 'react'
import { MousePointerClick } from 'lucide-react';
export default function NoActiveProject() {
  return (
    <div className='w-full flex flex-col justify-center items-center py-[100px]'>
        <MousePointerClick className='w-[100px] h-[100px]'/>
        <p className='text-[15px] font-medium capitalize pt-[50px]'>Select a project to monitor bids on the project</p>
    </div>
  )
}
