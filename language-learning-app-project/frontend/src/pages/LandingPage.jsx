import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Zap, 
  MessageCircle, 
  Mic, 
  BookOpen, 
  Trophy, 
  Star,
  Play,
  Globe,
  Users,
  Award,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState(0);

  const languages = ['Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese'];
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Chat Tutor',
      description: 'Practice conversations with our intelligent AI tutor that adapts to your level',
      color: 'text-blue-500'
    },
    {
      icon: Mic,
      title: 'Speaking Practice',
      description: 'Improve pronunciation with real-time feedback and speech recognition',
      color: 'text-green-500'
    },
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Engaging lessons with gamification elements to keep you motivated',
      color: 'text-purple-500'
    },
    {
      icon: Trophy,
      title: 'Progress Tracking',
      description: 'Track your progress with detailed analytics and achievement badges',
      color: 'text-yellow-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      content: 'LinguaAI helped me become conversational in Spanish in just 3 months!',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Chen',
      role: 'Software Developer',
      content: 'The AI tutor is incredibly smart and patient. Best language app I\'ve used.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Wilson',
      role: 'Student',
      content: 'Love the gamification! Learning French has never been this fun.',
      rating: 5,
      avatar: '👩‍🎓'
    }
  ];

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Navigation */}
      <nav className="glass-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-white/10">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="gradient-primary text-white hover:opacity-90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 gradient-secondary text-black font-semibold">
                🚀 AI-Powered Language Learning
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Master{' '}
                <motion.span
                  key={currentLanguage}
                  className="gradient-primary bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {languages[currentLanguage]}
                </motion.span>
                <br />
                with AI
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Learn languages faster with our AI-powered tutor. Get personalized lessons, 
                real-time feedback, and track your progress with gamified learning.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="gradient-primary text-white hover:opacity-90 w-full sm:w-auto">
                    Start Learning Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto hover-lift">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-card p-8 rounded-2xl animate-float">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">AI Tutor</p>
                      <p className="text-sm text-muted-foreground">Ready to help you learn</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="glass p-3 rounded-lg">
                      <p className="text-sm">¡Hola! ¿Cómo estás?</p>
                    </div>
                    <div className="glass p-3 rounded-lg ml-8">
                      <p className="text-sm">I'm good, thanks! How do I say "I love learning Spanish"?</p>
                    </div>
                    <div className="glass p-3 rounded-lg">
                      <p className="text-sm">¡Me encanta aprender español! 🎉</p>
                      <p className="text-xs text-muted-foreground mt-1">Great pronunciation! +10 XP</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold">1,250 XP</span>
                    </div>
                    <Badge className="gradient-secondary text-black">Level 5</Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 gradient-primary rounded-full opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-32 h-32 gradient-secondary rounded-full opacity-10 animate-bounce-slow" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose LinguaAI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform combines the best of technology and pedagogy 
              to create an unmatched learning experience.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card hover-lift h-full">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 ${feature.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8 rounded-2xl">
                <Users className="w-12 h-12 gradient-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">50K+</h3>
                <p className="text-muted-foreground">Active Learners</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8 rounded-2xl">
                <Globe className="w-12 h-12 gradient-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">12</h3>
                <p className="text-muted-foreground">Languages Available</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8 rounded-2xl">
                <Award className="w-12 h-12 gradient-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">95%</h3>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Our Learners Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of successful language learners
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card hover-lift h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{testimonial.avatar}</div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Language Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of learners who are already mastering new languages with LinguaAI
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Start Learning Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 border-t border-white/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                LinguaAI
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 LinguaAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

