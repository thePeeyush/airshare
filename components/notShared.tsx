import Image from 'next/image'
import React from 'react'

const NotShared = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 h-[81vh]'>
        <p className='text-gray-600 text-sm'>Start shraring by choosing file below</p>
        <Image
        src={'/upload.png'}
        width={500}
        height={500}
        alt='uplaod below'
        />
    </div>
  )
}

export default NotShared