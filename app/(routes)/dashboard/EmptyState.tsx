import { Button } from '@/components/ui/button'
import React from 'react'
import CreatinterviewDialog from '../_components/CreatinterviewDialog'
import { Rocket, Target, Award, Star } from 'lucide-react'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md mx-auto">
        {/* Animated Illustration */}
        <div className="relative mb-8">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <div className="text-6xl">🎯</div>
          </div>
          <div className="absolute -top-2 -right-2 animate-bounce">
            <Rocket className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">No Interviews Yet</h2>
          <p className="text-lg text-gray-600">
            Start your journey to interview success! Create your first mock interview and get personalized feedback.
          </p>
          
          {/* Features List */}
          <div className="grid grid-cols-1 gap-3 py-6">
            <div className="flex items-center justify-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Practice with real interview questions</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-3 bg-green-50 rounded-lg">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Get AI-powered feedback</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Star className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Track your progress over time</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <CreatinterviewDialog />
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 pt-4">
            It only takes 10-15 minutes to complete your first interview
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmptyState