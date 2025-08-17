import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Upload, 
  FileText, 
  Image, 
  Music, 
  Video,
  Search,
  Filter,
  ArrowLeft,
  Save,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AdminLessonsPage = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'beginner',
    category: 'grammar',
    content: '',
    xpReward: 50,
    estimatedTime: 15,
    tags: '',
    isPublished: true
  });

  // Mock lessons data
  const mockLessons = [
    {
      id: 1,
      title: 'Basic Greetings & Introductions',
      description: 'Learn essential greetings and how to introduce yourself',
      level: 'beginner',
      category: 'conversation',
      xpReward: 50,
      estimatedTime: 15,
      tags: ['greetings', 'introductions', 'basic'],
      isPublished: true,
      createdAt: '2024-01-15',
      completions: 1247,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Present Tense Verbs',
      description: 'Master the present tense in English',
      level: 'intermediate',
      category: 'grammar',
      xpReward: 75,
      estimatedTime: 25,
      tags: ['verbs', 'present tense', 'grammar'],
      isPublished: true,
      createdAt: '2024-01-10',
      completions: 892,
      rating: 4.6
    },
    {
      id: 3,
      title: 'Business Email Writing',
      description: 'Professional email communication skills',
      level: 'advanced',
      category: 'business',
      xpReward: 100,
      estimatedTime: 30,
      tags: ['business', 'email', 'professional'],
      isPublished: false,
      createdAt: '2024-01-05',
      completions: 234,
      rating: 4.9
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setLessons(mockLessons);
    setFilteredLessons(mockLessons);
  }, []);

  useEffect(() => {
    // Filter lessons based on search and level
    let filtered = lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (filterLevel !== 'all') {
      filtered = filtered.filter(lesson => lesson.level === filterLevel);
    }

    setFilteredLessons(filtered);
  }, [lessons, searchTerm, filterLevel]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newLesson = {
        ...formData,
        id: editingLesson ? editingLesson.id : Date.now(),
        tags: formData.tags.split(',').map(tag => tag.trim()),
        createdAt: editingLesson ? editingLesson.createdAt : new Date().toISOString().split('T')[0],
        completions: editingLesson ? editingLesson.completions : 0,
        rating: editingLesson ? editingLesson.rating : 0
      };

      if (editingLesson) {
        setLessons(prev => prev.map(lesson => 
          lesson.id === editingLesson.id ? newLesson : lesson
        ));
        setMessage({ type: 'success', text: 'Lesson updated successfully!' });
      } else {
        setLessons(prev => [newLesson, ...prev]);
        setMessage({ type: 'success', text: 'Lesson created successfully!' });
      }

      resetForm();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save lesson. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (lesson) => {
    setEditingLesson(lesson);
    setFormData({
      ...lesson,
      tags: lesson.tags.join(', ')
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (lessonId) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      setLessons(prev => prev.filter(lesson => lesson.id !== lessonId));
      setMessage({ type: 'success', text: 'Lesson deleted successfully!' });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      level: 'beginner',
      category: 'grammar',
      content: '',
      xpReward: 50,
      estimatedTime: 15,
      tags: '',
      isPublished: true
    });
    setEditingLesson(null);
    setShowCreateForm(false);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate('/admin/dashboard')}
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <BookOpen className="w-6 h-6 text-blue-400" />
              <h1 className="text-xl font-bold text-white">Lesson Management</h1>
            </div>
            
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Lesson
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message.text && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'border-green-600 bg-green-900/20' : 'border-red-600 bg-red-900/20'}`}>
            <AlertDescription className={message.type === 'success' ? 'text-green-300' : 'text-red-300'}>
              {message.type === 'success' ? <CheckCircle className="w-4 h-4 inline mr-2" /> : <AlertCircle className="w-4 h-4 inline mr-2" />}
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {!showCreateForm ? (
          <>
            {/* Filters */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Search lessons..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={filterLevel} onValueChange={setFilterLevel}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lessons List */}
            <div className="grid gap-6">
              {filteredLessons.map((lesson) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
                            <Badge className={getLevelColor(lesson.level)}>
                              {lesson.level}
                            </Badge>
                            {!lesson.isPublished && (
                              <Badge variant="secondary">Draft</Badge>
                            )}
                          </div>
                          
                          <p className="text-slate-300 mb-4">{lesson.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-slate-400">XP Reward:</span>
                              <span className="text-white ml-2">{lesson.xpReward}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Duration:</span>
                              <span className="text-white ml-2">{lesson.estimatedTime}min</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Completions:</span>
                              <span className="text-white ml-2">{lesson.completions}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Rating:</span>
                              <span className="text-white ml-2">{lesson.rating}/5</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            {lesson.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-slate-300 border-slate-600">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-slate-300 hover:text-white hover:bg-slate-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(lesson)}
                            className="text-slate-300 hover:text-white hover:bg-slate-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(lesson.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          /* Create/Edit Form */
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">
                  {editingLesson ? 'Edit Lesson' : 'Create New Lesson'}
                </CardTitle>
                <Button
                  onClick={resetForm}
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title" className="text-slate-200">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="level" className="text-slate-200">Level</Label>
                    <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-slate-200">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content" className="text-slate-200">Lesson Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    rows={8}
                    placeholder="Enter the lesson content in markdown format..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="xpReward" className="text-slate-200">XP Reward</Label>
                    <Input
                      id="xpReward"
                      name="xpReward"
                      type="number"
                      value={formData.xpReward}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white"
                      min="1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="estimatedTime" className="text-slate-200">Duration (minutes)</Label>
                    <Input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="number"
                      value={formData.estimatedTime}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white"
                      min="1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category" className="text-slate-200">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grammar">Grammar</SelectItem>
                        <SelectItem value="vocabulary">Vocabulary</SelectItem>
                        <SelectItem value="conversation">Conversation</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="pronunciation">Pronunciation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags" className="text-slate-200">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="e.g., grammar, verbs, present tense"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleInputChange}
                    className="rounded border-slate-600 bg-slate-700"
                  />
                  <Label htmlFor="isPublished" className="text-slate-200">Publish immediately</Label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Saving...
                      </div>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {editingLesson ? 'Update Lesson' : 'Create Lesson'}
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminLessonsPage;
