import Image from 'next/image'
import React from 'react'

const NotShared = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 h-[81vh]'>
        <Image
        src={'/upload.svg'}
        width={500}
        height={500}
        alt='uplaod below'
        />
        <p className='text-gray-200 text-sm'>Start shraring by choosing file below</p>
    </div>
  )
}

export default NotShared