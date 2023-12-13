import { DropZone } from './components/client/dropzone'

import { CustomFooter } from './components/client/footer'
import { CustomHeader } from './components/client/header'

export default function Home() {
  return (
    <main className="flex h-full min-h-screen min-w-screen flex-col items-center bg-[#e6e0f4]">
      <CustomHeader/>
      <div className="flex flex-col grow h-full items-center justify-between px-16 m-8 max-w-6xl w-full space-y-5">
        <div className="flex flex-col  w-full pb-6 items-center justify-between text-[#232833] font-sans space-y-3">
          <h1 className="text-[50px] font-bold">
            <center> 
              AI-powered audio<br/>
              <span className="font-custom font-normal text-[#7154fd]">briefly</span> transcriptions
            </center> 
          </h1>
          <h2 className="font-semibold">
            <center>
              Seamlessly transform spoken words into written insights<br/>
              with AI-enhanced audio transcriptions.
            </center>
          </h2>
        </div>
        <DropZone/>
        <span className="grow"/>
      </div>
      <CustomFooter/>
    </main>
  )
}