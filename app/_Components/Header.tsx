import { Button } from '@/components/ui/button'
import Link from 'next/link' // <-- Correct import for navigation
import React from 'react'

function Header() {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">AI-MOCK-INTERVIEW</h1>
      </div>
      <Link href="/dashboard">
        <Button size="lg">Get Started</Button>
      </Link>
    </nav>
  )
}

export default Header