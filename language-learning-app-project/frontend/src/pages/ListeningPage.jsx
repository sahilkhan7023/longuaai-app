import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Award,
  Headphones,
  SkipForward,
  SkipBack,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../contexts/AuthContext';

const ListeningPage = () => {
  const { user, addXP } = useAuth();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); // Simulated duration
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [selectedDifficulty, setSelectedDifficulty] = useState('intermediate');
  const [selectedType, setSelectedType] = useState('conversation');
  const [playCount, setPlayCount] = useState(0);
  
  const exercises = {
    beginner: {
      conversation: [
        {
          id: 1,
          title: "Ordering Coffee",
          description: "Listen to a conversation between a customer and a barista.",
          audioUrl: "/audio/coffee-order.mp3", // Simulated
          transcript: "Customer: Hi, I'd like a large coffee with milk, please. Barista: Sure! Would you like sugar with that? Customer: Yes, two sugars please. Barista: That'll be $3.50.",
          questions: [
            {
              id: 1,
              question: "What size coffee does the customer order?",
              options: ["Small", "Medium", "Large", "Extra Large"],
              correct: 2
            },
            {
              id: 2,
              question: "How many sugars does the customer want?",
              options: ["One", "Two", "Three", "None"],
              correct: 1
            },
            {
              id: 3,
              question: "How much does the coffee cost?",
              options: ["$2.50", "$3.00", "$3.50", "$4.00"],
              correct: 2
            }
          ]
        },
        {
          id: 2,
          title: "Weather Conversation",
          description: "Two friends discussing the weather forecast.",
          audioUrl: "/audio/weather-talk.mp3",
          transcript: "Person A: Did you see the weather forecast for tomorrow? Person B: Yes, it's supposed to rain all day. Person A: That's too bad. I was planning to go to the park. Person B: Maybe we can go to the museum instead?",
          questions: [
            {
              id: 1,
              question: "What's the weather forecast for tomorrow?",
              options: ["Sunny", "Cloudy", "Rainy", "Snowy"],
              correct: 2
            },
            {
              id: 2,
              question: "Where was Person A planning to go?",
              options: ["Museum", "Park", "Beach", "Mall"],
              correct: 1
            }
          ]
        }
      ],
      news: [
        {
          id: 3,
          title: "Local News Update",
          description: "A brief news report about a community event.",
          audioUrl: "/audio/local-news.mp3",
          transcript: "Good morning. The annual Spring Festival will take place this Saturday at Central Park from 10 AM to 6 PM. There will be live music, food vendors, and activities for children. Admission is free for all ages.",
          questions: [
            {
              id: 1,
              question: "When is the Spring Festival?",
              options: ["Friday", "Saturday", "Sunday", "Monday"],
              correct: 1
            },
            {
              id: 2,
              question: "What time does the festival start?",
              options: ["9 AM", "10 AM", "11 AM", "12 PM"],
              correct: 1
            }
          ]
        }
      ]
    },
    intermediate: {
      conversation: [
        {
          id: 4,
          title: "Job Interview",
          description: "Listen to a job interview conversation.",
          audioUrl: "/audio/job-interview.mp3",
          transcript: "Interviewer: Tell me about your previous work experience. Candidate: I worked as a marketing coordinator for three years at ABC Company. I managed social media campaigns and organized promotional events. Interviewer: What was your biggest achievement there? Candidate: I increased our social media engagement by 150% in my first year.",
          questions: [
            {
              id: 1,
              question: "How long did the candidate work at ABC Company?",
              options: ["Two years", "Three years", "Four years", "Five years"],
              correct: 1
            },
            {
              id: 2,
              question: "What was the candidate's role?",
              options: ["Sales Manager", "Marketing Coordinator", "Social Media Manager", "Event Planner"],
              correct: 1
            },
            {
              id: 3,
              question: "By how much did they increase social media engagement?",
              options: ["100%", "125%", "150%", "175%"],
              correct: 2
            }
          ]
        }
      ],
      news: [
        {
          id: 5,
          title: "Technology Report",
          description: "A news segment about new technology trends.",
          audioUrl: "/audio/tech-news.mp3",
          transcript: "In technology news, artificial intelligence continues to revolutionize various industries. Recent studies show that AI implementation in healthcare has improved diagnostic accuracy by 40%. Meanwhile, tech companies are investing heavily in sustainable energy solutions, with solar panel efficiency reaching new heights.",
          questions: [
            {
              id: 1,
              question: "By how much has AI improved diagnostic accuracy in healthcare?",
              options: ["30%", "40%", "50%", "60%"],
              correct: 1
            },
            {
              id: 2,
              question: "What are tech companies investing in?",
              options: ["Space exploration", "Sustainable energy", "Virtual reality", "Robotics"],
              correct: 1
            }
          ]
        }
      ]
    }
  };

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const types = [
    { value: 'conversation', label: 'Conversations' },
    { value: 'news', label: 'News & Reports' },
    { value: 'stories', label: 'Stories' }
  ];

  const speeds = [
    { value: 0.5, label: '0.5x (Slow)' },
    { value: 0.75, label: '0.75x' },
    { value: 1, label: '1x (Normal)' },
    { value: 1.25, label: '1.25x' },
    { value: 1.5, label: '1.5x (Fast)' }
  ];

  const currentExercises = exercises[selectedDifficulty]?.[selectedType] || [];
  const exercise = currentExercises[currentExercise];

  // Simulate audio playback
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackSpeed]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setPlayCount(prev => prev + 1);
    }
  };

  const resetAudio = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const skipForward = () => {
    setCurrentTime(prev => Math.min(prev + 10, duration));
  };

  const skipBackward = () => {
    setCurrentTime(prev => Math.max(prev - 10, 0));
  };

  const handleAnswerChange = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const submitAnswers = () => {
    if (!exercise) return;
    
    let correctCount = 0;
    exercise.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correctCount++;
      }
    });
    
    const percentage = Math.round((correctCount / exercise.questions.length) * 100);
    setScore(percentage);
    setShowResults(true);
    
    // Award XP based on performance
    if (percentage >= 80) {
      addXP(20);
      setCompletedExercises(prev => new Set([...prev, exercise.id]));
    } else if (percentage >= 60) {
      addXP(15);
    } else {
      addXP(10);
    }
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
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setCurrentTime(0);
    setIsPlaying(false);
    setPlayCount(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass-card">
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No exercises available for this difficulty and type combination.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Settings & Progress Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <Select value={selectedDifficulty} onValueChange={(value) => {
                    setSelectedDifficulty(value);
                    setCurrentExercise(0);
                    resetExercise();
                  }}>
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
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <Select value={selectedType} onValueChange={(value) => {
                    setSelectedType(value);
                    setCurrentExercise(0);
                    resetExercise();
                  }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Speed</label>
                  <Select value={playbackSpeed.toString()} onValueChange={(value) => setPlaybackSpeed(parseFloat(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {speeds.map(speed => (
                        <SelectItem key={speed.value} value={speed.value.toString()}>
                          {speed.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Progress</span>
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
                    className="xp-bar"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Exercise</span>
                    <span>{currentExercise + 1}/{currentExercises.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Play Count</span>
                    <span>{playCount}</span>
                  </div>
                  {showResults && (
                    <div className="flex justify-between text-sm">
                      <span>Last Score</span>
                      <span className={score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                        {score}%
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Listen multiple times if needed</p>
                  <p>• Use slower speeds for difficult content</p>
                  <p>• Focus on key words and context</p>
                  <p>• Take notes while listening</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Exercise Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Exercise Header */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Headphones className="w-6 h-6 text-blue-500" />
                    <span>Listening Comprehension</span>
                  </CardTitle>
                  <Badge variant="outline">
                    {exercise.title}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground">{exercise.description}</p>
              </CardContent>
            </Card>

            {/* Audio Player */}
            <Card className="glass-card">
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <Progress 
                    value={(currentTime / duration) * 100} 
                    className="h-2 cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percentage = x / rect.width;
                      setCurrentTime(Math.round(percentage * duration));
                    }}
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    onClick={skipBackward}
                    variant="outline"
                    size="sm"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={resetAudio}
                    variant="outline"
                    size="sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={togglePlayback}
                    size="lg"
                    className="w-16 h-16 rounded-full gradient-primary"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-1" />
                    )}
                  </Button>
                  
                  <Button
                    onClick={skipForward}
                    variant="outline"
                    size="sm"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    {playbackSpeed}x speed
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Comprehension Questions</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {exercise.questions.map((question, questionIndex) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: questionIndex * 0.1 }}
                    className="space-y-3"
                  >
                    <h3 className="font-medium">
                      {questionIndex + 1}. {question.question}
                    </h3>
                    
                    <RadioGroup
                      value={selectedAnswers[question.id]?.toString()}
                      onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                      disabled={showResults}
                    >
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value={optionIndex.toString()} 
                            id={`q${question.id}-${optionIndex}`}
                          />
                          <Label 
                            htmlFor={`q${question.id}-${optionIndex}`}
                            className={`flex-1 cursor-pointer p-2 rounded ${
                              showResults
                                ? optionIndex === question.correct
                                  ? 'bg-green-100 text-green-800'
                                  : selectedAnswers[question.id] === optionIndex && optionIndex !== question.correct
                                  ? 'bg-red-100 text-red-800'
                                  : ''
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {showResults && (
                                <>
                                  {optionIndex === question.correct && (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  )}
                                  {selectedAnswers[question.id] === optionIndex && optionIndex !== question.correct && (
                                    <XCircle className="w-4 h-4 text-red-600" />
                                  )}
                                </>
                              )}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </motion.div>
                ))}

                {/* Submit/Results */}
                <div className="pt-6 border-t">
                  {!showResults ? (
                    <Button
                      onClick={submitAnswers}
                      disabled={Object.keys(selectedAnswers).length !== exercise.questions.length}
                      className="w-full"
                    >
                      Submit Answers
                    </Button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center space-y-4"
                    >
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Results</h3>
                        <div className={`text-4xl font-bold ${
                          score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {score}%
                        </div>
                        <p className="text-muted-foreground">
                          You got {exercise.questions.filter(q => selectedAnswers[q.id] === q.correct).length} out of {exercise.questions.length} questions correct.
                        </p>
                      </div>
                      
                      {score >= 80 && (
                        <Badge className="gradient-secondary text-black">
                          🎉 Excellent Listening Skills!
                        </Badge>
                      )}
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                onClick={previousExercise}
                disabled={currentExercise === 0}
                variant="outline"
              >
                Previous Exercise
              </Button>
              
              <Button
                onClick={resetExercise}
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                onClick={nextExercise}
                disabled={currentExercise === currentExercises.length - 1}
              >
                Next Exercise
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningPage;

