'use client'

import React, { useState } from 'react'

export function DropZone () {
  const [file, setFile] = useState<File | undefined>()
  const [urlObj, setUrlObj] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [resultAvailable, setResultAvailable] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")


  async function handleSubmit (e: React.SyntheticEvent) {
    e.preventDefault()
    
    if ( typeof file !== 'undefined'){
      const formData = new FormData();
      formData.append('file', file);
      
      setLoading(true)
      fetch("http://0.0.0.0:8000/summarize", {
        method: 'POST',
        body: formData,
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => {
          setResultAvailable(true)
          setResult(result.summary)
          console.log(result.summary)
        })
        .catch(error => {
          setResultAvailable(false)
          setLoading(false)
          setFile(undefined)
          console.log('error', error)
        })
    }
  }

  async function handleDelete (e: React.SyntheticEvent) {
    e.preventDefault()
    setResultAvailable(false)
    setLoading(false)
    setFile(undefined)
  }

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList
    }
    setFile(target.files[0])
    setUrlObj(URL.createObjectURL(target.files[0]))
  };
  
  return (
    <form className="flex flex-col items-center justify-center w-full">
        {file 
        ? (
          <div className="w-full flex-col mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between space-y-3">
            <span className="text-sm text-gray-500 font-semibold">
              {file.name}
            </span>

            <div className="flex">
              <audio controls className="pr-4">
                <source src={urlObj} type="audio/ogg"/>
                Your browser does not support the audio element.
              </audio>
              <button type="button" onClick={handleDelete} className="text-white bg-[#5741c4] hover:bg-[#963232] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-l-full text-sm px-5 py-3 text-center inline-flex items-center">
                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
                </svg>
              </button>
              <button type="button" onClick={handleSubmit} className="text-white bg-[#7154fd] hover:bg-[#6148db] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-full text-sm px-5 py-2.5 text-center inline-flex items-center">
                Summarize
              </button>
            </div>
          <div>
          {loading && (
          <div className="relative w-full items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 opacity-20">Summary of {file.name}</h5>
              {resultAvailable ? (
                <p className="font-normal text-gray-700">{result}</p>
              )
              : (
              <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                  <span className="sr-only">Loading...</span>
              </div>
              )}
          </div>
          )}
          </div>
          </div>  
        )
      : (
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 font-sans">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 px-5">WAV, MP3, M4A, AVI, MPEG, OGG or CAF (MAX. 5 minutes)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept='.wav, .mp3, .m4a, .avi, .mpeg, .caf, .ogg'
              onChange={handleFileChange}
            />
        </label>
      )}
    </form> 
  )
}