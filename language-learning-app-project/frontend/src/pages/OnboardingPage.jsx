import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Globe, 
  Target, 
  Clock, 
  CheckCircle,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const languages = [
    { code: 'es', name: 'Spanish', flag: '🇪🇸', learners: '50M+' },
    { code: 'fr', name: 'French', flag: '🇫🇷', learners: '30M+' },
    { code: 'de', name: 'German', flag: '🇩🇪', learners: '20M+' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', learners: '15M+' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', learners: '12M+' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', learners: '25M+' },
  ];

  const levels = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'I\'m just starting out',
      icon: '🌱',
      details: 'Perfect for complete beginners'
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: 'I know some basics',
      icon: '🌿',
      details: 'You can form simple sentences'
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'I\'m quite comfortable',
      icon: '🌳',
      details: 'You can have conversations'
    }
  ];

  const goals = [
    {
      id: 'travel',
      title: 'Travel',
      description: 'I want to travel and communicate',
      icon: '✈️'
    },
    {
      id: 'business',
      title: 'Business',
      description: 'For work and career advancement',
      icon: '💼'
    },
    {
      id: 'culture',
      title: 'Culture',
      description: 'To connect with my heritage',
      icon: '🎭'
    },
    {
      id: 'education',
      title: 'Education',
      description: 'For school or academic purposes',
      icon: '🎓'
    },
    {
      id: 'hobby',
      title: 'Personal Interest',
      description: 'Just for fun and personal growth',
      icon: '🎨'
    }
  ];

  const timeCommitments = [
    {
      id: '5',
      title: '5 minutes',
      description: 'Quick daily practice',
      icon: '⚡'
    },
    {
      id: '15',
      title: '15 minutes',
      description: 'Casual learning',
      icon: '☕'
    },
    {
      id: '30',
      title: '30 minutes',
      description: 'Serious learning',
      icon: '🎯'
    },
    {
      id: '60',
      title: '1 hour',
      description: 'Intensive study',
      icon: '🔥'
    }
  ];

  const steps = [
    {
      title: 'Choose Your Language',
      subtitle: 'Which language would you like to learn?',
      component: 'language'
    },
    {
      title: 'What\'s Your Level?',
      subtitle: 'Help us personalize your experience',
      component: 'level'
    },
    {
      title: 'What\'s Your Goal?',
      subtitle: 'Why do you want to learn this language?',
      component: 'goal'
    },
    {
      title: 'Daily Commitment',
      subtitle: 'How much time can you dedicate daily?',
      component: 'time'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Store onboarding data
    const onboardingData = {
      language: selectedLanguage,
      level: selectedLevel,
      goal: selectedGoal,
      timeCommitment: selectedTime,
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
    navigate('/signup', { state: { onboardingData } });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedLanguage !== '';
      case 1: return selectedLevel !== '';
      case 2: return selectedGoal !== '';
      case 3: return selectedTime !== '';
      default: return false;
    }
  };

  const renderLanguageSelection = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {languages.map((language) => (
        <motion.div
          key={language.code}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card
            className={`cursor-pointer transition-all duration-200 hover-lift ${
              selectedLanguage === language.code
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:bg-white/50'
            }`}
            onClick={() => setSelectedLanguage(language.code)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">{language.flag}</div>
              <h3 className="font-semibold text-lg mb-1">{language.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{language.learners} learners</p>
              {selectedLanguage === language.code && (
                <CheckCircle className="w-5 h-5 text-primary mx-auto" />
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderLevelSelection = () => (
    <div className="space-y-4 max-w-2xl mx-auto">
      {levels.map((level) => (
        <motion.div
          key={level.id}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Card
            className={`cursor-pointer transition-all duration-200 hover-lift ${
              selectedLevel === level.id
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:bg-white/50'
            }`}
            onClick={() => setSelectedLevel(level.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{level.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{level.title}</h3>
                  <p className="text-muted-foreground">{level.description}</p>
                  <p className="text-sm text-muted-foreground mt-1">{level.details}</p>
                </div>
                {selectedLevel === level.id && (
                  <CheckCircle className="w-5 h-5 text-primary" />
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderGoalSelection = () => (
    <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
      {goals.map((goal) => (
        <motion.div
          key={goal.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card
            className={`cursor-pointer transition-all duration-200 hover-lift ${
              selectedGoal === goal.id
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:bg-white/50'
            }`}
            onClick={() => setSelectedGoal(goal.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">{goal.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{goal.title}</h3>
              <p className="text-sm text-muted-foreground">{goal.description}</p>
              {selectedGoal === goal.id && (
                <CheckCircle className="w-5 h-5 text-primary mx-auto mt-3" />
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderTimeSelection = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {timeCommitments.map((time) => (
        <motion.div
          key={time.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card
            className={`cursor-pointer transition-all duration-200 hover-lift ${
              selectedTime === time.id
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:bg-white/50'
            }`}
            onClick={() => setSelectedTime(time.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">{time.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{time.title}</h3>
              <p className="text-sm text-muted-foreground">{time.description}</p>
              {selectedTime === time.id && (
                <CheckCircle className="w-5 h-5 text-primary mx-auto mt-3" />
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderLanguageSelection();
      case 1: return renderLevelSelection();
      case 2: return renderGoalSelection();
      case 3: return renderTimeSelection();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header */}
      <div className="glass-nav border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                LinguaAI
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
              <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full gradient-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {steps[currentStep].title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {steps[currentStep].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="hover-lift"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gradient-primary text-white hover:opacity-90 hover-lift"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;

