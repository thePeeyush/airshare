import React, { ReactEventHandler, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { DataType, PeerConnection } from '@/lib/peer'
import { usePeer } from '@/store/peer'
import { useToast } from './ui/use-toast'

const FileInput = () => {
    const [file, setFile] = useState<File | null>(null)
    const peerID = usePeer(s => s.peerID)
    const {toast} = useToast()

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
                await PeerConnection.sendConnection(peerID, {
                    dataType: DataType.FILE,
                    file: blob,
                    fileName: file.name,
                    fileType: file.type
                })

                console.log('data send successfully')
                toast({
                    description:'data send successfully'
                })
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="flex flex-col w-full max-w-xs h-full items-center justify-center gap-1.5">
            <Input id="file" type="file" onChange={e => handleFileChange(e)} />
            <Button disabled={file === null} onClick={handleUpload} >Uplaod File</Button>
        </div>
    )
}

export default FileInput
