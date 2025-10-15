'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown, Users, Target } from 'lucide-react';
import Link from 'next/link';

function Upgrade() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '2 interviews per day',
        'Basic AI feedback',
        'Standard question sets',
        'Email support',
        'Basic analytics'
      ],
      limitations: [
        'Limited to 2 interviews per day',
        'Basic feedback only',
        'No priority support'
      ],
      popular: false,
      badge: null
    },
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: 4,
      period: 'month',
      description: 'Best for regular users',
      features: [
        '10 interviews per month',
        'Advanced AI feedback',
        'Custom question sets',
        'Priority support',
        'Video recording',
        'Export reports',
        'Progress tracking'
      ],
      limitations: [],
      popular: true,
      badge: 'Most Popular'
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: 10,
      period: 'year',
      monthlyEquivalent: 0.83,
      description: 'Best value - unlimited access',
      features: [
        'Unlimited interviews',
        'Advanced AI feedback',
        'Custom question sets',
        'Priority support',
        'Video recording',
        'Export reports',
        'Progress tracking',
        'API access',
        'Custom branding',
        '75% savings vs monthly'
      ],
      limitations: [],
      popular: true,
      badge: 'Best Value'
    }
  ];

  const handlePayment = async (planId: string, amount: number) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: planId,
          paymentMethod: selectedPaymentMethod,
          amount: amount,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Show payment details based on method
        if (selectedPaymentMethod === 'upi') {
          alert(`UPI Payment Details:\nUPI ID: ${data.paymentDetails.upiId}\nAmount: ₹${amount}\nTransaction ID: ${data.paymentDetails.transactionId}\n\nPlease complete the payment using your UPI app.`);
        } else if (selectedPaymentMethod === 'qr') {
          alert(`QR Code Payment:\nAmount: ₹${amount}\nTransaction ID: ${data.paymentDetails.transactionId}\n\nScan the QR code with your payment app to complete the payment.`);
        } else if (selectedPaymentMethod === 'card') {
          alert(`Card Payment:\nAmount: ₹${amount}\nTransaction ID: ${data.paymentDetails.transactionId}\n\nComplete the payment using your card.`);
        }
        
        // Simulate payment completion (in real app, this would be handled by payment gateway)
        setTimeout(() => {
          completePayment(data.paymentId);
        }, 3000);
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const completePayment = async (paymentId: string) => {
    try {
      await fetch('/api/payment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId: paymentId,
          status: 'completed',
        }),
      });
      
      alert('Payment completed successfully! Your subscription is now active.');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Payment completion error:', error);
      alert('Payment completion failed. Please contact support.');
    }
  };

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Advanced Assessment',
      description: 'Comprehensive evaluation across multiple skill dimensions'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Real-time Feedback',
      description: 'Instant feedback during interviews to improve performance'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Team Collaboration',
      description: 'Share interviews and feedback with team members'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Premium Support',
      description: 'Priority support and dedicated account management'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Unlock the full potential of AI-powered interviews with our flexible pricing plans.
          </p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setSelectedPaymentMethod('upi')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedPaymentMethod === 'upi'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              💳 UPI
            </button>
            <button
              onClick={() => setSelectedPaymentMethod('qr')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedPaymentMethod === 'qr'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              📱 QR Code
            </button>
            <button
              onClick={() => setSelectedPaymentMethod('card')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedPaymentMethod === 'card'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              💳 Card
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => {

              return (
                <div
                  key={plan.id}
                  className={`bg-white rounded-xl shadow-lg p-6 relative ${
                    plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        plan.badge === 'Most Popular' ? 'bg-blue-500 text-white' :
                        plan.badge === 'Best Value' ? 'bg-green-500 text-white' :
                        'bg-purple-500 text-white'
                      }`}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-4">
                      {plan.id === 'free' && <Target className="w-8 h-8 text-gray-600" />}
                      {(plan.id === 'pro-monthly' || plan.id === 'pro-yearly') && <Star className="w-8 h-8 text-yellow-500" />}
                      {plan.id === 'enterprise' && <Crown className="w-8 h-8 text-purple-500" />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <div className="flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
                        <span className="text-gray-600 ml-1">/{plan.period}</span>
                      </div>
                      {plan.monthlyEquivalent && (
                        <p className="text-sm text-gray-500 mt-1">
                          ₹{plan.monthlyEquivalent}/month
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : plan.id === 'free'
                        ? 'bg-gray-600 hover:bg-gray-700'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    onClick={() => {
                      if (plan.id === 'free') {
                        window.location.href = '/dashboard';
                      } else {
                        handlePayment(plan.id, plan.price);
                      }
                    }}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 
                     plan.id === 'free' ? 'Get Started Free' : 
                     `Pay ₹${plan.price}`}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Feature Comparison
            </h2>
            <p className="text-xl text-gray-600">
              See what's included in each plan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
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

      {/* Detailed Comparison Table */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Detailed Feature Comparison
            </h2>
            <p className="text-xl text-gray-600">
              Compare all features across our plans
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Free</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Pro Monthly</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Pro Yearly</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Interviews per month</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">3</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Unlimited</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Unlimited</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Unlimited</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">AI Feedback Quality</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Basic</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Advanced</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Advanced</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Premium</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Custom Question Sets</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Video Recording</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Export Reports</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Priority Support</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Team Management</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">API Access</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Custom Branding</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Can I change plans anytime?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                and we'll prorate any billing differences. You can switch between monthly and yearly billing cycles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Is there a free trial?</h3>
              <p className="text-gray-600">
                Yes! Our free plan includes 3 interviews per month so you can experience the platform 
                before committing to a paid plan. No credit card required for the free plan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, UPI, net banking, and digital wallets for Indian customers. 
                For enterprise plans, we also accept bank transfers. All payments are processed securely.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Do you offer refunds?</h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied 
                with our service, we'll refund your payment in full, no questions asked.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">What's the difference between monthly and yearly plans?</h3>
              <p className="text-gray-600">
                Yearly plans offer significant savings - you get 2 months free (17% discount) compared to monthly billing. 
                All features are identical, just better value with annual commitment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. Your access will continue until the end of your 
                current billing period, and you won't be charged again.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who have improved their interview skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Arjun Sharma</h4>
                  <p className="text-sm text-gray-600">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The AI feedback is incredibly detailed and helped me identify areas I never knew I was weak in. 
                Landed my dream job at a top tech company!"
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Priya Patel</h4>
                  <p className="text-sm text-gray-600">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The custom question sets for product management roles are spot-on. 
                The real-time feedback during interviews is a game-changer."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Rajesh Kumar</h4>
                  <p className="text-sm text-gray-600">Data Scientist</p>
                </div>
              </div>
              <p className="text-gray-700">
                "As a data scientist, I needed technical questions that actually matter. 
                This platform delivered exactly what I needed to prepare for senior roles."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Upgrade?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who have improved their interview skills with our AI platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
