'use client'
import ListBids from '@/components/ManageProjects/ListBids'
import ListProject from '@/components/ManageProjects/ListProject'
import NoActiveProject from '@/components/ManageProjects/NoActiveProject'
import SelectProject from '@/components/ManageProjects/SelectProject'
import { Button } from '@/components/ui/button'
import { box_shadow, div_color } from '@/resource/theme'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ManageProjects() {
  const [activeProjectId, setactiveProjectId] = React.useState<number | null>(null)
  const router=useRouter()
  return (
    <div className='w-full pt-[30px]'>
      <div className='w-full flex justify-end gap-2'>
        <Button className='font-bold'>Create New Project</Button>
        <Button className='font-bold' onClick={()=>{router.push("/manage-projects/ongoing")}}>Manage Ongoing Projects</Button>
      </div>
      <p className='text-[15px] font-medium uppercase px-[10px]'>Your projects</p>
      <ListProject/>
      <p className='text-[15px] font-medium uppercase px-[10px] pt-[30px]'>Track bids on projects</p>
      <div className='w-full mt-[10px] rounded-md min-h-[500px] p-[20px]' style={{ backgroundColor: div_color, boxShadow: box_shadow }}>
        <SelectProject setactiveProjectId={setactiveProjectId} />
        {
          activeProjectId == null ? <NoActiveProject /> : <ListBids activeProjectId={activeProjectId} />
        }
      </div>
    </div>
  )
}
