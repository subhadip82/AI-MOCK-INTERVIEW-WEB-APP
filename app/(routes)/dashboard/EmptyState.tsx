import { Button } from '@/components/ui/button'
import React from 'react'

function EmptyState() {
  return (
    <div className = 'mt-14 flex flex-col items-center justify-center gap-5 border border-dashed border-gray-400 p-10 rounded-lg bg-gray-30'>
        <img src='/empty-state.png' alt='No Interviews'
        width={200}
        height={200}
        />
        <h2 className='text-2xl font-bold mt-4'>No Interviews Created</h2>
        <p className='text-gray-500 mt-2'>Create your first interview to get started!</p>
        <Button>+ Create Interview</Button>
    </div>
  )
}

export default EmptyState