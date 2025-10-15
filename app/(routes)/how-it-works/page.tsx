'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  Brain, 
  Video, 
  MessageSquare, 
  BarChart3, 
  CheckCircle,
  ArrowRight,
  Users,
  Target,
  Zap
} from 'lucide-react';
import Link from 'next/link';

function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: <Upload className="w-8 h-8" />,
      title: 'Upload Your Resume',
      description: 'Upload your resume or provide job description details to customize your interview experience.',
      details: [
        'AI analyzes your background and experience',
        'Generates relevant questions based on your profile',
        'Customizes difficulty level to your skill set'
      ]
    },
    {
      number: 2,
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Generates Questions',
      description: 'Our advanced AI creates personalized interview questions tailored to your specific role and experience.',
      details: [
        'Questions cover technical skills and behavioral aspects',
        'Adaptive questioning based on your responses',
        'Industry-specific scenarios and case studies'
      ]
    },
    {
      number: 3,
      icon: <Video className="w-8 h-8" />,
      title: 'Start Live Interview',
      description: 'Begin your interview with real-time video streaming and interactive chat functionality.',
      details: [
        'Live video feed with AI interviewer avatar',
        'Real-time chat for questions and answers',
        'Mute/unmute and video controls available'
      ]
    },
    {
      number: 4,
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Interactive Q&A',
      description: 'Answer questions through our intuitive chat interface with real-time feedback.',
      details: [
        'Type your answers in the chat sidebar',
        'AI provides immediate feedback on responses',
        'Progress tracking throughout the interview'
      ]
    },
    {
      number: 5,
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Get Detailed Feedback',
      description: 'Receive comprehensive feedback and scoring through our n8n integration system.',
      details: [
        'Detailed analysis of your performance',
        'Scores across multiple skill dimensions',
        'Actionable recommendations for improvement'
      ]
    }
  ];

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Personalized Assessment',
      description: 'Questions tailored to your specific role, experience, and career goals.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Real-time Feedback',
      description: 'Get instant feedback during your interview to improve performance immediately.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'AI-Powered Evaluation',
      description: 'Advanced AI evaluates your responses with human-level accuracy and insight.'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Comprehensive Scoring',
      description: 'Detailed scores across technical skills, communication, and problem-solving abilities.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How It Works
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Experience the future of interview preparation with our AI-powered platform. 
            From resume upload to detailed feedback, we guide you through every step.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Get Started
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Interview Process
            </h2>
            <p className="text-xl text-gray-600">
              Follow these simple steps to complete your AI-powered interview
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600">
                      {step.icon}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-blue-600">STEP {step.number}</span>
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="md:w-1/2 flex justify-center">
                  <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Step {step.number} Illustration</span>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 mt-8">
                    <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Key Features
            </h2>
            <p className="text-xl text-gray-600">
              Discover what makes our platform unique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Powered by Advanced Technology
            </h2>
            <p className="text-xl text-gray-600">
              Our platform leverages cutting-edge AI and automation technologies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI & Machine Learning</h3>
              <p className="text-gray-600">
                Advanced natural language processing and machine learning algorithms 
                provide accurate assessment and feedback.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Processing</h3>
              <p className="text-gray-600">
                Instant processing and feedback using cloud-based infrastructure 
                for seamless user experience.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">n8n Automation</h3>
              <p className="text-gray-600">
                Automated workflow management and feedback generation using 
                n8n integration for consistent results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our Platform?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Comprehensive Interview Experience</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Personalized Questions</h4>
                    <p className="text-gray-600">Questions tailored to your specific role and experience level</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Real-time Feedback</h4>
                    <p className="text-gray-600">Get instant feedback during your interview to improve performance</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Detailed Analytics</h4>
                    <p className="text-gray-600">Comprehensive scoring and analysis across multiple skill dimensions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600 mb-4">User Satisfaction Rate</div>
                <div className="text-sm text-gray-500">
                  Based on feedback from 10,000+ completed interviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Future of Interviews?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who have improved their interview skills with our AI platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Your First Interview
              </Button>
            </Link>
            <Link href="/upgrade">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
