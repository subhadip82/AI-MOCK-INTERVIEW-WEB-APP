"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Smartphone, Star, Zap, Crown, Users, Target, CheckCircle, ArrowRight, QrCode } from 'lucide-react';
import Link from 'next/link';

const AppDownloadPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    if (typeof window === 'undefined') return;

    // Check if user has dismissed the popup permanently
    const dismissedPermanently = localStorage.getItem('app-download-dismissed-permanently');
    const lastDismissed = localStorage.getItem('app-download-last-dismissed');
    
    // If dismissed permanently, don't show
    if (dismissedPermanently === 'true') {
      return;
    }
    
    // If dismissed recently (within 24 hours), don't show
    if (lastDismissed) {
      const lastDismissedTime = parseInt(lastDismissed);
      const now = Date.now();
      const hoursSinceDismissed = (now - lastDismissedTime) / (1000 * 60 * 60);
      
      if (hoursSinceDismissed < 24) {
        return;
      }
    }

    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      // Simulate download progress
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsDownloading(false);
            setShowPopup(false);
            
          // Mark as downloaded to not show again for a while
          if (typeof window !== 'undefined') {
            localStorage.setItem('app-download-last-dismissed', Date.now().toString());
          }
            
            // Create a mock download link
            const downloadLink = document.createElement('a');
            downloadLink.href = '/mobile-app'; // Redirect to mobile app page
            downloadLink.download = 'AI-Interview-App.apk'; // Mock APK name
            downloadLink.click();
            
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      alert('Download failed. Please try again or visit our mobile app page.');
    }
  };

  const handleClose = (permanently = false) => {
    setShowPopup(false);
    
    // Only use localStorage on client side
    if (typeof window !== 'undefined') {
      if (permanently) {
        // Don't show again ever
        localStorage.setItem('app-download-dismissed-permanently', 'true');
      } else {
        // Show again after 24 hours
        localStorage.setItem('app-download-last-dismissed', Date.now().toString());
      }
    }
  };

  const handleContinueWeb = () => {
    handleClose(false); // Show again after 24 hours
  };

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Optimized",
      description: "Beautiful interface designed for mobile devices"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Offline Mode",
      description: "Practice interviews even without internet"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Face Detection",
      description: "Advanced AI-powered face tracking"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Real-time Feedback",
      description: "Instant feedback during interviews"
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      features: ["2 interviews/day", "Basic feedback", "Standard questions"],
      popular: false
    },
    {
      name: "Pro Monthly",
      price: "₹4",
      period: "month",
      features: ["10 interviews/month", "Advanced feedback", "Custom questions", "Priority support"],
      popular: true
    },
    {
      name: "Pro Yearly",
      price: "₹10",
      period: "year",
      features: ["Unlimited interviews", "All features", "API access", "Custom branding"],
      popular: false
    }
  ];

  // Prevent hydration mismatch by not rendering on server
  if (typeof window === 'undefined' || !showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <button
            onClick={() => handleClose(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Download Our Mobile App</h2>
            <p className="text-blue-100">Get the best interview experience on your mobile device</p>
          </div>
        </div>

        {/* Features */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">App Features</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-blue-600 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Download Button */}
          <div className="mb-6">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold"
            >
              {isDownloading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Downloading... {downloadProgress}%</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download App</span>
                </div>
              )}
            </Button>
            
            {isDownloading && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* QR Code Alternative */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-3">Or scan QR code with your phone</p>
            <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
              <QrCode className="w-24 h-24 text-gray-400" />
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Choose Your Plan</h3>
            <div className="space-y-3">
              {plans.map((plan, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${
                  plan.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                      {plan.popular && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-sm text-gray-600">/{plan.period}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {plan.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue on Web */}
          <div className="mt-6 pt-4 border-t">
            <Button
              onClick={handleContinueWeb}
              variant="outline"
              className="w-full"
            >
              Continue on Web
            </Button>
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => handleClose(true)}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Don't show again
              </button>
              <p className="text-xs text-gray-500">
                Will show again after 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadPopup;
