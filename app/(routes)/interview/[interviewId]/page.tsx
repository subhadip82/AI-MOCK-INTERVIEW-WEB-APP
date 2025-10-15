'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Send } from 'lucide-react'
import { useParams } from 'next/navigation';
import Link from 'next/link'; // ✅ import Link

function Interview() {
  const { interviewId } = useParams();

  return (
    <div className='flex flex-col items-center justify-center mt-14'>
      <div className='max-w-3xl w-full'>
        <Image 
          src={'/interviewimage.png'} 
          alt='interview' 
          width={400} 
          height={200}
          className='w-full h-[300px] object-cover'
        />

        <div className='p-6 flex flex-col items-center space-y-6'>
          <h2 className='font-bold text-3xl text-center'>Ready to start the interview?</h2>
          <p className='text-gray-500 text-center'>The Interview will last 30 minutes. Are you ready to begin?</p>

          {/* ✅ Correct usage */}
          

<Link href={`/interview/${interviewId}/start`}>
  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl gap-2">
    <ArrowRight className="w-5 h-5" />
    Start Interview
  </Button>
</Link>


          <hr />
          <div className='p-6 bg-gray-200 rounded-2xl w-full'>
            <h2 className='font-semibold text-2xl'>Want to Send Interview Link to Someone?</h2>
            <div className='flex gap-5 w-full items-center max-w-xl mt-2'>
              <input 
                placeholder="Enter email address" 
                className="w-full max-w-xl border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" 
              />
              <Button><Send /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Interview;
