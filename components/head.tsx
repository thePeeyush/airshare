import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { usePeer } from '@/store/peer'
import { PeerConnection } from '@/lib/peer'
import { useRouter } from 'next/navigation'

const Head = () => {
    const peerID = usePeer(state => state.peerID)
    const Router = useRouter()

    const handleDisconnect = async () => {
        await PeerConnection.closePeerSession()
        Router.push('/')
    }
    return (
        <div className='flex justify-between p-2 rounded-lg w-full items-center'>
            <Image
                src={'/logo.png'}
                width={200}
                height={65}
                alt='logo'
                className='rounded-lg'
            />
            <Popover>
                <PopoverTrigger >
                    <Avatar className='shadow-xl shadow-green-300'>
                        <AvatarImage src="monkey.jpg" />
                        <AvatarFallback>Peer</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    <div className='w-full flex flex-col items-center gap-2'>
                        <h1>{peerID}</h1>
                        <Button onClick={handleDisconnect} className='w-full bg-orange-600'>Disconnect</Button>
                    </div>
                </PopoverContent>
            </Popover>


        </div>
    )
}

export default Head