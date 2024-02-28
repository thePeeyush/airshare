import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { DataType, PeerConnection } from '@/lib/peer'
import { usePeer } from '@/store/peer'
import { RiSendPlaneLine } from "react-icons/ri";
import useShared from '@/store/shared'

const FileInput = () => {
    const [file, setFile] = useState<File | null>(null)
    const peerID = usePeer(s => s.peerID)
    const setfiles = useShared(s=>s.setList)
    const setCount = useShared(s=>s.setCount)
    const setStatus = useShared(s=>s.setStatus)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleUpload = async () => {
        if (file !== null) {
            try {
                const blob = new Blob([file], { type: file.type })
                const id = Math.floor(Math.random()*10e6)
                await PeerConnection.sendConnection(peerID,{
                    id:id,
                    filename:file.name,
                    filesize:file.size,
                })
                setfiles({id:id,name:file.name,size:file.size,status:false})
                setCount()
                await PeerConnection.sendConnection(peerID, {
                    id:id,
                    dataType: DataType.FILE,
                    file: blob,
                    fileName: file.name,
                    fileType: file.type
                })
                setFile(null)
                setStatus(id,true)
                console.log('data send successfully')
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="flex w-full max-w-xs items-center justify-center gap-1.5 bottom-6 fixed">
            <Input id="file" type="file" onChange={e => handleFileChange(e)} />
            <Button disabled={file === null} onClick={handleUpload} ><RiSendPlaneLine/></Button>
        </div>
    )
}

export default FileInput
