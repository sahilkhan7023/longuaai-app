import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Lock, 
  Star,
  Clock,
  Users,
  Trophy,
  Target,
  Zap,
  Filter,
  Search,
  ChevronRight,
  Award,
  Flame
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../contexts/AuthContext';

const LessonsPage = () => {
  const { user, addXP } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [completedLessons, setCompletedLessons] = useState(new Set([1, 2, 5])); // Simulated completed lessons
  
  const lessons = [
    {
      id: 1,
      title: "Basic Greetings & Introductions",
      description: "Learn essential greetings and how to introduce yourself in various situations.",
      category: "basics",
      difficulty: "beginner",
      duration: 15,
      xp: 50,
      students: 1250,
      rating: 4.8,
      thumbnail: "🤝",
      topics: ["Hello/Hi", "Nice to meet you", "How are you?", "Goodbye"],
      isCompleted: true,
      isLocked: false,
      progress: 100
    },
    {
      id: 2,
      title: "Numbers & Counting",
      description: "Master numbers from 1-100 and learn to count in different contexts.",
      category: "basics",
      difficulty: "beginner",
      duration: 20,
      xp: 60,
      students: 980,
      rating: 4.7,
      thumbnail: "🔢",
      topics: ["1-20", "21-100", "Ordinal numbers", "Time expressions"],
      isCompleted: true,
      isLocked: false,
      progress: 100
    },
    {
      id: 3,
      title: "Family & Relationships",
      description: "Vocabulary and expressions for talking about family members and relationships.",
      category: "vocabulary",
      difficulty: "beginner",
      duration: 25,
      xp: 75,
      students: 850,
      rating: 4.9,
      thumbnail: "👨‍👩‍👧‍👦",
      topics: ["Family members", "Relationships", "Describing people", "Family activities"],
      isCompleted: false,
      isLocked: false,
      progress: 0
    },
    {
      id: 4,
      title: "Food & Dining",
      description: "Essential vocabulary for restaurants, cooking, and food preferences.",
      category: "vocabulary",
      difficulty: "beginner",
      duration: 30,
      xp: 80,
      students: 720,
      rating: 4.6,
      thumbnail: "🍽️",
      topics: ["Food items", "Restaurant phrases", "Cooking verbs", "Preferences"],
      isCompleted: false,
      isLocked: false,
      progress: 0
    },
    {
      id: 5,
      title: "Present Tense Mastery",
      description: "Complete guide to present simple and present continuous tenses.",
      category: "grammar",
      difficulty: "intermediate",
      duration: 40,
      xp: 100,
      students: 650,
      rating: 4.8,
      thumbnail: "⏰",
      topics: ["Present simple", "Present continuous", "State verbs", "Time expressions"],
      isCompleted: true,
      isLocked: false,
      progress: 100
    },
    {
      id: 6,
      title: "Business Communication",
      description: "Professional language for meetings, emails, and presentations.",
      category: "business",
      difficulty: "intermediate",
      duration: 45,
      xp: 120,
      students: 420,
      rating: 4.9,
      thumbnail: "💼",
      topics: ["Email writing", "Meeting phrases", "Presentations", "Negotiations"],
      isCompleted: false,
      isLocked: false,
      progress: 0
    },
    {
      id: 7,
      title: "Advanced Conversation Skills",
      description: "Develop fluency in complex conversations and debates.",
      category: "conversation",
      difficulty: "advanced",
      duration: 50,
      xp: 150,
      students: 280,
      rating: 4.7,
      thumbnail: "🗣️",
      topics: ["Debate techniques", "Expressing opinions", "Complex arguments", "Fluency building"],
      isCompleted: false,
      isLocked: true,
      progress: 0
    },
    {
      id: 8,
      title: "Travel & Tourism",
      description: "Essential phrases and vocabulary for traveling abroad.",
      category: "travel",
      difficulty: "intermediate",
      duration: 35,
      xp: 90,
      students: 560,
      rating: 4.8,
      thumbnail: "✈️",
      topics: ["Airport phrases", "Hotel booking", "Directions", "Tourist activities"],
      isCompleted: false,
      isLocked: false,
      progress: 0
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'basics', label: 'Basics' },
    { value: 'vocabulary', label: 'Vocabulary' },
    { value: 'grammar', label: 'Grammar' },
    { value: 'conversation', label: 'Conversation' },
    { value: 'business', label: 'Business' },
    { value: 'travel', label: 'Travel' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const filteredLessons = lessons.filter(lesson => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || lesson.difficulty === selectedDifficulty;
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const startLesson = (lessonId) => {
    // In a real app, this would navigate to the lesson detail page
    window.location.href = `/lesson/${lessonId}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'basics': return '📚';
      case 'vocabulary': return '📝';
      case 'grammar': return '🔤';
      case 'conversation': return '💬';
      case 'business': return '💼';
      case 'travel': return '✈️';
      default: return '📖';
    }
  };

  const totalLessons = lessons.length;
  const completedCount = completedLessons.size;
  const totalXP = lessons.filter(l => completedLessons.has(l.id)).reduce((sum, l) => sum + l.xp, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Language Lessons</h1>
          <p className="text-muted-foreground">
            Structured learning path to improve your language skills
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Overview */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">
                    {completedCount}/{totalLessons}
                  </div>
                  <p className="text-sm text-muted-foreground">Lessons Completed</p>
                  <Progress 
                    value={(completedCount / totalLessons) * 100} 
                    className="xp-bar"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-yellow-600">{totalXP}</div>
                    <div className="text-xs text-muted-foreground">XP Earned</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-600">
                      {Math.round((completedCount / totalLessons) * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search lessons..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
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

                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
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
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {completedCount >= 1 && (
                  <Badge className="w-full justify-center gradient-secondary text-black">
                    🎯 First Lesson Complete
                  </Badge>
                )}
                {completedCount >= 3 && (
                  <Badge className="w-full justify-center gradient-primary text-white">
                    🔥 Learning Streak
                  </Badge>
                )}
                {totalXP >= 200 && (
                  <Badge className="w-full justify-center bg-purple-500 text-white">
                    ⭐ XP Master
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {filteredLessons.length} lesson{filteredLessons.length !== 1 ? 's' : ''} found
              </h2>
              <div className="text-sm text-muted-foreground">
                Showing {selectedCategory !== 'all' ? categories.find(c => c.value === selectedCategory)?.label : 'all categories'}
              </div>
            </div>

            {/* Lessons Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredLessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`glass-card hover-lift cursor-pointer transition-all duration-300 ${
                      lesson.isLocked ? 'opacity-60' : ''
                    } ${lesson.isCompleted ? 'ring-2 ring-green-200' : ''}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-3xl">{lesson.thumbnail}</div>
                            <div className="flex-1">
                              <CardTitle className="text-lg leading-tight">
                                {lesson.title}
                                {lesson.isCompleted && (
                                  <CheckCircle className="inline w-5 h-5 ml-2 text-green-600" />
                                )}
                                {lesson.isLocked && (
                                  <Lock className="inline w-5 h-5 ml-2 text-gray-400" />
                                )}
                              </CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge 
                                  variant="secondary" 
                                  className={`${getDifficultyColor(lesson.difficulty)} text-white text-xs`}
                                >
                                  {lesson.difficulty}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {getCategoryIcon(lesson.category)} {lesson.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {lesson.description}
                        </p>
                        
                        {/* Lesson Stats */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="space-y-1">
                            <div className="flex items-center justify-center">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="text-xs text-muted-foreground">{lesson.duration} min</div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-center">
                              <Zap className="w-4 h-4 text-yellow-500" />
                            </div>
                            <div className="text-xs text-muted-foreground">{lesson.xp} XP</div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-center">
                              <Users className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="text-xs text-muted-foreground">{lesson.students}</div>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center justify-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(lesson.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-2">
                            {lesson.rating}
                          </span>
                        </div>

                        {/* Topics */}
                        <div className="space-y-2">
                          <div className="text-xs font-medium text-muted-foreground">Topics covered:</div>
                          <div className="flex flex-wrap gap-1">
                            {lesson.topics.slice(0, 3).map((topic, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                            {lesson.topics.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{lesson.topics.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Progress Bar for Started Lessons */}
                        {lesson.progress > 0 && lesson.progress < 100 && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{lesson.progress}%</span>
                            </div>
                            <Progress value={lesson.progress} className="h-2" />
                          </div>
                        )}

                        {/* Action Button */}
                        <Button
                          onClick={() => !lesson.isLocked && startLesson(lesson.id)}
                          disabled={lesson.isLocked}
                          className="w-full"
                          variant={lesson.isCompleted ? "outline" : "default"}
                        >
                          {lesson.isLocked ? (
                            <>
                              <Lock className="w-4 h-4 mr-2" />
                              Locked
                            </>
                          ) : lesson.isCompleted ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Review Lesson
                            </>
                          ) : lesson.progress > 0 ? (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Continue
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Start Lesson
                            </>
                          )}
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Results */}
            {filteredLessons.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">No lessons found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                    setSearchTerm('');
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;

