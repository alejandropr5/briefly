import Image from 'next/image'
import { DropZone } from './components/client/dropzone'

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center bg-[#e6e0f4]">
      <div className="flex h-full items-center justify-between w-full">
        <span>briefly</span>
      </div>
      <div className="flex h-full items-center justify-between w-1/2">
        <DropZone/>
      </div>
    </main>
  )
}