"use client";
import React, { useState } from 'react'
import { FileUpload } from '@/components/ui/file-upload';

export function ResumeUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className='flex items-center justify-center'>
    <div className="w-full flex items-center justify-center min-h-96">
      <div className="w-full max-w-2xl min-h-60 flex items-center justify-center border border-dashed bg-white dark:bg-black border-neutral-200
       dark:border-neutral-800 rounded-lg   rounded-2xl">
        <FileUpload onChange={handleFileUpload} />
      </div>
    </div>
    </div>
  )
}

export default ResumeUpload