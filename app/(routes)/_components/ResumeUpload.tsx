"use client";
import React from 'react'
import { FileUpload } from '@/components/ui/file-upload';

function ResumeUpload({ setFiles, file }: { setFiles: (files: File[]) => void, file: File | null }) {
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className="w-full flex items-center justify-center min-h-96">
        <div className="w-full max-w-2xl min-h-60 flex items-center justify-center border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg rounded-2xl">
          <FileUpload onChange={handleFileUpload} />
        </div>
      </div>
      {file && (
        <div className="mt-4 text-center text-sm text-gray-700">
          Selected PDF: <span className="font-semibold">{file.name}</span>
        </div>
      )}
    </div>
  )
}

export default ResumeUpload