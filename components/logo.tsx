import Image from 'next/image'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'

type Props = {
    className?:string
}

const Logo = ({className}:Props) => {
  return (
    <Image
        src={'/logo.svg'}
        width={502}
        height={163}
        alt="logo"
        className={className+" p-10"}
      />
  )
}

export default Logo