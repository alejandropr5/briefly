'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image';

interface ClientImageProps {
    imageComponent: StaticImageData;
    description: string;
  }
  
export function ClientImage({ imageComponent,  description}: ClientImageProps) {
    return (
        <Image
            src={imageComponent}
            alt={description}
            className='w-auto h-full'
        />
    )
  }