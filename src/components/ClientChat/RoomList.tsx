import { extractRoomName } from '@/helper/roomLogic'
import { useAppSelector } from '@/lib/reduxHooks'
import { border_color, div_color } from '@/resource/theme'
import React, { SetStateAction, Dispatch } from 'react'

export default function RoomList({rooms,setactiveroomid,activeroomid}:{rooms:any[],setactiveroomid:Dispatch<SetStateAction<String|null>>,activeroomid:String|null}) {
    const userId=useAppSelector(state=>state.user.userid)
    const username=useAppSelector(state=>state.user.userName)
  return (
    <div className='w-[30%] h-full border-r-[1px] pr-[10px] flex flex-col gap-2' style={{borderColor:border_color}}>
        {
            rooms.map((room,index)=>{
                const roomName=extractRoomName(room.roomname,username)
                return(
                    <div key={index} className='w-full h-[40px] flex items-center  px-[20px] font-medium text-[15px] cursor-pointer border-b-[1px] border-[#dbdbdb]' style={{backgroundColor:activeroomid===room.roomId ? div_color : ""}} onClick={()=>{
                        setactiveroomid(room.roomId)
                    }}>
                        <p className='capitalize'>{roomName}</p>
                    </div>
                )
            })
        }
    </div>
  )
}
