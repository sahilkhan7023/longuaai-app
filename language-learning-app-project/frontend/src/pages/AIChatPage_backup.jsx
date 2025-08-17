import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  User, 
  Loader2,
  RotateCcw,
  Settings,
  Languages,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../contexts/AuthContext';

const AIChatPage = () => {
  const { user, addXP } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI language tutor. I'm here to help you practice conversation, check your grammar, and improve your language skills. What would you like to practice today?",
      timestamp: new Date(),
      corrections: []
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [conversationMode, setConversationMode] = useState('casual');
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'portuguese', label: 'Portuguese' }
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const conversationModes = [
    { value: 'casual', label: 'Casual Chat' },
    { value: 'business', label: 'Business' },
    { value: 'travel', label: 'Travel' },
    { value: 'academic', label: 'Academic' },
    { value: 'grammar', label: 'Grammar Focus' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateAIResponse = async (userMessage) => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = {
      casual: [
        "That's interesting! Can you tell me more about that?",
        "I see what you mean. How do you feel about that situation?",
        "Great point! Have you experienced something similar before?",
        "That sounds exciting! What happened next?"
      ],
      business: [
        "That's a professional approach. How would you present this in a meeting?",
        "Excellent business insight. What are the key challenges you see?",
        "From a business perspective, what would be your next steps?",
        "That's a strategic way to think about it. How would you implement this?"
      ],
      travel: [
        "That sounds like an amazing destination! What would you like to see there?",
        "Travel experiences are so enriching. How do you usually plan your trips?",
        "That's a great travel tip! Have you been to similar places?",
        "Exploring new cultures is wonderful. What interests you most about this place?"
      ],
      grammar: [
        "Good sentence structure! Try using 'have been' instead of 'was' for ongoing actions.",
        "Nice try! Remember that 'since' is used with specific time points, while 'for' is used with durations.",
        "Great vocabulary! You could also say 'fascinating' instead of 'interesting' for more impact.",
        "Well done! Consider using the present perfect tense here: 'I have lived' instead of 'I live'."
      ]
    };

    const modeResponses = responses[conversationMode] || responses.casual;
    const response = modeResponses[Math.floor(Math.random() * modeResponses.length)];
    
    // Simulate grammar corrections for some messages
    const corrections = Math.random() > 0.7 ? [
      {
        original: "I was going",
        corrected: "I have been going",
        explanation: "Use present perfect for ongoing actions"
      }
    ] : [];

    return {
      content: response,
      corrections
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      corrections: []
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await simulateAIResponse(inputMessage);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse.content,
        timestamp: new Date(),
        corrections: aiResponse.corrections
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Award XP for conversation
      addXP(5);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I'm sorry, I'm having trouble responding right now. Please try again.",
        timestamp: new Date(),
        corrections: []
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, this would integrate with speech recognition
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputMessage("This is a simulated voice input message.");
      }, 3000);
    }
  };

  const speakMessage = (text) => {
    setIsSpeaking(true);
    // In a real app, this would use text-to-speech
    setTimeout(() => {
      setIsSpeaking(false);
    }, 2000);
  };

  const clearConversation = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Hello! I'm your AI language tutor. I'm here to help you practice conversation, check your grammar, and improve your language skills. What would you like to practice today?",
        timestamp: new Date(),
        corrections: []
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Settings Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Chat Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
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
                  <label className="text-sm font-medium mb-2 block">Mode</label>
                  <Select value={conversationMode} onValueChange={setConversationMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {conversationModes.map(mode => (
                        <SelectItem key={mode.value} value={mode.value}>
                          {mode.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  onClick={clearConversation}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Session Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Messages</span>
                    <span className="font-medium">{messages.length - 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">XP Earned</span>
                    <span className="font-medium">{(messages.length - 1) * 5}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Corrections</span>
                    <span className="font-medium">
                      {messages.reduce((acc, msg) => acc + msg.corrections.length, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="glass-card h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-6 h-6 text-blue-500" />
                  <span>AI Language Tutor</span>
                  <Badge variant="secondary" className="ml-auto">
                    {conversationMode.charAt(0).toUpperCase() + conversationMode.slice(1)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4 px-6">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'gradient-primary' 
                              : 'bg-gray-100'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="w-4 h-4 text-white" />
                            ) : (
                              <Bot className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                          
                          <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                            <div className={`inline-block p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'gradient-primary text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                            
                            {message.corrections.length > 0 && (
                              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-xs font-medium text-yellow-800 mb-1">Grammar Suggestion:</p>
                                {message.corrections.map((correction, index) => (
                                  <div key={index} className="text-xs text-yellow-700">
                                    <span className="line-through">{correction.original}</span>
                                    {' → '}
                                    <span className="font-medium">{correction.corrected}</span>
                                    <p className="text-yellow-600 mt-1">{correction.explanation}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className={`flex items-center mt-1 space-x-2 ${message.type === 'user' ? 'justify-end' : ''}`}>
                              <span className="text-xs text-muted-foreground">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              {message.type === 'bot' && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => speakMessage(message.content)}
                                  className="h-6 w-6 p-0"
                                >
                                  {isSpeaking ? (
                                    <VolumeX className="w-3 h-3" />
                                  ) : (
                                    <Volume2 className="w-3 h-3" />
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm text-gray-600">AI is typing...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </CardContent>
              
              {/* Input Area */}
              <div className="p-6 border-t">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <Textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message here..."
                      className="min-h-[60px] resize-none"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={toggleListening}
                      variant={isListening ? "default" : "outline"}
                      size="sm"
                      className={isListening ? "animate-pulse" : ""}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      size="sm"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>Press Enter to send, Shift+Enter for new line</span>
                  <span>{inputMessage.length}/500</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;

