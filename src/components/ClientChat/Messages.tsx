import { border_color, div_color } from '@/resource/theme'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Cable } from 'lucide-react';
import { useAppSelector } from '@/lib/reduxHooks';
import { Skeleton } from '../ui/skeleton';
import { Loader } from 'lucide-react';
import { loader_background } from '@/resource/theme';
import { Send } from 'lucide-react';
export default function Messages({ activeroomid }: { activeroomid: String | null }) {
    const [message, setmessage] = React.useState<string>("");
    const [loading, setloading] = React.useState<boolean>(true)
    const [messageHistory, setmessageHistory] = React.useState<any[]>([]);
    const [sending,setsending]=React.useState<boolean>(false);
    const senderid = useAppSelector(state => state.user.userid);
    async function sendMessage() {
        setsending(true)
        const res = await fetch("/api/ClientChat/SendMessage", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                senderId: senderid,
                text: message,
                roomId: activeroomid
            })
        })
        const response = await res.json();
        if(response.status===200){
            setmessageHistory([...messageHistory,{
                text:message,
                senderId:senderid
            }])
            setmessage("")
            setsending(false)
        }
    }
    React.useEffect(() => {
        setloading(true)
        async function getmessageHistory() {
            const res = await fetch("/api/ClientChat/GetChatHistory", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    roomId: activeroomid
                }),
            })
            const response = await res.json();
            console.log("getting message response", response)
            if (response.status === 200) {
                setmessageHistory(response.messages)
                setloading(false);
            }
        }
        if (activeroomid !== null) {
            getmessageHistory()
        }
    }, [activeroomid])
    return (
        activeroomid === null ? <NoRoomActive /> : loading ? <LoadingChats/>:
            <div className='flex-1 pl-[10px] flex flex-col'>
                <p className='text-[12px] font-light text-center border-b-[1px] py-[10px]' style={{ borderColor: border_color }}>Messages are being shown because the bid was accepted</p>
                <div className=' flex-1 py-[10px] flex flex-col justify-between'>
                    <div className='w-full h-[400px] py-[10px] flex flex-col gap-3 overflow-y-scroll pr-[10px]'>
                        {
                            messageHistory.map((message, index) => {
                                return (
                                    <div className='flex w-full' style={{ justifyContent: message.senderId === senderid ? "normal" : "end" }} key={index}>
                                        <div className='max-w-[80%] p-[10px] rounded-md' style={{ backgroundColor: message.senderId === senderid ? "#a1d3b8" : "#c2bfbf", }} key={index}>
                                            <p className='text-[15px] font-light'>{message.text}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w-full h-[50px] flex gap-1'>
                        <Input placeholder='Type message here' className='w-[90%]' onChange={(e) => setmessage(e.target.value)} value={message} />
                        <Button className='flex-1' onClick={() => {
                            if (message != "") {
                                sendMessage();
                            }
                        }}>{sending ? <Loader className='w-[30px] h-[30px] animate-spin'/> : <Send className='w-[30px] h-[30px]'/>}</Button>
                    </div>
                </div>
            </div>
    )
}

function NoRoomActive() {
    return (
        <div className='pl-[10px] flex-1 flex flex-col justify-center items-center w-full'>
            <Cable className='w-[100px] h-[100px]' />
            <p className='py-[20px] capitalize'>Please select a chat to open it</p>
        </div>
    )
}

function LoadingChats() {
    return (
        <div className='flex-1 pl-[10px] flex flex-col'>
            <p className='text-[12px] font-light text-center border-b-[1px] py-[10px]' style={{ borderColor: border_color }}>Messages are being shown because the bid was accepted</p>
            <div className=' flex-1 py-[10px] flex flex-col justify-between'>
                <div className='flex-1 py-[10px] flex flex-col gap-2'>
                    <div className='w-full h-[30px]'>
                        <Skeleton className='w-[50%] h-full' style={{ backgroundColor: loader_background }} />
                    </div>
                    <div className='w-full h-[30px]'>
                        <Skeleton className='w-[40%] h-full' style={{ backgroundColor: loader_background }} />
                    </div>
                    <div className='w-full h-[30px] flex justify-end'>
                        <Skeleton className='w-[40%] h-full' style={{ backgroundColor: loader_background }} />
                    </div>
                    <div className='w-full h-[30px]'>
                        <Skeleton className='w-[40%] h-full' style={{ backgroundColor: loader_background }} />
                    </div>
                    <div className='w-full h-[30px]'>
                        <Skeleton className='w-[60%] h-full' style={{ backgroundColor: loader_background }} />
                    </div>
                    <div className='w-full h-[30px]'>
                        <Skeleton className='w-[40%] h-full' style={{ backgroundColor: loader_background }} />
                    </div>
                    <div className='w-full h-[30px] flex justify-end'>
                        <Skeleton className='w-[40%] h-full' style={{ backgroundColor: loader_background }} />
                    </div>
                    <div className='w-full h-[30px] flex justify-end'>
                        <Skeleton className='w-[50%] h-full' style={{ backgroundColor: loader_background }} />
                    </div>
                </div>
                <div className='w-full h-[50px] flex gap-1'>
                    <Input placeholder='Type message here' className='w-[90%]' />
                    <Button className='flex-1'><Send className='w-[30px] h-[30px]'/></Button>
                </div>
            </div>
        </div>
    )
}