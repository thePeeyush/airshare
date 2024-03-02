import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { DataType, PeerConnection } from '@/lib/peer'
import { usePeer } from '@/store/peer'
import { RiSendPlaneLine } from "react-icons/ri";
import { useShared, useSelected } from '@/store/files'

const FileInput = () => {
    const peerID = usePeer(s => s.peerID)
    const setfiles = useShared(s => s.setList)
    const setCount = useShared(s => s.setCount)
    const setStatus = useShared(s => s.setStatus)
    const selectedFiles = useSelected(s => s.SelectedFiles)
    const setSelectedFiles = useSelected(s => s.setList)
    const clearSelectedFiles = useSelected(s => s.reset)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            for (let key in files) {
                if (files.hasOwnProperty(key)) {
                    setSelectedFiles(files[key])
                }
            }
        }
    };

    const uploadFile = async (file: File) => {
        try {
            const blob = new Blob([file], { type: file.type })
            const id = Math.floor(Math.random() * 10e6)
            await PeerConnection.sendConnection(peerID, {
                id: id,
                filename: file.name,
                filesize: file.size,
            })
            setfiles({ id: id, name: file.name, size: file.size, status: false })
            setCount()
            await PeerConnection.sendConnection(peerID, {
                id: id,
                dataType: DataType.FILE,
                file: blob,
                fileName: file.name,
                fileType: file.type
            })
            setStatus(id, true)
            console.log('data send successfully')

        } catch (error) {
            console.log(error);
        }
    }

    const handleUpload = () => {
        while (selectedFiles.length > 0) {
            const file = selectedFiles.shift()
            if (typeof file !== "undefined") {
                uploadFile(file)
            }
        }
        clearSelectedFiles()
    }

    return (
        <div className='flex flex-col w-full max-w-xs gap-1.5 bottom-6 fixed '>
            <div className={`flex flex-col p-4 space-y-3 max-h-[70vh] overflow-y-scroll bg-blue-100 bg-opacity-30 backdrop-blur-md rounded-xl ${selectedFiles.length < 1 && 'hidden'}`}>
                {
                    selectedFiles.map((file) => {
                        const filesize = (file.size > 10e5 ? `${Math.ceil(file.size / 10e5)}MB` : `${Math.ceil(file.size / 10e2)}KB`) 
                        return (
                            <div className="flex justify-between space-x-2">
                                <p className="text-sm font-medium leading-none text-ellipsis overflow-hidden whitespace-nowrap">
                                    {file.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {filesize}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex w-full items-center justify-centerd gap-1.5">
                <Input id="file" multiple={true} type="file" onChange={e => handleFileChange(e)} />
                <Button disabled={selectedFiles.length < 1} onClick={handleUpload} ><RiSendPlaneLine /></Button>
            </div>
        </div>

    )
}

export default FileInput
