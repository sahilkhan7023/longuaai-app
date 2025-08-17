import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Flame, 
  Trophy, 
  BookOpen, 
  MessageCircle, 
  Mic,
  Calendar,
  TrendingUp,
  Star,
  Play
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user, addXP, updateStreak } = useAuth();
  const [dailyGoal, setDailyGoal] = useState(50);
  const [todayXP, setTodayXP] = useState(35);

  const quickActions = [
    { icon: MessageCircle, label: 'AI Chat', path: '/chat', color: 'bg-blue-500' },
    { icon: Mic, label: 'Speaking', path: '/speaking', color: 'bg-green-500' },
    { icon: BookOpen, label: 'Lessons', path: '/lessons', color: 'bg-purple-500' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard', color: 'bg-yellow-500' }
  ];

  const recentLessons = [
    { id: 1, title: 'Basic Greetings', progress: 100, xp: 50 },
    { id: 2, title: 'Family Members', progress: 75, xp: 38 },
    { id: 3, title: 'Food & Drinks', progress: 30, xp: 15 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to continue your language learning journey?
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user?.totalXP || 0}</p>
                      <p className="text-sm text-muted-foreground">Total XP</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 streak-fire rounded-lg flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user?.currentStreak || 0}</p>
                      <p className="text-sm text-muted-foreground">Day Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">#{user?.rank || 'N/A'}</p>
                      <p className="text-sm text-muted-foreground">Global Rank</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Goal */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Today's Goal</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {todayXP} / {dailyGoal} XP
                    </span>
                    <Badge variant="secondary">
                      {Math.round((todayXP / dailyGoal) * 100)}%
                    </Badge>
                  </div>
                  <Progress value={(todayXP / dailyGoal) * 100} className="xp-bar" />
                  <p className="text-sm text-muted-foreground">
                    {dailyGoal - todayXP > 0 
                      ? `${dailyGoal - todayXP} XP to reach your daily goal!`
                      : 'Daily goal completed! 🎉'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-20 hover-lift"
                        onClick={() => window.location.href = action.path}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium">{action.label}</span>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Lessons */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Continue Learning</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentLessons.map((lesson) => (
                  <div key={lesson.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{lesson.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {lesson.xp} XP
                      </Badge>
                    </div>
                    <Progress value={lesson.progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{lesson.progress}% complete</span>
                      <Button size="sm" variant="ghost" className="h-6 px-2">
                        <Play className="w-3 h-3 mr-1" />
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Latest Achievement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="text-4xl">🏆</div>
                  <div>
                    <h4 className="font-semibold">First Week!</h4>
                    <p className="text-sm text-muted-foreground">
                      Completed 7 days of learning
                    </p>
                  </div>
                  <Badge className="gradient-secondary text-black">
                    +100 XP Bonus
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

