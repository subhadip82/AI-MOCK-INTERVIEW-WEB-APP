import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function JobDescription({ onHandleInputChange }: any) {
  return (
    <div className='border p-10 rounded-2xl space-y-4'>
    <div>
        <label>Job title</label>
         <Input type='text' placeholder='e.g. Software Engineer' className='mt-2' onChange={(event) => onHandleInputChange('jobTitle', event.target.value)} />
    </div>

    <div className='mt-4'>
        <label>Job description</label>
         <Textarea  placeholder='Enter or Paste your job Description ' className='mt-2 h-[200px]' onChange={(event) => onHandleInputChange('jobDescription', event.target.value)} />
    </div>




    </div>
  )
}

export  default JobDescription