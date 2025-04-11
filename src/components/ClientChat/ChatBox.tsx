'use client'
import React from 'react'
import RoomList from './RoomList'
import { useEffect } from 'react'
import { useAppSelector } from '@/lib/reduxHooks'
import Messages from './Messages'
import { border_color, loader_background } from '@/resource/theme'
import { Skeleton } from '../ui/skeleton'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
export default function ChatBox() {

  const userId = useAppSelector(state => state.user.userid)
  const [activeRoom, setactiveRoom] = React.useState<String | null>(null)
  const [loading, setloading] = React.useState<boolean>(true)
  const [rooms, setrooms] = React.useState<any[]>([])
  useEffect(() => {
    async function getrooms() {
      const response = await fetch("/api/ClientChat/GetRooms", {
        method: 'POST',
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          "userId": userId
        })
      })
      const res = await response.json();
      setrooms(res.doc)
      setloading(false)
    }
    getrooms()
  }, [])
  return (
    loading ? <FetchingRoomList /> :
      <div className='w-full h-[500px] flex'>
        <RoomList activeroomid={activeRoom} rooms={rooms} setactiveroomid={setactiveRoom} />
        <Messages activeroomid={activeRoom} />
      </div>
  )
}



function FetchingRoomList() {
  return (
    <div className='w-full h-[500px] flex'>
      <div className='w-[30%] border-r-[1px] pr-[10px] flex flex-col gap-2' style={{ borderColor: border_color }}>
        <Skeleton className='w-full h-[50px]' style={{ backgroundColor: loader_background }} />
        <Skeleton className='w-full h-[50px]' style={{ backgroundColor: loader_background }} />
        <Skeleton className='w-full h-[50px]' style={{ backgroundColor: loader_background }} />
        <Skeleton className='w-full h-[50px]' style={{ backgroundColor: loader_background }} />
      </div>
      <div className='flex-1 pl-[10px] flex flex-col'>
        <p className='text-[12px] font-light text-center border-b-[1px] py-[10px]' style={{ borderColor: border_color }}>Messages are being shown because the bid was accepted</p>
        <div className=' flex-1 py-[10px] flex flex-col justify-between'>
          <div className='flex-1 py-[10px] flex flex-col gap-2'>
            <div className='w-full h-[30px]'>
              <Skeleton className='w-[50%] h-full' style={{backgroundColor:loader_background}}/>
            </div>
            <div className='w-full h-[30px]'>
              <Skeleton className='w-[40%] h-full' style={{backgroundColor:loader_background}}/>
            </div>
            <div className='w-full h-[30px] flex justify-end'>
              <Skeleton className='w-[40%] h-full' style={{backgroundColor:loader_background}}/>
            </div>
            <div className='w-full h-[30px]'>
              <Skeleton className='w-[40%] h-full' style={{backgroundColor:loader_background}}/>
            </div>
            <div className='w-full h-[30px]'>
              <Skeleton className='w-[60%] h-full' style={{backgroundColor:loader_background}}/>
            </div>
            <div className='w-full h-[30px]'>
              <Skeleton className='w-[40%] h-full' style={{backgroundColor:loader_background}}/>
            </div>
            <div className='w-full h-[30px] flex justify-end'>
              <Skeleton className='w-[40%] h-full' style={{backgroundColor:loader_background}}/>
            </div>
            <div className='w-full h-[30px] flex justify-end'>
              <Skeleton className='w-[50%] h-full' style={{backgroundColor:loader_background}}/>
            </div>
          </div>
          <div className='w-full h-[50px] flex gap-1'>
            <Input placeholder='Type message here' className='w-[80%]' />
            <Button className='flex-1'>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
