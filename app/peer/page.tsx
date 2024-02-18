'use client'

import { useToast } from '@/components/ui/use-toast'
import { DataType, PeerConnection } from '@/lib/peer'
import { useRouter } from 'next/navigation'
import React from 'react'
import download from "js-file-download";
import FileInput from '@/components/FileInput'
import { usePeer } from '@/store/peer'
import { Button } from '@/components/ui/button'
import { useConnection } from '@/store/connection'
import Recieve from '@/components/recieve'
import Send from '@/components/send'

const page = () => {

    const {toast} = useToast()
    const router = useRouter()
    const peerID = usePeer(s=>s.peerID)
    const isConnected = useConnection(s=>s.isConnected)
    const reciever = useConnection(s=>s.reciver)
    const sender = useConnection(s=>s.sender)

    const handleDisconnect=async()=>{
        await PeerConnection.closePeerSession()
        router.push('/')
        toast({
            description:'Disconnected'
        })
    }

    try {
            PeerConnection.onConnectionDisconnected(peerID,()=>{
                toast({
                    description:`Disconnected`
                })
                PeerConnection.closePeerSession()
                router.push('/')
            })
    
            PeerConnection.onConnectionReceiveData(peerID,(file)=>{                
                toast({
                    title:'Recieved',
                    description:`${file.fileName}`
                })
                if (file.dataType === DataType.FILE) {
                  download(file.file || '', file.fileName || "fileName", file.fileType)
              }            
            })
        }
        catch (error) {
        console.log(error);   
    }

    if(isConnected){
        return (
            <main className='flex flex-col justify-between items-center h-[90vh]'>
        <FileInput/>
        <div className="flex flex-col gap-4 w-full max-w-xs">
        <div className=' border-green-500 border-2 rounded-md p-2 text-green-500'>Connected to {peerID} </div>
        <Button className='bg-red-400 text-black' onClick={handleDisconnect}>Disconnect</Button>
        </div>
    </main>
        )
    }

    if(reciever){
        return(<Recieve/>)
    }

    if(sender){
        return(<Send/>)
    }
}

export default page

