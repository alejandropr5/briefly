'use client'

import React from 'react'
import { ClientImage } from './logo'
import briefly from '../../../../public/briefly.png'

export function CustomHeader() {
    return (
        <header className="mx-4 w-full h-fit">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <div className="flex flex-row justify-between items-center space-x-2">
              <div className="h-7 w-7">
                <ClientImage imageComponent={briefly} description={'briefly logo'}/>
              </div>
              <span className="font-custom text-[#232833] text-[30pt] justify-between items-center">briefly</span>
            </div>
            <nav className="font-semibold mx-3 text-[#232833] text-[12pt] space-x-4">
              <a rel="noopener noreferrer nofollow external" target="_blank" className="text-[#232833] hover:text-[#7154fd] font-code" href="https://github.com/alejandropr5/briefly.git">
              {'<'}Source Code{'/>'}
              </a>
              {/* <a rel="noopener noreferrer nofollow external" target="_blank" className="text-[#232833] hover:text-[#7154fd]" href="">
                About us
              </a> */}
            </nav>
          </div>
        </header>
    )
}