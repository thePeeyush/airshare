'use client'

import { DataType, PeerConnection, Pre, Chunk, Post } from '@/lib/peer'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import download from "js-file-download";
import FileInput from '@/components/FileInput'
import { usePeer } from '@/store/peer'
import { useConnection } from '@/store/connection'
import Recieve from '@/components/showQR'
import Send from '@/components/scanner'
import Head from '@/components/head'
import SharedList from '@/components/sharedFiles'
import { useSelected, useShared } from '@/store/files'
import NotShared from '@/components/notShared'
import Image from 'next/image';

const page = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const peerID = usePeer(s => s.peerID)
    const setPeerID = usePeer(s => s.setPeerID)
    const setMyID = usePeer(s => s.setMyID)
    const isConnected = useConnection(s => s.isConnected)
    const setIsConnected = useConnection(s => s.setIsConnected)
    const reciever = useConnection(s => s.reciver)
    const sender = useConnection(s => s.sender)
    const resetConnection = useConnection(s => s.reset)
    const resetPeer = usePeer(s => s.reset)
    const resetShared = useShared(s => s.reset)
    const fileCount = useShared(s => s.count)
    const setCount = useShared(s => s.setCount)
    const setfiles = useShared(s => s.setList)
    const setStatus = useShared(s => s.setStatus)
    const setProgress = useShared(s => s.setProgress)
    const startSession = useConnection(s => s.startSession)
    const setStartSession = useConnection(s => s.setStartSession)
    const setSelectedFiles = useSelected(s => s.setList)
    const dragRef = useRef<HTMLDivElement>(null)
    let streamSaver : any = null;

    useEffect(() => {

        if (searchParams.has('peerID')) {
            const peerID = searchParams.get('peerID')
            setStartSession(true)
            connectToPeer(peerID!)
        }
        if (!startSession && !searchParams.has('peerID')) router.push('/')

        window.addEventListener('beforeunload', handleBeforeUnload);
        streamSaver = require('streamsaver');
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [])

    useEffect(() => {
        if (isConnected) handleConnection()
    }, [isConnected])

    const handleBeforeUnload = () => {
        PeerConnection.closePeerSession()
    }

    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
        const files = e.dataTransfer.files
        dragRef.current?.classList.remove('shake')
        if (files && files.length > 0) {
            for (let key in files) {
                if (files.hasOwnProperty(key)) {
                    setSelectedFiles(files[key])
                }
            }
        }
    }

    const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
        dragRef.current?.classList.add('shake')
    }

    const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
        dragRef.current?.classList.remove('shake')

    }

    const connectToPeer = async (peerID: string) => {
        try {
            const id = await PeerConnection.startPeerSession()
            setMyID(id)
            setPeerID(peerID)
            await PeerConnection.startPeerSession()
            await PeerConnection.connectPeer(peerID)
            setIsConnected(true)
        } catch (error) {
            console.log(error);
            router.push('/')
        }
    }

    const handleConnection = () => {
        let serial = 0;
        let fileSize = 0;
        let currentSize = 0;
        let fileID = 0;

        PeerConnection.onConnectionDisconnected(peerID, () => {
            PeerConnection.closePeerSession()
            router.push('/')
            resetConnection()
            resetPeer()
            resetShared()
        })

        PeerConnection.onConnectionReceiveData<Pre>(peerID, (info) => {
            if (info.dataType === DataType.PRE) {
                setfiles({ id: info.id, name: info.filename, size: info.filesize, type: info.filetype, status: false, progress: 0 })
                setCount()
                const fileStream = streamSaver.createWriteStream(info.filename, {
                    size: info.filesize
                })
                console.log(info);
                fileSize = info.filesize
                fileID = info.id
                saveStream(fileStream)
            }
        })

        const saveStream = (fileStream: WritableStream<any>) => {
            const writer = fileStream.getWriter()

            PeerConnection.onConnectionReceiveData<Chunk>(peerID, (chunk) => {
                if (chunk.dataType === DataType.CHUNK) {
                    if (chunk.chunkSerial === serial) {
                        console.log("chunk no:", chunk.chunkSerial, chunk.chunk);
                        writer.write(chunk.chunk)
                        currentSize += chunk.chunk.byteLength
                        setProgress(fileID, Math.floor((currentSize / fileSize) * 100))
                    }
                    else console.log('chunk error', serial, "incoming", chunk.chunkSerial);
                    serial++;
                }
            })

            PeerConnection.onConnectionReceiveData<Post>(peerID, (info) => {
                if (info.dataType === DataType.POST) {
                    writer.close()
                    console.log(info);
                    serial = 0;
                    setStatus(info.id, true)
                }
            })
            
        }
    }

    if (isConnected) {
        return (
            <main onDrop={e => handleDrop(e)} onDragEnter={e => handleDragEnter(e)} onDragLeave={e => handleDragLeave(e)} onDragOver={e => e.preventDefault()} className='w-screen md:min-w-[700px] md:w-auto'>
                <div ref={dragRef} className='flex flex-col justify-between items-center w-full'>
                    <Head />
                    {fileCount !== 0 ? <SharedList className='bg-transparent border-none' /> : <NotShared />}
                    <FileInput />
                </div>

            </main>
        )
    }

    if (reciever) {
        return (<Recieve />)
    }

    if (sender) {
        return (<Send />)
    }

    if (searchParams.has('peerID')) {
        return (
            <div className="text-center">
                <Image
                    src={'/connecting.gif'}
                    width={498}
                    height={370}
                    alt='loading'
                    className='rounded-lg w-full max-w-xl h-auto'
                />
                <p className='text-white'>Connecting...</p>
            </div>
        )
    }

    return (
        <div className="text-center">
            <Image
                src={'/disconnected.svg'}
                width={500}
                height={400}
                alt='loading'
                className='rounded-lg w-full max-w-xl h-auto'
            />
            <p className='text-white'>Disconnected</p>
        </div>
    )
}

export default page
