import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Circle, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight,
  Star,
  Clock,
  Users,
  BookOpen,
  Volume2,
  Mic,
  Trophy
} from 'lucide-react';

const LessonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [lessonData, setLessonData] = useState(null);

  // Mock lesson data - in real app this would come from API
  const lessons = {
    'basic-greetings': {
      id: 'basic-greetings',
      title: 'Basic Greetings & Introductions',
      description: 'Learn essential greetings and how to introduce yourself in various situations.',
      difficulty: 'beginner',
      duration: 15,
      xpReward: 50,
      rating: 4.8,
      totalSteps: 8,
      steps: [
        {
          type: 'introduction',
          title: 'Welcome to Basic Greetings',
          content: 'In this lesson, you\'ll learn the most common ways to greet people and introduce yourself. These phrases are essential for any conversation!',
          audio: '/audio/intro-greetings.mp3'
        },
        {
          type: 'vocabulary',
          title: 'Key Vocabulary',
          content: 'Let\'s start with the basic greeting words:',
          vocabulary: [
            { word: 'Hello', pronunciation: 'heh-LOH', translation: 'Hola', example: 'Hello, how are you?' },
            { word: 'Hi', pronunciation: 'hahy', translation: 'Hola', example: 'Hi there!' },
            { word: 'Good morning', pronunciation: 'good MAWR-ning', translation: 'Buenos días', example: 'Good morning, everyone!' },
            { word: 'Good afternoon', pronunciation: 'good af-ter-NOON', translation: 'Buenas tardes', example: 'Good afternoon, sir.' }
          ]
        },
        {
          type: 'listening',
          title: 'Listening Practice',
          content: 'Listen to these greetings and repeat them:',
          audio: '/audio/greetings-practice.mp3',
          transcript: 'Hello! Good morning! How are you? Nice to meet you!'
        },
        {
          type: 'quiz',
          title: 'Quick Check',
          question: 'How do you say "Good morning" in Spanish?',
          options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hola'],
          correct: 1,
          explanation: 'Buenos días means "Good morning" in Spanish. It\'s used from early morning until around noon.'
        },
        {
          type: 'conversation',
          title: 'Practice Conversation',
          content: 'Practice this simple conversation:',
          dialogue: [
            { speaker: 'A', text: 'Hello! How are you?', translation: '¡Hola! ¿Cómo estás?' },
            { speaker: 'B', text: 'I\'m fine, thank you. And you?', translation: 'Estoy bien, gracias. ¿Y tú?' },
            { speaker: 'A', text: 'I\'m great! Nice to meet you.', translation: '¡Estoy genial! Mucho gusto.' },
            { speaker: 'B', text: 'Nice to meet you too!', translation: '¡Mucho gusto también!' }
          ]
        },
        {
          type: 'speaking',
          title: 'Speaking Practice',
          content: 'Now it\'s your turn! Record yourself saying these greetings:',
          prompts: [
            'Say "Hello, how are you?" in a friendly tone',
            'Introduce yourself: "Hi, my name is..."',
            'Respond to "Nice to meet you"'
          ]
        },
        {
          type: 'exercise',
          title: 'Fill in the Blanks',
          content: 'Complete these conversations:',
          exercises: [
            { 
              text: 'A: Good _____! B: Good morning!', 
              answer: 'morning',
              hint: 'What time of day greeting matches the response?'
            },
            { 
              text: 'A: How are you? B: I\'m _____, thank you.', 
              answer: 'fine',
              hint: 'A common positive response to "How are you?"'
            }
          ]
        },
        {
          type: 'summary',
          title: 'Lesson Complete!',
          content: 'Congratulations! You\'ve learned the basics of greetings and introductions.',
          achievements: ['First Greetings', 'Conversation Starter'],
          nextLesson: 'numbers-counting'
        }
      ]
    }
  };

  useEffect(() => {
    const lesson = lessons[id];
    if (lesson) {
      setLessonData(lesson);
    } else {
      // If lesson not found, redirect to lessons page
      navigate('/lessons');
    }
  }, [id, navigate]);

  const handleStepComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    setShowFeedback(true);
    
    // Auto-advance after showing feedback
    setTimeout(() => {
      setShowFeedback(false);
      if (currentStep < lessonData.totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 2000);
  };

  const handleNextStep = () => {
    if (currentStep < lessonData.totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      setShowFeedback(false);
      setUserAnswer('');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setShowFeedback(false);
      setUserAnswer('');
    }
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // In real app, this would control actual audio playback
  };

  const renderStep = (step) => {
    switch (step.type) {
      case 'introduction':
        return (
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">{step.content}</p>
            <div className="flex items-center gap-4">
              <Button onClick={toggleAudio} variant="outline" className="flex items-center gap-2">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                Listen to Introduction
              </Button>
              <Button onClick={handleStepComplete}>Continue</Button>
            </div>
          </div>
        );

      case 'vocabulary':
        return (
          <div className="space-y-6">
            <p className="text-gray-700">{step.content}</p>
            <div className="grid gap-4">
              {step.vocabulary.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-semibold text-blue-600">{item.word}</span>
                        <Badge variant="secondary">{item.pronunciation}</Badge>
                        <Button size="sm" variant="ghost" onClick={toggleAudio}>
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-gray-600 mb-1">Spanish: <span className="font-medium">{item.translation}</span></p>
                      <p className="text-sm text-gray-500 italic">"{item.example}"</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Button onClick={handleStepComplete} className="w-full">Practice These Words</Button>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{step.question}</h3>
              <div className="grid gap-3">
                {step.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswer === index ? "default" : "outline"}
                    className="justify-start text-left"
                    onClick={() => setUserAnswer(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            
            {showFeedback && (
              <div className={`p-4 rounded-lg ${userAnswer === step.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {userAnswer === step.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="font-semibold">
                    {userAnswer === step.correct ? 'Correct!' : 'Not quite right'}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{step.explanation}</p>
              </div>
            )}
            
            {userAnswer !== '' && !showFeedback && (
              <Button onClick={handleStepComplete} className="w-full">Check Answer</Button>
            )}
          </div>
        );

      case 'conversation':
        return (
          <div className="space-y-6">
            <p className="text-gray-700">{step.content}</p>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              {step.dialogue.map((line, index) => (
                <div key={index} className={`flex ${line.speaker === 'A' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${line.speaker === 'A' ? 'bg-blue-100' : 'bg-green-100'}`}>
                    <p className="font-medium">{line.text}</p>
                    <p className="text-sm text-gray-600 mt-1">{line.translation}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button onClick={toggleAudio} variant="outline" className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Listen to Conversation
              </Button>
              <Button onClick={handleStepComplete}>Practice This</Button>
            </div>
          </div>
        );

      case 'speaking':
        return (
          <div className="space-y-6">
            <p className="text-gray-700">{step.content}</p>
            <div className="space-y-4">
              {step.prompts.map((prompt, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="flex-1">{prompt}</p>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      Record
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <Button onClick={handleStepComplete} className="w-full">Complete Speaking Practice</Button>
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <Trophy className="w-16 h-16 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold text-green-600">Lesson Complete!</h3>
            <p className="text-gray-700">{step.content}</p>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-3">Achievements Unlocked:</h4>
              <div className="flex justify-center gap-4">
                {step.achievements.map((achievement, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    🏆 {achievement}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate('/lessons')} variant="outline">
                Back to Lessons
              </Button>
              <Button onClick={() => navigate(`/lessons/${step.nextLesson}`)}>
                Next Lesson
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <p className="text-gray-700">{step.content}</p>
            <Button onClick={handleStepComplete}>Continue</Button>
          </div>
        );
    }
  };

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p>Loading lesson...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = lessonData.steps[currentStep];
  const progress = ((completedSteps.size) / lessonData.totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              onClick={() => navigate('/lessons')} 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Lessons
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              {lessonData.duration} min
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Trophy className="w-4 h-4" />
              {lessonData.xpReward} XP
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lessonData.title}</h1>
          <p className="text-gray-600 mb-4">{lessonData.description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{completedSteps.size} of {lessonData.totalSteps} steps</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Main Content */}
        <Card className="glass-card mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  Step {currentStep + 1}
                </span>
                {currentStepData.title}
              </CardTitle>
              {completedSteps.has(currentStep) && (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            {renderStep(currentStepData)}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            onClick={handlePrevStep} 
            disabled={currentStep === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {Array.from({ length: lessonData.totalSteps }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep 
                    ? 'bg-blue-600' 
                    : completedSteps.has(index)
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <Button 
            onClick={handleNextStep} 
            disabled={currentStep === lessonData.totalSteps - 1}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailPage;

