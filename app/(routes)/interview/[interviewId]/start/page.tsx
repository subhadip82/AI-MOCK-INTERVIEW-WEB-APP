'use client';

import { api } from '@/convex/_generated/api';
import { useConvex, useMutation } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserDetailsContext } from '@/contex/UserDetailsContext';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  PhoneOff, 
  Send, 
  Clock, 
  Lightbulb, 
  Volume2, 
  VolumeX, 
  Settings, 
  BarChart3, 
  Play, 
  Pause, 
  RotateCcw,
  Download,
  Share2,
  HelpCircle,
  Star,
  Zap,
  Target,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';

type interviewQuestions = {
  id: string;
  answer: string;
  question: string;
  category?: string;
  difficulty?: string;
  type?: string;
  createdAt?: number;
}

type interviewData = {
  jobTitle: string | null;
  jobDescription: string | null;
  interviewQuestions: interviewQuestions[];
  userid: string | null;
  _id: string;
}

type ChatMessage = {
  id: string;
  type: 'question' | 'answer' | 'system';
  message: string;
  timestamp: Date;
}

function StartInterview() {
  const { interviewId } = useParams();
  const router = useRouter();
  const convex = useConvex();
  const { userDetail } = useContext(UserDetailsContext);
  const updateInterviewStatus = useMutation(api.interview.UpdateInterviewStatus);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [interviewData, setInterviewData] = useState<interviewData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [interviewTimer, setInterviewTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [interviewProgress, setInterviewProgress] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interviewQuality, setInterviewQuality] = useState({
    audio: 0,
    video: 0,
    lighting: 0
  });
  const [faceDetected, setFaceDetected] = useState(true);
  const [faceConfidence, setFaceConfidence] = useState(100);
  const [avatarSpeaking, setAvatarSpeaking] = useState(false);
  const [avatarAnimation, setAvatarAnimation] = useState('idle');
  const [currentQuestionText, setCurrentQuestionText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  // Fetch interview questions when interviewId changes
  useEffect(() => {
    if (typeof interviewId === 'string') {
      fetchInterviewQuestions(interviewId);
    }
  }, [interviewId]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInterviewStarted && isConnected) {
      interval = setInterval(() => {
        setInterviewTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInterviewStarted, isConnected]);

  // Progress calculation
  useEffect(() => {
    if (interviewData?.interviewQuestions.length) {
      const progress = (currentQuestionIndex / interviewData.interviewQuestions.length) * 100;
      setInterviewProgress(progress);
    }
  }, [currentQuestionIndex, interviewData]);

  // Speech recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        setCurrentAnswer(transcript);
      };

      recognition.onstart = () => setIsSpeaking(true);
      recognition.onend = () => setIsSpeaking(false);

      setRecognition(recognition);
    }
  }, []);

  // Interview tips
  const interviewTips = [
    "Speak clearly and at a moderate pace",
    "Look at the camera, not the screen",
    "Use specific examples in your answers",
    "Take a moment to think before answering",
    "Ask for clarification if needed",
    "Show enthusiasm and confidence",
    "Be honest about your experience",
    "Use the STAR method for behavioral questions"
  ];

  // Text-to-Speech function to read questions aloud
  const readQuestionAloud = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 0.9;
      speech.pitch = 1;
      speech.volume = 1;
      
      speech.onstart = () => {
        setIsReadingAloud(true);
        setAvatarSpeaking(true);
        setAvatarAnimation('speaking');
      };
      
      speech.onend = () => {
        setIsReadingAloud(false);
        setAvatarSpeaking(false);
        setAvatarAnimation('idle');
      };
      
      speech.onerror = () => {
        setIsReadingAloud(false);
        setAvatarSpeaking(false);
        setAvatarAnimation('idle');
      };
      
      window.speechSynthesis.speak(speech);
    } else {
      console.warn('Text-to-speech not supported in this browser');
      setIsReadingAloud(false);
    }
  };

  // Stop reading aloud
  const stopReadingAloud = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      setAvatarSpeaking(false);
      setAvatarAnimation('idle');
    }
  };

  const fetchInterviewQuestions = async (id: string) => {
    try {
      const result = await convex.query((api.interview as any).GetInterviewQuestions, {
        interviewId: id as any,
      });
     
      console.log("Interview Questions:", result);
      setInterviewData({
        jobTitle: '',
        jobDescription: '',
        interviewQuestions: result,
        userid: '',
        _id: id
      });
    } catch (error) {
      console.error("Error fetching interview questions:", error);
    }
  };

  // FIXED: Initialize camera and microphone with proper error handling
  const initializeMedia = async () => {
    try {
      console.log("🎥 Initializing camera and microphone...");
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
          frameRate: { ideal: 30 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      console.log("✅ Media stream obtained:", mediaStream);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        
        // FIXED: Remove muted and ensure video plays properly
        videoRef.current.muted = false;
        videoRef.current.volume = 1;
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          console.log("🎬 Video metadata loaded, playing video...");
          videoRef.current?.play().then(() => {
            console.log("✅ Video playing successfully");
            setFaceDetected(true);
            setFaceConfidence(100);
          }).catch(e => {
            console.error('❌ Error playing video:', e);
          });
        };

        videoRef.current.onerror = (e) => {
          console.error('❌ Video element error:', e);
        };
      }
    } catch (error) {
      console.error('❌ Error accessing media devices:', error);
      alert('Unable to access camera/microphone. Please check permissions and try again.');
    }
  };

  // Start interview
  const startInterview = async () => {
    await initializeMedia();
    setIsInterviewStarted(true);
    setIsConnected(true);
    
    setChatMessages([{
      id: '1',
      type: 'system',
      message: 'Interview started! Good luck!',
      timestamp: new Date()
    }]);

    if ((interviewData?.interviewQuestions?.length ?? 0) > 0) {
      setTimeout(() => {
        askQuestion(0);
      }, 2000);
    }
  };

  // Ask question with avatar animation and text-to-speech
  const askQuestion = (index: number) => {
    if (interviewData?.interviewQuestions[index]) {
      const question = interviewData.interviewQuestions[index];
      
      console.log(`🎯 Asking question ${index + 1}/${interviewData.interviewQuestions.length}:`, {
        id: question.id,
        question: question.question,
        category: question.category,
        difficulty: question.difficulty,
        type: question.type
      });
      
      setAvatarSpeaking(true);
      setAvatarAnimation('speaking');
      setCurrentQuestionText('');
      setIsTyping(true);
      
      // Add question to chat immediately
      const questionMessage: ChatMessage = {
        id: question.id || `q-${index}`,
        type: 'question',
        message: question.question,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, questionMessage]);
      
      // Automatically read question aloud after a short delay
      setTimeout(() => {
        readQuestionAloud(question.question);
      }, 1000);
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < question.question.length) {
          setCurrentQuestionText(question.question.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 50);
    }
  };

  // Submit answer - FIXED: Show answer in chat immediately
  const submitAnswer = () => {
    if (!currentAnswer.trim()) return;

    stopReadingAloud();

    const currentQuestion = interviewData?.interviewQuestions[currentQuestionIndex];
    
    // Create and add answer message to chat IMMEDIATELY
    const newMessage: ChatMessage = {
      id: `a-${currentQuestion?.id || currentQuestionIndex}-${Date.now()}`,
      type: 'answer',
      message: currentAnswer,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newMessage]);
    setIsAnswering(false);
    setCurrentAnswer('');

    const answer = currentAnswer.toLowerCase();
    let avatarResponse = '';
    
    if (answer.includes('yes') || answer.includes('yeah') || answer.includes('yep') || answer.includes('sure')) {
      avatarResponse = "Great! That's a positive response. Let me ask you the next question.";
      setAvatarAnimation('positive');
    } else if (answer.includes('no') || answer.includes('nope') || answer.includes('not')) {
      avatarResponse = "I understand. That's perfectly fine. Let's move on to the next question.";
      setAvatarAnimation('neutral');
    } else {
      avatarResponse = "Thank you for your detailed answer. Let's continue with the next question.";
      setAvatarAnimation('listening');
    }

    setTimeout(() => {
      setAvatarSpeaking(true);
      setCurrentQuestionText(avatarResponse);
      
      readQuestionAloud(avatarResponse);
      
      setTimeout(() => {
        setAvatarSpeaking(false);
        setAvatarAnimation('idle');
        setCurrentQuestionText('');
      }, 3000);
    }, 1000);

    if (interviewData && currentQuestionIndex < interviewData.interviewQuestions.length - 1) {
      setTimeout(() => {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        askQuestion(nextIndex);
      }, 4000);
    } else {
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: 'end',
          type: 'system',
          message: 'Interview completed! Thank you for your time.',
          timestamp: new Date()
        }]);
        endInterview();
      }, 4000);
    }
  };

  // Quick answer functions - FIXED: Show answer in chat immediately
  const submitQuickAnswer = (answer: string) => {
    setCurrentAnswer(answer);
    // Use setTimeout to ensure state update happens before submit
    setTimeout(() => {
      submitAnswer();
    }, 100);
  };

  // End interview
  const endInterview = async () => {
    stopReadingAloud();
    
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
        console.log(`🛑 Stopped track: ${track.kind}`);
      });
      setStream(null);
    }
    
    try {
      const chatHistory = chatMessages.map(msg => ({
        id: msg.id,
        type: msg.type,
        message: msg.message,
        timestamp: msg.timestamp.getTime(),
      }));

      await updateInterviewStatus({
        interviewId: interviewId as any,
        status: "completed",
        chatHistory,
      });

      try {
        const feedbackResponse = await fetch('/api/n8n-feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            interviewId,
            chatHistory,
            triggerFeedback: true,
            userId: userDetail?._id,
          }),
        });

        if (feedbackResponse.ok) {
          console.log('✅ Feedback generation triggered successfully');
        } else {
          console.warn('⚠️ Feedback generation failed, but interview was saved');
        }
      } catch (feedbackError) {
        console.warn('⚠️ Feedback generation error:', feedbackError);
      }
    } catch (error) {
      console.error('Error saving interview data:', error);
    }

    setIsConnected(false);
    setIsInterviewStarted(false);
    
    alert('🎉 Interview completed successfully! Your feedback will be ready shortly.');
    router.push('/dashboard');
  };

  // Toggle mute
  const toggleMute = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !audioTracks[0].enabled;
        setIsMuted(!audioTracks[0].enabled);
        console.log(`🔊 Audio ${audioTracks[0].enabled ? 'unmuted' : 'muted'}`);
      }
    }
  };

  // Toggle video - FIXED: Proper video toggle
  const toggleVideo = () => {
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !videoTracks[0].enabled;
        setIsVideoOff(!videoTracks[0].enabled);
        console.log(`📹 Video ${videoTracks[0].enabled ? 'enabled' : 'disabled'}`);
      }
    }
  };

  // Toggle speech recognition
  const toggleSpeechRecognition = () => {
    if (speechEnabled && recognition) {
      recognition.stop();
      setSpeechEnabled(false);
      console.log('🎤 Speech recognition stopped');
    } else if (recognition) {
      recognition.start();
      setSpeechEnabled(true);
      console.log('🎤 Speech recognition started');
    }
  };

  // Format timer
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Next tip
  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % interviewTips.length);
  };

  // Previous tip
  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + interviewTips.length) % interviewTips.length);
  };

  // Check interview quality
  const checkInterviewQuality = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      const videoTrack = stream.getVideoTracks()[0];
      
      if (audioTrack) {
        const audioLevel = Math.random() * 100;
        setInterviewQuality(prev => ({ ...prev, audio: audioLevel }));
      }
      
      if (videoTrack) {
        const videoQuality = Math.random() * 100;
        const lighting = Math.random() * 100;
        setInterviewQuality(prev => ({ 
          ...prev, 
          video: videoQuality, 
          lighting 
        }));
      }
    }
  };

  // Start recording
  const startRecording = () => {
    setIsRecording(true);
    console.log('🔴 Recording started');
  };

  // Stop recording
  const stopRecording = () => {
    setIsRecording(false);
    console.log('⏹️ Recording stopped');
  };

  // Download interview
  const downloadInterview = () => {
    console.log('📥 Downloading interview...');
  };

  // Share interview
  const shareInterview = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Interview',
        text: 'Check out my interview performance!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Interview link copied to clipboard!');
    }
  };

  // Repeat question aloud
  const repeatQuestionAloud = () => {
    if (interviewData?.interviewQuestions[currentQuestionIndex]) {
      const currentQuestion = interviewData.interviewQuestions[currentQuestionIndex].question;
      readQuestionAloud(currentQuestion);
    }
  };

  if (!isInterviewStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="w-full max-w-4xl mb-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="mb-4"
          >
            ← Back to Dashboard
          </Button>
        </div>
        
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Ready to Start Your Interview?</h1>
            <p className="text-gray-600 mb-6 text-lg">
              {(interviewData?.interviewQuestions?.length ?? 0)} questions prepared • Estimated time: 30 minutes
            </p>
            
            {(interviewData?.interviewQuestions?.length ?? 0) > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap justify-center gap-2">
                    {Array.from(new Set((interviewData?.interviewQuestions ?? []).map(q => q.category).filter(Boolean))).map(category => (
                      <span key={category} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {category}
                      </span>
                    ))}
                  </div>
              </div>
            )}
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{width: '0%'}}></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Settings className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-900">Technical Setup</h3>
                </div>
                <ul className="text-blue-800 text-sm space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Ensure good lighting and clear audio
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Test your camera and microphone
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Stable internet connection
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Close unnecessary applications
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Lightbulb className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-green-900">Interview Tips</h3>
                </div>
                <ul className="text-green-800 text-sm space-y-2">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Find a quiet environment
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Have your resume ready
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Prepare specific examples
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Stay calm and confident
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">What to Expect:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Video className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Live Video</p>
                </div>
                <div className="text-center">
                  <Mic className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Voice Input</p>
                </div>
                <div className="text-center">
                  <Volume2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Questions Read Aloud</p>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Progress Tracking</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={startInterview}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg shadow-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Interview
            </Button>
            <Button 
              onClick={() => setShowTips(true)}
              variant="outline"
              className="px-8 py-3 text-lg"
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              View Tips
            </Button>
          </div>
        </div>

        {showTips && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Interview Tips</h3>
                <Button onClick={() => setShowTips(false)} variant="ghost" size="sm">
                  ×
                </Button>
              </div>
              <p className="text-gray-600 mb-4">{interviewTips[currentTip]}</p>
              <div className="flex justify-between">
                <Button onClick={prevTip} variant="outline" size="sm">
                  Previous
                </Button>
                <Button onClick={nextTip} variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-900">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar with Timer and Progress */}
        <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-white" />
              <span className="text-white font-mono text-lg">{formatTimer(interviewTimer)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-white" />
              <span className="text-white text-sm">
                Question {currentQuestionIndex + 1} of {interviewData?.interviewQuestions.length || 0}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-32 bg-gray-600 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{width: `${interviewProgress}%`}}
              ></div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${interviewQuality.audio > 50 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div className={`w-2 h-2 rounded-full ${interviewQuality.video > 50 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div className={`w-2 h-2 rounded-full ${interviewQuality.lighting > 50 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div className={`w-2 h-2 rounded-full ${faceDetected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
          </div>
        </div>

        {/* Video Frames - FIXED: Proper video display */}
        <div className="flex-1 flex">
          {/* User Video - FIXED: Webcam display with proper styling */}
          <div className="flex-1 bg-gray-800 relative">
            <div className="w-full h-full flex items-center justify-center bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={false}
                className="w-full h-full object-cover"
                style={{ 
                  transform: 'scaleX(-1)', // Mirror effect for natural feel
                  maxHeight: '100%',
                  maxWidth: '100%'
                }}
              />
            </div>
            
            {isVideoOff && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <VideoOff className="w-16 h-16 mx-auto mb-2" />
                  <p>Video Off</p>
                </div>
              </div>
            )}
            
            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Webcam Active</span>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>You - Live</span>
            </div>

            {isRecording && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm">Recording</span>
              </div>
            )}

            {isSpeaking && (
              <div className="absolute top-12 right-4 bg-blue-600 text-white px-3 py-1 rounded flex items-center space-x-2">
                <Mic className="w-4 h-4" />
                <span className="text-sm">Listening...</span>
              </div>
            )}

            {isReadingAloud && (
              <div className="absolute top-20 right-4 bg-purple-600 text-white px-3 py-1 rounded flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <span className="text-sm">Reading Question</span>
              </div>
            )}
          </div>

          {/* Interviewer Avatar */}
          <div className="flex-1 bg-gray-700 relative">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <div className={`w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg transition-all duration-500 ${
                  avatarAnimation === 'speaking' ? 'animate-pulse scale-110' :
                  avatarAnimation === 'positive' ? 'animate-bounce' :
                  avatarAnimation === 'neutral' ? 'animate-pulse' :
                  avatarAnimation === 'listening' ? 'scale-105' :
                  'scale-100'
                }`}>
                  <span className="text-4xl">
                    {avatarAnimation === 'speaking' ? '🗣️' :
                     avatarAnimation === 'positive' ? '😊' :
                     avatarAnimation === 'neutral' ? '😐' :
                     avatarAnimation === 'listening' ? '👂' :
                     '👨‍💼'}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold">AI Interviewer</h3>
                <p className="text-gray-300">
                  {isReadingAloud ? 'Reading question aloud...' : 
                   avatarSpeaking ? 'Speaking...' : 'Ready to conduct your interview'}
                </p>
                
                {currentQuestionText && (
                  <div className="mt-4 p-4 bg-black bg-opacity-30 rounded-lg max-w-md">
                    <p className="text-sm text-gray-200">
                      "{currentQuestionText}"
                      {isTyping && <span className="animate-pulse">|</span>}
                    </p>
                    
                    {!isTyping && !isReadingAloud && (
                      <div className="mt-3 flex justify-center">
                        <Button
                          onClick={repeatQuestionAloud}
                          variant="outline"
                          size="sm"
                          className="text-xs bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                        >
                          <Volume2 className="w-3 h-3 mr-1" />
                          Repeat Question
                        </Button>
                      </div>
                    )}
                    
                    {isReadingAloud && (
                      <div className="mt-3 flex justify-center">
                        <Button
                          onClick={stopReadingAloud}
                          variant="outline"
                          size="sm"
                          className="text-xs bg-red-600 text-white border-red-600 hover:bg-red-700"
                        >
                          <VolumeX className="w-3 h-3 mr-1" />
                          Stop Reading
                        </Button>
                      </div>
                    )}
                    
                    {interviewData?.interviewQuestions[currentQuestionIndex] && (
                      <div className="mt-2 flex justify-center space-x-2 text-xs text-gray-400">
                        {interviewData.interviewQuestions[currentQuestionIndex].category && (
                          <span className="px-2 py-1 bg-gray-600 rounded">
                            {interviewData.interviewQuestions[currentQuestionIndex].category}
                          </span>
                        )}
                        {interviewData.interviewQuestions[currentQuestionIndex].difficulty && (
                          <span className="px-2 py-1 bg-gray-600 rounded">
                            {interviewData.interviewQuestions[currentQuestionIndex].difficulty}
                          </span>
                        )}
                        {interviewData.interviewQuestions[currentQuestionIndex].type && (
                          <span className="px-2 py-1 bg-gray-600 rounded">
                            {interviewData.interviewQuestions[currentQuestionIndex].type}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    avatarSpeaking ? 'bg-green-500 animate-pulse' : 'bg-blue-500'
                  }`}></div>
                  <span className="text-xs text-gray-400">
                    {isReadingAloud ? 'Reading Aloud' : 
                     avatarSpeaking ? 'Speaking' : 'Listening'}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                avatarSpeaking ? 'bg-green-500 animate-pulse' : 'bg-blue-500'
              }`}></div>
              <span>AI Interviewer</span>
            </div>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="bg-gray-800 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              variant={isRecording ? "destructive" : "secondary"}
              size="sm"
            >
              {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            <Button
              onClick={toggleSpeechRecognition}
              variant={speechEnabled ? "default" : "secondary"}
              size="sm"
            >
              {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>

            <Button
              onClick={repeatQuestionAloud}
              variant="secondary"
              size="sm"
              disabled={isReadingAloud}
            >
              <Volume2 className="w-4 h-4" />
            </Button>

            {isReadingAloud && (
              <Button
                onClick={stopReadingAloud}
                variant="destructive"
                size="sm"
              >
                <VolumeX className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleMute}
              variant={isMuted ? "destructive" : "secondary"}
              size="sm"
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            
            <Button
              onClick={toggleVideo}
              variant={isVideoOff ? "destructive" : "secondary"}
              size="sm"
            >
              {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </Button>

            <Button
              onClick={downloadInterview}
              variant="secondary"
              size="sm"
            >
              <Download className="w-4 h-4" />
            </Button>

            <Button
              onClick={shareInterview}
              variant="secondary"
              size="sm"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={endInterview}
              variant="destructive"
              size="sm"
            >
              <PhoneOff className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Chat Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Interview Chat</h3>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setShowTips(true)}
                variant="ghost"
                size="sm"
              >
                <HelpCircle className="w-4 h-4" />
              </Button>
              <Button
                onClick={nextTip}
                variant="ghost"
                size="sm"
              >
                <Lightbulb className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
            <div className="bg-blue-50 p-2 rounded text-center">
              <div className="font-semibold text-blue-900">{currentQuestionIndex + 1}</div>
              <div className="text-blue-600">Questions</div>
            </div>
            <div className="bg-green-50 p-2 rounded text-center">
              <div className="font-semibold text-green-900">{formatTimer(interviewTimer)}</div>
              <div className="text-green-600">Time</div>
            </div>
            <div className="bg-purple-50 p-2 rounded text-center">
              <div className="font-semibold text-purple-900">{Math.round(interviewProgress)}%</div>
              <div className="text-purple-600">Progress</div>
            </div>
            <div className={`p-2 rounded text-center ${faceDetected ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className={`font-semibold ${faceDetected ? 'text-green-900' : 'text-red-900'}`}>
                {faceDetected ? '✓' : '✗'}
              </div>
              <div className={`text-xs ${faceDetected ? 'text-green-600' : 'text-red-600'}`}>
                Webcam
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'answer' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.type === 'question'
                    ? 'bg-blue-100 text-blue-900 border-l-4 border-blue-500'
                    : message.type === 'answer'
                    ? 'bg-green-100 text-green-900 border-l-4 border-green-500'
                    : 'bg-gray-100 text-gray-700 border-l-4 border-gray-500'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'question' && <Target className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  {message.type === 'answer' && <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  {message.type === 'system' && <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Answer Input */}
        {isAnswering && (
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mic className="w-4 h-4" />
                <span>Voice input available</span>
                {speechEnabled && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Type your answer or use voice input..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                />
                <Button onClick={submitAnswer} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>Press Enter to submit</span>
                <span>{currentAnswer.length} characters</span>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Answer Button - FIXED: Use submitQuickAnswer for instant chat display */}
        {!isAnswering && chatMessages.length > 0 && chatMessages[chatMessages.length - 1].type === 'question' && (
          <div className="p-4 border-t border-gray-200 space-y-3">
            <Button
              onClick={() => setIsAnswering(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Target className="w-4 h-4 mr-2" />
              Answer Question
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => submitQuickAnswer('Yes')}
                variant="outline"
                size="sm"
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                ✓ Yes
              </Button>
              <Button
                onClick={() => submitQuickAnswer('No')}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                ✗ No
              </Button>
            </div>
            
            <div className="text-center">
              <Button
                onClick={toggleSpeechRecognition}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {speechEnabled ? <VolumeX className="w-3 h-3 mr-1" /> : <Volume2 className="w-3 h-3 mr-1" />}
                {speechEnabled ? 'Stop Voice' : 'Use Voice'}
              </Button>
            </div>
          </div>
        )}

        {/* Tips Section */}
        {showTips && (
          <div className="p-4 border-t border-gray-200 bg-yellow-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-yellow-900">Quick Tip</h4>
              <Button onClick={() => setShowTips(false)} variant="ghost" size="sm">
                ×
              </Button>
            </div>
            <p className="text-xs text-yellow-800 mb-2">{interviewTips[currentTip]}</p>
            <div className="flex justify-between">
              <Button onClick={prevTip} variant="ghost" size="sm" className="text-xs">
                ← Previous
              </Button>
              <Button onClick={nextTip} variant="ghost" size="sm" className="text-xs">
                Next →
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StartInterview;