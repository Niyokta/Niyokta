import React from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MessageSquare } from 'lucide-react';
import ChatBox from "./ChatBox"
export default function ClientChat() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='flex fixed w-[200px] h-[80px] bg-blue-600 top-[90%] left-[75%] rounded-full cursor-pointer border-2 border-[#1b1d8d] text-white font-bold items-center justify-center text-[25px] gap-2'>
                    <MessageSquare className="w-[30px] h-[30px]"/>
                    <p>Messages</p>
                </div>
            </DialogTrigger>
            <DialogContent className="w-[800px]">
                <DialogHeader>
                    <DialogTitle>Messages</DialogTitle>
                </DialogHeader>
                <ChatBox/>
            </DialogContent>
        </Dialog>
    )
}



