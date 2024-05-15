import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { DataType, PeerConnection, Pre } from '@/lib/peer'
import { usePeer } from '@/store/peer'
import { RiSendPlaneLine } from "react-icons/ri";
import { useShared, useSelected } from '@/store/files'
import { formatBytes, readChunk } from '@/lib/service'

const FileInput = () => {
    const peerID = usePeer(s => s.peerID)
    const setfiles = useShared(s => s.setList)
    const setCount = useShared(s => s.setCount)
    const setStatus = useShared(s => s.setStatus)
    const setProgress = useShared(s => s.setProgress)
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

        let serial = 0;
        let fileSize = 0;
        let currentSize = 0;
        const id = Math.floor(Math.random() * 10e6)

        const sendChunk = (value: Uint8Array) => {
            PeerConnection.sendConnection(peerID, {
                id: id,
                dataType: DataType.CHUNK,
                chunk: value,
                chunkSerial: serial
            })
            serial++;
            currentSize += value.byteLength
            setProgress(id, Math.floor((currentSize / fileSize) * 100))
        }

        try {
            await PeerConnection.sendConnection(peerID, {
                id: id,
                dataType: DataType.PRE,
                filename: file.name,
                filesize: file.size,
            })
            fileSize = file.size;
            setfiles({ id: id, name: file.name, type: file.type, size: file.size, status: false, progress: 0, sendByMe: true })
            setCount()
            await readChunk(file, sendChunk);
            await PeerConnection.sendConnection(peerID, {
                id: id,
                dataType: DataType.POST,
                filesize: file.size,
            })
            setStatus(id, true)
            console.log('data send successfully')

        } catch (error) {
            console.log(error);
        }
    }

    const handleUpload = async () => {
        for (let file of selectedFiles) {
            if (file) {
                try {
                    await uploadFile(file);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        clearSelectedFiles()
    }

    return (
        <div className='flex flex-col w-full max-w-xl gap-1.5 bottom-6 fixed  px-4 md:px-0'>
            <div className={`flex flex-col p-4 space-y-3 max-h-[70vh] overflow-y-scroll bg-black bg-opacity-40 backdrop-blur-md rounded-xl ${selectedFiles.length < 1 && 'hidden'}`}>
                {
                    selectedFiles.map((file) => {
                        return (
                            <div className="flex justify-between space-x-2">
                                <p className="text-sm text-white font-medium leading-none text-ellipsis overflow-hidden whitespace-nowrap">
                                    {file.name}
                                </p>
                                <p className="text-sm text-gray-400 min-w-fit">
                                    {formatBytes(file.size)}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex w-full items-center justify-centerd gap-1.5 bg-white rounded-full border-2 border-gray-800 border-dashed p-1 ">
                <Input id="file" multiple={true} type="file" className='rounded-full bg-transparent border-none text-white' onChange={e => handleFileChange(e)} />
                <Button disabled={selectedFiles.length < 1} onClick={handleUpload} className='rounded-full bg-gradient-to-tr from-blue-600 to-pink-400 ' ><RiSendPlaneLine /></Button>
            </div>
        </div>

    )
}

export default FileInput