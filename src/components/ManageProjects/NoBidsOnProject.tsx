import React from 'react'
import { ScrollText } from 'lucide-react';
export default function NoBidsOnProject() {
  return (
    <div className='w-full flex flex-col items-center justify-center pt-[120px]'>
        <ScrollText className='w-[100px] h-[100px]'/>
        <p className='text-[15px] font-medium pt-[30px] capitalize'>No bids have been placed on this project</p>
    </div>
  )
}
