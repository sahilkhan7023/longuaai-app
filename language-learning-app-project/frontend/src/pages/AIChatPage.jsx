import React, { useState, useEffect, useRef } from 'react';
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
  const [selectedLanguage, setSelectedLanguage] = useState('spanish');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [conversationMode, setConversationMode] = useState('casual');
  const [sessionStats, setSessionStats] = useState({
    messages: 0,
    xpEarned: 0,
    corrections: 0
  });
  
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

  const callAIAPI = async (userMessage) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: userMessage,
          language: selectedLanguage,
          context: conversationMode === 'grammar' ? 'grammar' : 'conversation',
          difficulty: difficulty
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get AI response');
      }

      return {
        content: data.response?.content || data.response || 'I apologize, but I\'m having trouble responding right now. Please try again.',
        xpEarned: data.response?.xpEarned || 0
      };
    } catch (error) {
      console.error('AI API error:', error);
      
      // Fallback educational responses
      const fallbackResponses = {
        spanish: {
          beginner: "¡Hola! I'm here to help you learn Spanish. Let's start with basic greetings: 'Hola' means hello, '¿Cómo estás?' means how are you. Try using these phrases!",
          intermediate: "¡Perfecto! Let's practice some intermediate Spanish. Can you tell me about your day using past tense verbs? For example: 'Ayer fui al parque' (Yesterday I went to the park).",
          advanced: "Excelente. Let's discuss more complex topics. What's your opinion on current events? Try using subjunctive mood: 'Espero que tengas un buen día' (I hope you have a good day)."
        },
        french: {
          beginner: "Bonjour! Let's learn French basics. 'Bonjour' means hello, 'Comment allez-vous?' means how are you. Practice these greetings!",
          intermediate: "Très bien! Let's practice intermediate French. Can you describe your hobbies? 'J'aime jouer au football' (I like to play soccer).",
          advanced: "Parfait! Let's discuss literature or philosophy in French. What books do you enjoy reading?"
        },
        english: {
          beginner: "Hello! Let's practice English basics. Start with simple sentences like 'My name is...' and 'I am from...'",
          intermediate: "Great! Let's work on English conversation. Can you tell me about your favorite movie and why you like it?",
          advanced: "Excellent! Let's discuss complex topics. What are your thoughts on technology's impact on society?"
        }
      };

      const fallback = fallbackResponses[selectedLanguage]?.[difficulty] || 
                      "I'm here to help you practice! What would you like to learn today?";
      
      return {
        content: fallback,
        xpEarned: 5
      };
    }
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
      const aiResponse = await callAIAPI(inputMessage);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse.content,
        timestamp: new Date(),
        corrections: aiResponse.corrections || []
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Update session stats
      setSessionStats(prev => ({
        messages: prev.messages + 1,
        xpEarned: prev.xpEarned + aiResponse.xpEarned,
        corrections: prev.corrections + (aiResponse.corrections?.length > 0 ? 1 : 0)
      }));
      
      // Award XP
      if (aiResponse.xpEarned > 0) {
        addXP(aiResponse.xpEarned);
      }
      
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
    setSessionStats({
      messages: 0,
      xpEarned: 0,
      corrections: 0
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Language Selection */}
            <Card className="backdrop-blur-sm bg-white/70 border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  Language
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Difficulty Selection */}
            <Card className="backdrop-blur-sm bg-white/70 border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Difficulty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((diff) => (
                      <SelectItem key={diff.value} value={diff.value}>
                        {diff.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Mode Selection */}
            <Card className="backdrop-blur-sm bg-white/70 border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-700">Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={conversationMode} onValueChange={setConversationMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conversationModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Clear Chat Button */}
            <Button 
              onClick={clearConversation}
              variant="outline" 
              className="w-full bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear Chat
            </Button>

            {/* Session Stats */}
            <Card className="backdrop-blur-sm bg-white/70 border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Session Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Messages</span>
                  <Badge variant="secondary">{sessionStats.messages}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">XP Earned</span>
                  <Badge variant="secondary">{sessionStats.xpEarned}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Corrections</span>
                  <Badge variant="secondary">{sessionStats.corrections}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-8rem)] backdrop-blur-sm bg-white/70 border-white/20 flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-green-500 text-white'
                        }`}>
                          {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className="space-y-2">
                          <div className={`rounded-2xl px-4 py-3 ${
                            message.type === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-white border border-gray-200 text-gray-800'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                          {message.corrections && message.corrections.length > 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
                              <p className="text-yellow-800 font-medium mb-1">Grammar Suggestion:</p>
                              <p className="text-yellow-700">
                                <span className="line-through text-red-600">{message.corrections[0].original}</span>
                                {' → '}
                                <span className="text-green-600">{message.corrections[0].corrected}</span>
                              </p>
                              <p className="text-yellow-600 text-xs mt-1">{message.corrections[0].explanation}</p>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                            {message.type === 'bot' && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => speakMessage(message.content)}
                                className="h-6 w-6 p-0"
                              >
                                {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm text-gray-600">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <Textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message here..."
                      className="min-h-[60px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <span>Press Enter to send, Shift+Enter for new line</span>
                      <span>{inputMessage.length}/500</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={toggleListening}
                      variant={isListening ? "default" : "outline"}
                      size="sm"
                      className="w-10 h-10 p-0"
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      size="sm"
                      className="w-10 h-10 p-0"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                  </div>
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

