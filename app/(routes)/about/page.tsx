'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Target, Zap, Shield, Star, Award } from 'lucide-react';
import Link from 'next/link';

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About AI Interview Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Revolutionizing the interview process with AI-powered assessments, 
            real-time feedback, and comprehensive evaluation tools.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To democratize access to high-quality interview preparation and assessment tools, 
              making professional development accessible to everyone, everywhere.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Precision Assessment</h3>
              <p className="text-gray-600">
                Our AI evaluates responses with human-level accuracy, providing detailed 
                feedback on communication skills, technical knowledge, and problem-solving abilities.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Feedback</h3>
              <p className="text-gray-600">
                Get instant feedback during your interview, helping you improve your 
                performance in real-time and learn from each interaction.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security. All interviews 
                are encrypted and stored securely with full privacy compliance.
              </p>
            </div>
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
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Advanced AI Technology</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Natural Language Processing</h4>
                    <p className="text-gray-600">Understands context and nuance in your responses</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Behavioral Analysis</h4>
                    <p className="text-gray-600">Evaluates communication patterns and confidence levels</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Adaptive Questioning</h4>
                    <p className="text-gray-600">Questions adapt based on your responses and skill level</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center">
                <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Comprehensive Scoring</h4>
                <p className="text-gray-600 mb-4">
                  Get detailed scores across multiple dimensions including technical skills, 
                  communication, problem-solving, and cultural fit.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-gray-600">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">10K+</div>
                    <div className="text-gray-600">Interviews Conducted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Built by Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team combines decades of experience in HR technology, AI research, 
              and user experience design to create the most advanced interview platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">AI Research Team</h3>
              <p className="text-gray-600 mb-4">
                PhD-level researchers specializing in natural language processing and machine learning.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">HR Technology Experts</h3>
              <p className="text-gray-600 mb-4">
                Former HR professionals and talent acquisition specialists with deep industry knowledge.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Product Design Team</h3>
              <p className="text-gray-600 mb-4">
                UX/UI designers focused on creating intuitive and engaging user experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Interview Experience?
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

export default About;
