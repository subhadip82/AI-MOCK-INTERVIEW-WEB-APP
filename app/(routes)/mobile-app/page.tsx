"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Download, 
  Star, 
  Zap, 
  Target, 
  Users, 
  Crown, 
  CheckCircle, 
  ArrowRight,
  QrCode,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Camera,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Settings,
  Bell,
  MessageSquare,
  BarChart3,
  Award,
  Clock,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

const MobileAppPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const questions = [
    "Tell me about yourself and your background.",
    "What are your greatest strengths?",
    "Why do you want to work for our company?",
    "Describe a challenging situation you faced and how you resolved it.",
    "Where do you see yourself in 5 years?"
  ];

  const features = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile First Design",
      description: "Beautiful interface optimized for mobile devices",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Offline Mode",
      description: "Practice interviews without internet connection",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "AI Face Detection",
      description: "Advanced face tracking and analysis",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Real-time Feedback",
      description: "Instant feedback during interviews",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      features: ["2 interviews/day", "Basic feedback", "Standard questions"],
      popular: false,
      color: "border-gray-300"
    },
    {
      name: "Pro Monthly",
      price: "₹4",
      period: "month",
      features: ["10 interviews/month", "Advanced feedback", "Custom questions", "Priority support"],
      popular: true,
      color: "border-blue-500"
    },
    {
      name: "Pro Yearly",
      price: "₹10",
      period: "year",
      features: ["Unlimited interviews", "All features", "API access", "Custom branding"],
      popular: false,
      color: "border-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Beautiful Mobile App
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Experience AI-powered interviews with our stunning mobile application. 
                Designed for the modern job seeker.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download App
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 text-lg"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Scan QR Code
                </Button>
              </div>
            </div>
            
            {/* Mobile App Preview */}
            <div className="relative">
              <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl mx-auto max-w-sm">
                <div className="bg-white rounded-2xl overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-gray-100 px-4 py-2 flex justify-between items-center text-xs">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-4 h-2 bg-gray-400 rounded"></div>
                      <div className="w-4 h-2 bg-gray-400 rounded"></div>
                      <div className="w-4 h-2 bg-gray-400 rounded"></div>
                    </div>
                  </div>
                  
                  {/* App Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg">AI Interview</h3>
                        <p className="text-blue-100 text-sm">Question {currentQuestion + 1}/5</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-white bg-opacity-20 rounded-full">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white bg-opacity-20 rounded-full">
                          <Bell className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Interface */}
                  <div className="p-4">
                    <div className="bg-gray-200 rounded-lg aspect-video mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Camera className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm">Your Video</p>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <button 
                          onClick={() => setIsVideoOn(!isVideoOn)}
                          className={`p-2 rounded-full ${isVideoOn ? 'bg-green-500' : 'bg-red-500'}`}
                        >
                          {isVideoOn ? <Video className="w-4 h-4 text-white" /> : <VideoOff className="w-4 h-4 text-white" />}
                        </button>
                      </div>
                    </div>
                    
                    {/* AI Avatar */}
                    <div className="bg-gray-200 rounded-lg aspect-video mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-2xl">🤖</span>
                          </div>
                          <p className="text-sm">AI Interviewer</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Current Question */}
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Current Question:</h4>
                      <p className="text-gray-700 text-sm">{questions[currentQuestion]}</p>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex justify-center space-x-4">
                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-green-500'}`}
                      >
                        {isMuted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
                      </button>
                      <button 
                        onClick={() => setIsRecording(!isRecording)}
                        className={`p-3 rounded-full ${isRecording ? 'bg-red-500' : 'bg-gray-500'}`}
                      >
                        {isRecording ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">App Features</h2>
            <p className="text-xl text-gray-600">Everything you need for successful interviews</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Flexible pricing for every need</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 border-2 ${plan.color} ${plan.popular ? 'ring-2 ring-blue-500' : ''} relative`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 text-lg font-semibold ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  onClick={() => {
                    if (plan.price === '₹0') {
                      // Free plan - redirect to dashboard
                      window.location.href = '/dashboard';
                    } else {
                      // Paid plan - show upgrade modal
                      setShowUpgrade(true);
                    }
                  }}
                >
                  {plan.price === '₹0' ? 'Get Started' : `Choose ${plan.name}`}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Download our mobile app and start practicing interviews today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={() => {
                  // Simulate Android download
                  alert('Android APK download started! In a real app, this would download the actual APK file.');
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download for Android
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={() => {
                  // Simulate iOS download
                  alert('iOS App Store redirect! In a real app, this would redirect to the App Store.');
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download for iOS
              </Button>
          </div>
          
          <div className="mt-8">
            <p className="text-blue-100 mb-4">Or scan QR code with your phone</p>
            <div className="inline-block p-4 bg-white rounded-lg">
              <QrCode className="w-32 h-32 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to Pro</h3>
              <p className="text-gray-600">Unlock unlimited interviews and advanced features</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Monthly Plan</span>
                <span className="text-lg font-bold">₹4/month</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Yearly Plan</span>
                <span className="text-lg font-bold">₹10/year</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={() => setShowUpgrade(false)}
                variant="outline" 
                className="flex-1"
              >
                Cancel
              </Button>
                <Link href="/upgrade" className="flex-1">
                  <Button 
                    onClick={() => setShowUpgrade(false)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Upgrade Now
                  </Button>
                </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileAppPage;
