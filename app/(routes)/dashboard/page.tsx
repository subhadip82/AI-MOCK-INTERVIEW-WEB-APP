"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react'
import EmptyState from './EmptyState';
import CreatinterviewDialog from '../_components/CreatinterviewDialog';
import { api } from '@/convex/_generated/api';
import { useConvex, useQuery } from 'convex/react';
import { UserDetailsContext } from '@/contex/UserDetailsContext';
import { useContext } from 'react';
import { Star, Calendar, MessageSquare, TrendingUp, Crown, Zap, Target, Users, CheckCircle, AlertCircle, Clock, Award, BarChart3, Play, Eye, ThumbsUp, ThumbsDown, Rocket, Video, Mic, Brain } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type Interview = {
  _id: string;
  jobTitle?: string;
  status?: string;
  createdAt?: number;
  completedAt?: number;
  feedback?: string;
  score?: number;
  interviewQuestions?: Array<{ question: string; answer: string }>;
};

function Dashboard() {
  const { user } = useUser();
  const { userDetail } = useContext(UserDetailsContext);
  const convex = useConvex();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  // Get subscription details
  const subscription = useQuery(api.subscription.getUserSubscription, 
    userDetail?._id ? { userId: userDetail._id as any } : "skip"
  );

  // Get interview limits
  const canCreate = useQuery(api.subscription.canCreateInterview, 
    userDetail?._id ? { userId: userDetail._id as any } : "skip"
  );

  // Get user reminders
  const reminders = useQuery(api.reminders.getUserReminders, 
    userDetail?._id ? { userId: userDetail._id as any } : "skip"
  );

  useEffect(() => {
    if (userDetail?._id) {
      fetchInterviews();
    }
  }, [userDetail]);

  const fetchInterviews = async () => {
    try {
      const result = await convex.query(api.interview.getUserInterviews, {
        userId: userDetail._id as any,
      });
      setInterviews(result);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'feedback_completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'feedback_completed':
        return <Award className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const completedInterviews = interviews.filter(i => i.status === 'feedback_completed');
  const pendingInterviews = interviews.filter(i => i.status === 'pending' || i.status === 'completed');

  // Calculate average score
  const averageScore = completedInterviews.length > 0 
    ? (completedInterviews.reduce((sum, interview) => sum + (interview.score || 0), 0) / completedInterviews.length).toFixed(1)
    : 0;

  // Enhanced Empty State Component
  const EnhancedEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative mb-8">
        {/* Main illustration container */}
        <div className="relative w-80 h-64 mb-8 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-3 opacity-10"></div>
          
          {/* Interview illustration elements */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            {/* Person avatar */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Video className="w-8 h-8 text-white" />
            </div>
            
            {/* Speech bubbles */}
            <div className="space-y-3 mb-6">
              <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm max-w-xs mx-auto">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
              </div>
              <div className="bg-blue-500 p-3 rounded-2xl rounded-br-none shadow-sm max-w-xs mx-auto ml-8">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Progress indicators */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
            <Mic className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          No Interviews Yet
        </h3>
        <p className="text-gray-600 mb-2 text-lg">
          Start your journey to interview mastery
        </p>
        <p className="text-gray-500 mb-8">
          Create your first mock interview and get AI-powered feedback to improve your skills
        </p>
        
        {/* Features grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Video className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Real-time Practice</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Brain className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">AI Feedback</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Score Tracking</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Progress Insights</p>
          </div>
        </div>

        <CreatinterviewDialog />
        
        {/* Quick tip */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-center text-sm text-gray-600">
            <Zap className="w-4 h-4 text-yellow-500 mr-2" />
            <span>Pro tip: Start with common behavioral questions to build confidence</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30'>
      <div className='py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        
        {/* Professional Header */}
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8 shadow-lg relative overflow-hidden'>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>
          
          <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between relative z-10'>
            <div className='mb-4 lg:mb-0'>
              <h1 className='text-3xl font-bold mb-2'>Welcome back, {user?.firstName || 'there'}! 👋</h1>
              <p className='text-blue-100 text-lg'>Ready to ace your next interview?</p>
            </div>
            <div className='text-left lg:text-right'>
              <div className='flex items-center space-x-2 mb-3'>
                <Crown className='w-6 h-6' />
                <span className='font-semibold text-lg'>
                  {subscription?.plan === 'free' ? 'Free Plan' : 
                   subscription?.plan === 'monthly' ? 'Monthly Pro' : 'Yearly Pro'}
                </span>
              </div>
              <Link href="/upgrade">
                <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-2 shadow-sm">
                  {subscription?.plan === 'free' ? 'Upgrade Now' : 'Manage Plan'}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900'>Interview Dashboard</h2>
            <p className='text-gray-600 mt-1'>Start a new interview or review your progress</p>
          </div>
          <CreatinterviewDialog />
        </div>

        {/* Enhanced Stats Cards */}
        {interviews.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1'>
              <div className='flex items-center'>
                <div className='p-3 bg-blue-50 rounded-lg'>
                  <BarChart3 className='w-6 h-6 text-blue-600' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm text-gray-600 font-medium'>Total Interviews</p>
                  <p className='text-2xl font-bold text-gray-900'>{interviews.length}</p>
                </div>
              </div>
            </div>
            
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1'>
              <div className='flex items-center'>
                <div className='p-3 bg-green-50 rounded-lg'>
                  <Award className='w-6 h-6 text-green-600' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm text-gray-600 font-medium'>Completed</p>
                  <p className='text-2xl font-bold text-gray-900'>{completedInterviews.length}</p>
                </div>
              </div>
            </div>
            
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1'>
              <div className='flex items-center'>
                <div className='p-3 bg-yellow-50 rounded-lg'>
                  <Clock className='w-6 h-6 text-yellow-600' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm text-gray-600 font-medium'>In Progress</p>
                  <p className='text-2xl font-bold text-gray-900'>{pendingInterviews.length}</p>
                </div>
              </div>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1'>
              <div className='flex items-center'>
                <div className='p-3 bg-purple-50 rounded-lg'>
                  <Target className='w-6 h-6 text-purple-600' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm text-gray-600 font-medium'>Avg. Score</p>
                  <p className='text-2xl font-bold text-gray-900'>{averageScore}/10</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reminders Section */}
        {reminders && reminders.length > 0 && (
          <div className='mb-8'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-bold text-gray-900'>Reminders & Notifications</h3>
              <div className='flex items-center space-x-2'>
                <AlertCircle className='w-5 h-5 text-orange-600' />
                <span className='text-sm text-gray-600'>{reminders.length} active</span>
              </div>
            </div>
            <div className='grid gap-4'>
              {reminders.slice(0, 3).map((reminder) => (
                <div key={reminder._id} className='bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border-l-4 border-orange-500 hover:shadow-md transition-shadow'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center mb-2'>
                        <Clock className='w-4 h-4 text-orange-600 mr-2' />
                        <span className='text-sm font-medium text-orange-800 uppercase tracking-wide'>
                          {reminder.type.replace('_', ' ')}
                        </span>
                      </div>
                      <p className='text-gray-700 text-sm leading-relaxed'>{reminder.message}</p>
                      <p className='text-xs text-gray-500 mt-1'>
                        Scheduled: {new Date(reminder.scheduledFor).toLocaleString()}
                      </p>
                    </div>
                    <div className='ml-4'>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        reminder.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                        reminder.status === 'sent' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {reminder.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State or Interview Content */}
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          </div>
        ) : interviews.length === 0 ? (
          <EnhancedEmptyState />
        ) : (
          <>
            {/* Interview Feedback Section */}
            {completedInterviews.length > 0 && (
              <div className='mb-8'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-2xl font-bold text-gray-900'>Your Interview Feedback</h3>
                  <div className='flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg'>
                    <Award className='w-5 h-5 text-blue-600' />
                    <span className='text-sm font-medium text-blue-800'>{completedInterviews.length} with feedback</span>
                  </div>
                </div>
                <div className='grid gap-6'>
                  {completedInterviews.slice(0, 3).map((interview) => (
                    <div key={interview._id} className='bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'>
                      <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 gap-4'>
                        <div className='flex-1'>
                          <div className='flex items-center gap-3 mb-2'>
                            <h4 className='text-xl font-bold text-gray-900'>{interview.jobTitle || 'Interview Session'}</h4>
                            {interview.score && (
                              <div className='flex items-center bg-gradient-to-r from-yellow-50 to-amber-50 px-3 py-1 rounded-full border border-yellow-200'>
                                <Star className='w-4 h-4 text-yellow-600 fill-current' />
                                <span className='ml-1 font-bold text-yellow-700'>{interview.score}/10</span>
                              </div>
                            )}
                          </div>
                          <div className='flex flex-wrap gap-4 text-sm text-gray-600'>
                            <div className='flex items-center'>
                              <Calendar className='w-4 h-4 mr-1' />
                              Completed on {formatDate(interview.completedAt)}
                            </div>
                            <div className='flex items-center'>
                              <MessageSquare className='w-4 h-4 mr-1' />
                              {interview.interviewQuestions?.length || 0} questions
                            </div>
                          </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${getStatusColor(interview.status)}`}>
                            {getStatusIcon(interview.status)}
                            Feedback Ready
                          </span>
                        </div>
                      </div>
                      
                      {interview.feedback && (
                        <div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border-l-4 border-blue-500'>
                          <div className='flex items-center mb-4'>
                            <MessageSquare className='w-5 h-5 text-blue-600 mr-2' />
                            <h5 className='font-bold text-gray-900'>Detailed Feedback</h5>
                          </div>
                          <div className='bg-white p-4 rounded-lg shadow-sm'>
                            <p className='text-gray-700 leading-relaxed'>{interview.feedback}</p>
                          </div>
                          <div className='flex items-center justify-between mt-4 pt-4 border-t border-gray-200'>
                            <div className='flex items-center space-x-4'>
                              <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <ThumbsUp className="w-4 h-4" />
                                Helpful
                              </Button>
                              <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <ThumbsDown className="w-4 h-4" />
                                Not Helpful
                              </Button>
                            </div>
                            <Link href={`/interview/${interview._id}`}>
                              <Button size="sm" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
                                <Eye className="w-4 h-4" />
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Interviews */}
            {pendingInterviews.length > 0 && (
              <div className='mb-8'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-2xl font-bold text-gray-900'>Recent Interviews</h3>
                  <div className='flex items-center space-x-2'>
                    <Clock className='w-5 h-5 text-yellow-600' />
                    <span className='text-sm text-gray-600'>{pendingInterviews.length} in progress</span>
                  </div>
                </div>
                <div className='grid gap-4'>
                  {pendingInterviews.map((interview) => (
                    <div key={interview._id} className='bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-blue-200'>
                      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                        <div className='flex-1'>
                          <div className='flex items-center gap-3 mb-2'>
                            <h4 className='font-semibold text-gray-900'>{interview.jobTitle || 'Interview Session'}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(interview.status)}`}>
                              {getStatusIcon(interview.status)}
                              {interview.status === 'completed' ? 'Processing' : 'In Progress'}
                            </span>
                          </div>
                          <div className='flex flex-wrap gap-4 text-sm text-gray-600'>
                            <div className='flex items-center'>
                              <Calendar className='w-4 h-4 mr-1' />
                              Created on {formatDate(interview.createdAt)}
                            </div>
                            {interview.interviewQuestions && (
                              <div className='flex items-center'>
                                <MessageSquare className='w-4 h-4 mr-1' />
                                {interview.interviewQuestions.length} questions
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Link href={`/interview/${interview._id}`}>
                            <Button size="sm" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
                              <Play className="w-4 h-4" />
                              {interview.status === 'completed' ? 'View Progress' : 'Continue'}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View All Interviews CTA */}
            {interviews.length > 3 && (
              <div className='text-center mb-8'>
                <Link href="/interviews">
                  <Button variant="outline" className="px-8 py-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                    View All Interviews
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;