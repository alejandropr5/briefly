import Image from 'next/image'
import { DropZone } from './components/client/dropzone'
import { ClientImage } from './components/client/logo'

import { CustomFooter } from './components/client/footer'
import { CustomHeader } from './components/client/header'

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center bg-[#e6e0f4]">
      <CustomHeader/>
      <div className="flex flex-col h-full items-center justify-between px-16 m-12 lg:px-60 w-full">
        <div className="flex flex-col grow w-full py-6 items-center justify-between">
          <h1>
            AI-powered audio
            briefly transcriptions
          </h1>
          <p>
            Effortlessly produce studio quality videos with AI-generated avatars and voices.
          </p>
        </div>
        <DropZone/>
      </div>
      <CustomFooter/>
    </main>
  )
}