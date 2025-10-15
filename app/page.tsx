import Image from "next/image";
import Header from "./_Components/Header";
import Herosection from "./_Components/Herosection";
import Footer from "./_Components/Footer";
import { 
  Star, 
  Zap, 
  Target, 
  Users, 
  Crown, 
  CheckCircle, 
  ArrowRight,
  Play,
  Shield,
  Award,
  TrendingUp,
  Globe,
  Smartphone,
  Download,
  QrCode
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/40"></div>
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-white/90 text-sm font-medium">AI-Powered Interview Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master Your
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Interviews</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Practice with AI interviewers, get real-time feedback, and land your dream job. 
              The future of interview preparation is here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl">
                  <Play className="w-5 h-5 mr-2" />
                  Start Practicing
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                <Download className="w-5 h-5 mr-2" />
                Download App
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-white/85 font-medium">Interviews Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-white/85 font-medium">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-white/85 font-medium">Industries Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/85 font-medium">Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Advanced AI technology meets beautiful design to create the ultimate interview preparation experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Real-time AI Feedback",
                description: "Get instant feedback on your answers, body language, and communication skills during the interview.",
                color: "from-yellow-400 to-orange-500"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Face Detection & Analysis",
                description: "Advanced AI tracks your facial expressions and provides insights on your confidence and engagement.",
                color: "from-green-400 to-emerald-500"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Industry-Specific Questions",
                description: "Practice with questions tailored to your industry, role, and experience level.",
                color: "from-blue-400 to-cyan-500"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure & Private",
                description: "Your interviews are completely private and secure. Practice with confidence.",
                color: "from-purple-400 to-pink-500"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Progress Tracking",
                description: "Track your improvement over time with detailed analytics and performance insights.",
                color: "from-pink-400 to-rose-500"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Accessibility",
                description: "Practice from anywhere in the world with our cloud-based platform.",
                color: "from-indigo-400 to-purple-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Choose the plan that fits your needs. No hidden fees, no surprises.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "₹0",
                period: "forever",
                features: ["2 interviews per day", "Basic AI feedback", "Standard questions", "Email support"],
                popular: false,
                color: "border-white/30"
              },
              {
                name: "Pro Monthly",
                price: "₹4",
                period: "month",
                features: ["10 interviews per month", "Advanced AI feedback", "Custom questions", "Priority support", "Video recording"],
                popular: true,
                color: "border-blue-400"
              },
              {
                name: "Pro Yearly",
                price: "₹10",
                period: "year",
                features: ["Unlimited interviews", "All features", "API access", "Custom branding", "Dedicated support"],
                popular: false,
                color: "border-green-400"
              }
            ].map((plan, index) => (
              <div key={index} className={`bg-white/10 backdrop-blur-sm border-2 ${plan.color} rounded-2xl p-8 relative ${plan.popular ? 'ring-2 ring-blue-400' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/70 ml-1">/{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href={plan.price === '₹0' ? '/dashboard' : '/upgrade'}>
                  <Button 
                    className={`w-full py-3 text-lg font-semibold ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
                        : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                    }`}
                  >
                    {plan.price === '₹0' ? 'Get Started Free' : `Choose ${plan.name}`}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of successful candidates who have improved their interview skills with our AI platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/mobile-app">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Download Mobile App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
