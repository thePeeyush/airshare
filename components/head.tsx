import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { usePeer } from '@/store/peer'
import { PeerConnection } from '@/lib/peer'
import { useRouter } from 'next/navigation'
import Logo from './logo'
import { imageAvatars } from '@/store/avatar'

const Head = () => {
    const peerID = usePeer(state => state.peerID)
    const Router = useRouter()
    const randomIndex = Math.floor(Math.random() * imageAvatars.length);
    const [imageIndex, setImageIndex] = React.useState(randomIndex)

    const handleDisconnect = async () => {
        await PeerConnection.closePeerSession()
        Router.push('/')
    }
    return (
        <div className='flex justify-between p-6 py-0 pt-6 rounded-lg w-full items-center'>
            <Logo className='w-40 p-2 lg:max-w-xs'/>
            <Popover>
                <PopoverTrigger >
                    <Avatar className='shadow-lg shadow-sky-300'>
                        <AvatarImage src={imageAvatars[imageIndex] || './avatar.png'} alt="Avatar image" />
                        <AvatarFallback>Peer</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className='bg-transparent backdrop-blur-lg border-none'>
                    <div className='w-full flex flex-col items-center gap-2'>
                        <h1 className='text-white'>{peerID}</h1>
                        <Button onClick={handleDisconnect} className='w-full bg-red-400 hover:bg-red-500 bg-opacity-30'>Disconnect</Button>
                    </div>
                </PopoverContent>
            </Popover>


        </div>
    )
}

export default Head