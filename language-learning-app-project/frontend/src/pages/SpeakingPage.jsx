import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Star,
  CheckCircle,
  XCircle,
  Award,
  Target,
  TrendingUp,
  Clock,
  Zap,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../contexts/AuthContext';

const SpeakingPage = () => {
  const { user, addXP } = useAuth();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [pronunciationScore, setPronunciationScore] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [selectedDifficulty, setSelectedDifficulty] = useState('intermediate');
  const [selectedCategory, setSelectedCategory] = useState('daily');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingInterval = useRef(null);
  
  const exercises = {
    beginner: {
      daily: [
        {
          id: 1,
          text: "Hello, how are you today?",
          phonetic: "/həˈloʊ, haʊ ɑr ju təˈdeɪ/",
          tips: "Focus on the 'h' sound in 'hello' and the rising intonation at the end.",
          category: "Greetings"
        },
        {
          id: 2,
          text: "Thank you very much.",
          phonetic: "/θæŋk ju ˈvɛri mʌtʃ/",
          tips: "Practice the 'th' sound in 'thank' and stress 'very'.",
          category: "Politeness"
        },
        {
          id: 3,
          text: "What time is it?",
          phonetic: "/wʌt taɪm ɪz ɪt/",
          tips: "Clear pronunciation of 'what' and rising intonation for questions.",
          category: "Time"
        }
      ],
      business: [
        {
          id: 4,
          text: "Good morning, everyone.",
          phonetic: "/gʊd ˈmɔrnɪŋ, ˈɛvriˌwʌn/",
          tips: "Professional tone with clear articulation.",
          category: "Meetings"
        }
      ]
    },
    intermediate: {
      daily: [
        {
          id: 5,
          text: "I would like to make a reservation for dinner.",
          phonetic: "/aɪ wʊd laɪk tu meɪk ə ˌrɛzərˈveɪʃən fɔr ˈdɪnər/",
          tips: "Practice the 'would like' contraction and clear enunciation.",
          category: "Restaurant"
        },
        {
          id: 6,
          text: "Could you please help me with this problem?",
          phonetic: "/kʊd ju pliz hɛlp mi wɪð ðɪs ˈprɑbləm/",
          tips: "Polite request with proper stress on 'please' and 'help'.",
          category: "Requests"
        },
        {
          id: 7,
          text: "The weather is beautiful today, isn't it?",
          phonetic: "/ðə ˈwɛðər ɪz ˈbjutəfəl təˈdeɪ, ˈɪzənt ɪt/",
          tips: "Tag question with falling then rising intonation.",
          category: "Small Talk"
        }
      ],
      business: [
        {
          id: 8,
          text: "Let's schedule a meeting for next week.",
          phonetic: "/lɛts ˈskɛdʒul ə ˈmitɪŋ fɔr nɛkst wik/",
          tips: "Emphasize 'schedule' and 'meeting' clearly.",
          category: "Meetings"
        }
      ]
    },
    advanced: {
      daily: [
        {
          id: 9,
          text: "The weather forecast predicts thunderstorms throughout the weekend.",
          phonetic: "/ðə ˈwɛðər ˈfɔrˌkæst prɪˈdɪkts ˈθʌndərˌstɔrmz θruˈaʊt ðə ˈwikˌɛnd/",
          tips: "Focus on consonant clusters and stress patterns.",
          category: "Weather"
        },
        {
          id: 10,
          text: "I'm particularly interested in sustainable development initiatives.",
          phonetic: "/aɪm pərˈtɪkjələrli ˈɪntrəstəd ɪn səˈsteɪnəbəl dɪˈvɛləpmənt ɪˈnɪʃətɪvz/",
          tips: "Complex vocabulary with proper syllable stress.",
          category: "Academic"
        }
      ],
      business: [
        {
          id: 11,
          text: "We need to optimize our quarterly performance metrics.",
          phonetic: "/wi nid tu ˈɑptəˌmaɪz aʊər ˈkwɔrtərli pərˈfɔrməns ˈmɛtrɪks/",
          tips: "Business terminology with professional delivery.",
          category: "Strategy"
        }
      ]
    }
  };

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const categories = [
    { value: 'daily', label: 'Daily Conversation' },
    { value: 'business', label: 'Business English' }
  ];

  const currentExercises = exercises[selectedDifficulty]?.[selectedCategory] || [];
  const exercise = currentExercises[currentExercise];

  useEffect(() => {
    // Initialize media recorder
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);
          
          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              setAudioChunks(prev => [...prev, event.data]);
            }
          };
          
          recorder.onstop = () => {
            // Process recorded audio
            setTimeout(() => {
              const score = simulatePronunciationAnalysis();
              setPronunciationScore(score);
              setAttempts(prev => prev + 1);
              
              // Award XP based on score
              if (score >= 80) {
                addXP(15);
              } else if (score >= 70) {
                addXP(10);
              } else {
                addXP(5);
              }
              
              // Mark as completed if score is good
              if (score >= 75) {
                setCompletedExercises(prev => new Set([...prev, exercise.id]));
              }
            }, 1500);
          };
        })
        .catch(err => {
          console.error('Error accessing microphone:', err);
        });
    }
  }, []);

  useEffect(() => {
    if (isRecording && recordingInterval.current === null) {
      recordingInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (!isRecording && recordingInterval.current) {
      clearInterval(recordingInterval.current);
      recordingInterval.current = null;
      setRecordingTime(0);
    }

    return () => {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    };
  }, [isRecording]);

  const simulatePronunciationAnalysis = () => {
    // Simulate pronunciation scoring with some randomness
    const baseScore = 60 + Math.random() * 35; // 60-95 range
    const score = Math.min(95, Math.max(60, baseScore + (attempts > 2 ? -5 : 0)));
    return Math.round(score);
  };

  const startRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
      setAudioChunks([]);
      setIsRecording(true);
      setRecordedAudio(null);
      setPronunciationScore(null);
      mediaRecorder.start();
    } else {
      // Fallback for browsers without MediaRecorder
      setIsRecording(true);
      setRecordedAudio(null);
      setPronunciationScore(null);
      
      setTimeout(() => {
        setIsRecording(false);
        setRecordedAudio("simulated_audio_data");
        
        setTimeout(() => {
          const score = simulatePronunciationAnalysis();
          setPronunciationScore(score);
          setAttempts(prev => prev + 1);
          
          if (score >= 80) {
            addXP(15);
          } else if (score >= 70) {
            addXP(10);
          } else {
            addXP(5);
          }
          
          if (score >= 75) {
            setCompletedExercises(prev => new Set([...prev, exercise.id]));
          }
        }, 1500);
      }, 3000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
    setIsRecording(false);
    setRecordedAudio("recorded_audio_data");
  };

  const playExample = () => {
    setIsPlaying(true);
    // In a real app, this would play actual audio
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  const nextExercise = () => {
    if (currentExercise < currentExercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      resetExercise();
    }
  };

  const previousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1);
      resetExercise();
    }
  };

  const resetExercise = () => {
    setRecordedAudio(null);
    setPronunciationScore(null);
    setAttempts(0);
    setRecordingTime(0);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 70) return <Star className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p>No exercises available for the selected difficulty and category.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Difficulty
                  </label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map(diff => (
                        <SelectItem key={diff.value} value={diff.value}>
                          {diff.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Category
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card className="glass-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Completed</span>
                    <span>{completedExercises.size}/{currentExercises.length}</span>
                  </div>
                  <Progress 
                    value={(completedExercises.size / currentExercises.length) * 100} 
                    className="h-2" 
                  />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Current Exercise</span>
                    <span>{currentExercise + 1}/{currentExercises.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attempts</span>
                    <span>{attempts}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {completedExercises.size >= 1 && (
                    <Badge variant="secondary" className="w-full justify-center">
                      🎯 First Recording
                    </Badge>
                  )}
                  {completedExercises.size >= 3 && (
                    <Badge variant="secondary" className="w-full justify-center">
                      🔥 Speaking Streak
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="w-6 h-6" />
                    Pronunciation Practice
                  </CardTitle>
                  <Badge variant="outline">{exercise.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Exercise Text */}
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {exercise.text}
                  </h2>
                  <p className="text-gray-600 font-mono">
                    {exercise.phonetic}
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> {exercise.tips}
                    </p>
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="flex justify-center">
                  <Button
                    onClick={playExample}
                    disabled={isPlaying}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Playing...
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        Listen to Example
                      </>
                    )}
                  </Button>
                </div>

                {/* Recording Section */}
                <div className="text-center space-y-4">
                  <motion.div
                    className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isRecording ? stopRecording : startRecording}
                  >
                    {isRecording ? (
                      <MicOff className="w-12 h-12 text-white" />
                    ) : (
                      <Mic className="w-12 h-12 text-white" />
                    )}
                  </motion.div>
                  
                  <p className="text-gray-600">
                    {isRecording 
                      ? `Recording... ${recordingTime}s` 
                      : 'Tap to start recording'
                    }
                  </p>
                </div>

                {/* Pronunciation Feedback */}
                <AnimatePresence>
                  {pronunciationScore !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white p-6 rounded-lg border shadow-sm"
                    >
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-2">
                          {getScoreIcon(pronunciationScore)}
                          <span className={`text-2xl font-bold ${getScoreColor(pronunciationScore)}`}>
                            {pronunciationScore}%
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          {pronunciationScore >= 80 && (
                            <p className="text-green-600 font-medium">
                              Excellent pronunciation! +15 XP
                            </p>
                          )}
                          {pronunciationScore >= 70 && pronunciationScore < 80 && (
                            <p className="text-yellow-600 font-medium">
                              Good job! Keep practicing. +10 XP
                            </p>
                          )}
                          {pronunciationScore < 70 && (
                            <p className="text-red-600 font-medium">
                              Keep practicing! Try again. +5 XP
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-4">
                  <Button
                    onClick={previousExercise}
                    disabled={currentExercise === 0}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  
                  <Button
                    onClick={resetExercise}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                  
                  <Button
                    onClick={nextExercise}
                    disabled={currentExercise === currentExercises.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingPage;

