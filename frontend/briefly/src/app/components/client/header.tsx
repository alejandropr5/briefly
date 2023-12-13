'use client'

import React from 'react'
import { ClientImage } from './logo'
import briefly from '../../../../public/briefly.png'

export function CustomHeader() {
    return (
        <header className="flex justify-between w-full">
          <div className="px-8 flex justify-between items-center w-full">
            <div className="flex flex-row px-6 justify-between items-center">
              <div className="h-7 ml-1 mr-2">
                <ClientImage imageComponent={briefly} description={'briefly logo'}/>
              </div>
              <span className="font-custom text-[#232833] text-[30pt] justify-between items-center">briefly</span>
            </div>
            <nav className="font-semibold mx-3 text-[#232833] text-[12pt] space-x-4">
              <a rel="noopener noreferrer nofollow external" target="_blank" className="text-[#232833] hover:text-[#7154fd]" href="">
                Source Code
              </a>
              <a rel="noopener noreferrer nofollow external" target="_blank" className="text-[#232833] hover:text-[#7154fd]" href="">
                About us
              </a>
            </nav>
          </div>
        </header>
    )
}