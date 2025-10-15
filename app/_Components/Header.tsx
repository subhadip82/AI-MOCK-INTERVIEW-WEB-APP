import { Button } from '@/components/ui/button'
import Link from 'next/link' // <-- Correct import for navigation
import React from 'react'

function Header() {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
  <div className="flex items-center gap-2">
    <Link href="/" className="flex items-center gap-2">
      <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
      <h1 className="text-base font-bold md:text-2xl text-white">AI-MOCK-INTERVIEW</h1>
    </Link>
  </div>

  <div className="flex items-center gap-4">
    <div className="hidden md:flex items-center gap-6">
      <Link
        href="/how-it-works"
        className="text-sm font-semibold text-white hover:text-gray-300 transition-colors duration-200"
      >
        How It Works
      </Link>
      <Link
        href="/about"
        className="text-sm font-semibold text-white hover:text-gray-300 transition-colors duration-200"
      >
        About
      </Link>
      {/* <Link
        href="/mobile-app"
        className="text-sm font-semibold text-white hover:text-gray-300 transition-colors duration-200"
      >
        Mobile App
      </Link> */}
      <Link
        href="/upgrade"
        className="text-sm font-semibold text-white hover:text-gray-300 transition-colors duration-200"
      >
        upgrade
      </Link>
    </div>
        <Link href="/dashboard">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </nav>
  )
}

export default Header