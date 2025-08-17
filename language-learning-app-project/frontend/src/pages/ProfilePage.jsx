import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit3, 
  Camera, 
  Mail, 
  Calendar, 
  MapPin, 
  Globe,
  Trophy,
  Zap,
  Flame,
  Target,
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  Star,
  Settings,
  Save,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    nativeLanguage: user?.nativeLanguage || '',
    targetLanguage: user?.targetLanguage || '',
    learningGoal: user?.learningGoal || ''
  });

  // Simulated user data
  const userStats = {
    totalXP: user?.totalXP || 1250,
    currentStreak: user?.currentStreak || 15,
    longestStreak: user?.longestStreak || 28,
    lessonsCompleted: user?.lessonsCompleted || 24,
    hoursStudied: user?.hoursStudied || 45,
    rank: user?.rank || 156,
    joinDate: user?.joinDate || '2024-01-15',
    level: Math.floor((user?.totalXP || 1250) / 100) + 1
  };

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      earned: true,
      earnedDate: "2024-01-16"
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "🔥",
      earned: true,
      earnedDate: "2024-01-23"
    },
    {
      id: 3,
      title: "XP Master",
      description: "Earn 1000 XP",
      icon: "⚡",
      earned: true,
      earnedDate: "2024-02-10"
    },
    {
      id: 4,
      title: "Social Learner",
      description: "Complete 10 conversation exercises",
      icon: "💬",
      earned: true,
      earnedDate: "2024-02-05"
    },
    {
      id: 5,
      title: "Grammar Guru",
      description: "Master 5 grammar topics",
      icon: "📚",
      earned: false,
      earnedDate: null
    },
    {
      id: 6,
      title: "Speed Demon",
      description: "Complete a lesson in under 10 minutes",
      icon: "🚀",
      earned: false,
      earnedDate: null
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "lesson",
      title: "Completed 'Business Communication'",
      xp: 120,
      date: "2024-02-15",
      time: "14:30"
    },
    {
      id: 2,
      type: "achievement",
      title: "Earned 'XP Master' achievement",
      xp: 50,
      date: "2024-02-10",
      time: "16:45"
    },
    {
      id: 3,
      type: "streak",
      title: "15-day streak milestone",
      xp: 25,
      date: "2024-02-14",
      time: "09:15"
    },
    {
      id: 4,
      type: "lesson",
      title: "Completed 'Travel & Tourism'",
      xp: 90,
      date: "2024-02-12",
      time: "11:20"
    }
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' }
  ];

  const learningGoals = [
    { value: 'travel', label: 'Travel & Tourism' },
    { value: 'business', label: 'Business & Career' },
    { value: 'academic', label: 'Academic Studies' },
    { value: 'personal', label: 'Personal Interest' },
    { value: 'family', label: 'Family & Heritage' }
  ];

  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || '',
      location: user?.location || '',
      nativeLanguage: user?.nativeLanguage || '',
      targetLanguage: user?.targetLanguage || '',
      learningGoal: user?.learningGoal || ''
    });
    setIsEditing(false);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'lesson': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'achievement': return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'streak': return <Flame className="w-4 h-4 text-orange-500" />;
      default: return <Zap className="w-4 h-4 text-purple-500" />;
    }
  };

  const getNextLevelXP = () => {
    return userStats.level * 100;
  };

  const getCurrentLevelProgress = () => {
    const currentLevelXP = (userStats.level - 1) * 100;
    const nextLevelXP = userStats.level * 100;
    const progressXP = userStats.totalXP - currentLevelXP;
    return (progressXP / (nextLevelXP - currentLevelXP)) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user?.avatar} alt={user?.username} />
                    <AvatarFallback className="text-2xl gradient-primary text-white">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={editForm.username}
                        onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                        placeholder="Username"
                        className="text-xl font-bold"
                      />
                      <Textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell us about yourself..."
                        className="resize-none"
                        rows={2}
                      />
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-2xl font-bold">{user?.username || 'User'}</h1>
                      <p className="text-muted-foreground mt-1">
                        {user?.bio || 'Language learning enthusiast'}
                      </p>
                    </div>
                  )}

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{userStats.totalXP}</div>
                        <div className="text-xs text-muted-foreground">Total XP</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 streak-fire rounded-lg flex items-center justify-center">
                        <Flame className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{userStats.currentStreak}</div>
                        <div className="text-xs text-muted-foreground">Day Streak</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 gradient-secondary rounded-lg flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <div className="font-semibold">#{userStats.rank}</div>
                        <div className="text-xs text-muted-foreground">Global Rank</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveProfile} size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="sm">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Level Progress */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Level Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">Level {userStats.level}</div>
                    <p className="text-sm text-muted-foreground">
                      {getNextLevelXP() - userStats.totalXP} XP to next level
                    </p>
                  </div>
                  <Progress value={getCurrentLevelProgress()} className="xp-bar" />
                  <div className="text-center text-xs text-muted-foreground">
                    {userStats.totalXP} / {getNextLevelXP()} XP
                  </div>
                </CardContent>
              </Card>

              {/* Learning Stats */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Learning Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Lessons Completed</span>
                    <span className="font-medium">{userStats.lessonsCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Hours Studied</span>
                    <span className="font-medium">{userStats.hoursStudied}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Longest Streak</span>
                    <span className="font-medium">{userStats.longestStreak} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="font-medium">
                      {new Date(userStats.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Recent Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.filter(a => a.earned).slice(0, 3).map(achievement => (
                    <div key={achievement.id} className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{achievement.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(achievement.earnedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map(achievement => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: achievement.id * 0.1 }}
                >
                  <Card className={`glass-card ${achievement.earned ? 'ring-2 ring-yellow-200' : 'opacity-60'}`}>
                    <CardContent className="p-4 text-center space-y-3">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.earned ? (
                        <Badge className="gradient-secondary text-black">
                          Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                        </Badge>
                      ) : (
                        <Badge variant="outline">Not Earned</Badge>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{activity.date}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-yellow-600">
                        +{activity.xp} XP
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input
                      value={editForm.location}
                      onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="City, Country"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Language Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Native Language</label>
                    <Select 
                      value={editForm.nativeLanguage} 
                      onValueChange={(value) => setEditForm(prev => ({ ...prev, nativeLanguage: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your native language" />
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
                    <label className="text-sm font-medium mb-2 block">Target Language</label>
                    <Select 
                      value={editForm.targetLanguage} 
                      onValueChange={(value) => setEditForm(prev => ({ ...prev, targetLanguage: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language you're learning" />
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
                    <label className="text-sm font-medium mb-2 block">Learning Goal</label>
                    <Select 
                      value={editForm.learningGoal} 
                      onValueChange={(value) => setEditForm(prev => ({ ...prev, learningGoal: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Why are you learning?" />
                      </SelectTrigger>
                      <SelectContent>
                        {learningGoals.map(goal => (
                          <SelectItem key={goal.value} value={goal.value}>
                            {goal.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveProfile}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;

