"use client";
import React from 'react'

import { motion } from "motion/react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Herosection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-100 via-pink-50 to-white p-10">
      <div className="px-4 py-10 md:py-20 w-full max-w-4xl">
        <h1 className="relative z-10 mx-auto text-center text-2xl font-bold text-slate-800 md:text-4xl lg:text-7xl dark:text-slate-200">
          {"Masterd your interview with AI-powered mock interviews"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-medium text-slate-700 dark:text-slate-300"
        >
          With DIP AI, you can practice your interview skills anytime, anywhere.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/dashboard">
            <Button size="lg" className="bg-violet-500 hover:bg-violet-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md">
              Get Started
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-lg shadow-md font-semibold text-lg">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow-md font-semibold text-lg">
              Sign Up
            </Button>
          </Link>
          <button className="w-60 transform rounded-lg border-2 border-slate-300 bg-white px-6 py-2 font-semibold text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
            Contact Support
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="HERO.PNG"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Herosection;