import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Activity,
  Settings,
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Globe,
  Shield,
  Clock,
  Award,
  MessageSquare
} from 'lucide-react';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalLessons: 156,
    completedLessons: 3421,
    totalXPAwarded: 125430,
    newUsersToday: 23,
    lessonsCompletedToday: 89,
    averageSessionTime: '12m 34s'
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'user_registration', user: 'John Doe', action: 'registered', time: '2 minutes ago' },
    { id: 2, type: 'lesson_completion', user: 'Sarah Smith', action: 'completed "Basic Greetings"', time: '5 minutes ago' },
    { id: 3, type: 'xp_milestone', user: 'Mike Johnson', action: 'reached 1000 XP', time: '8 minutes ago' },
    { id: 4, type: 'lesson_creation', user: 'Admin', action: 'created "Advanced Grammar"', time: '15 minutes ago' },
    { id: 5, type: 'user_achievement', user: 'Emma Wilson', action: 'earned "Speaking Master" badge', time: '22 minutes ago' }
  ]);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminUser');
    
    if (!adminToken || !adminData) {
      navigate('/admin/login');
      return;
    }
    
    setAdminUser(JSON.parse(adminData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration':
        return <Users className="w-4 h-4 text-green-600" />;
      case 'lesson_completion':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'xp_milestone':
        return <TrendingUp className="w-4 h-4 text-purple-600" />;
      case 'lesson_creation':
        return <Plus className="w-4 h-4 text-orange-600" />;
      case 'user_achievement':
        return <Award className="w-4 h-4 text-yellow-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <h1 className="text-xl font-bold text-white">LinguaAI Admin</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-white">{adminUser.name}</div>
                <div className="text-xs text-slate-300">{adminUser.role}</div>
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-slate-700"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                    <p className="text-green-400 text-xs">+{stats.newUsersToday} today</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Active Users</p>
                    <p className="text-2xl font-bold text-white">{stats.activeUsers.toLocaleString()}</p>
                    <p className="text-blue-400 text-xs">{Math.round((stats.activeUsers / stats.totalUsers) * 100)}% engagement</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Total Lessons</p>
                    <p className="text-2xl font-bold text-white">{stats.totalLessons}</p>
                    <p className="text-purple-400 text-xs">{stats.lessonsCompletedToday} completed today</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Total XP Awarded</p>
                    <p className="text-2xl font-bold text-white">{stats.totalXPAwarded.toLocaleString()}</p>
                    <p className="text-yellow-400 text-xs">Avg session: {stats.averageSessionTime}</p>
                  </div>
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => navigate('/admin/users')}
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                
                <Button
                  onClick={() => navigate('/admin/lessons')}
                  className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Manage Lessons
                </Button>
                
                <Button
                  onClick={() => navigate('/admin/lessons')}
                  className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Lesson
                </Button>
                
                <Button
                  onClick={() => navigate('/admin/settings')}
                  className="w-full justify-start bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
                
                <Button
                  onClick={() => navigate('/admin/leaderboard')}
                  className="w-full justify-start bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-white text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-slate-400 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <Button
                    variant="ghost"
                    className="w-full text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    View All Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-slate-300 text-sm">API Status</p>
                    <p className="text-white font-medium">Operational</p>
                  </div>
                  <Badge className="bg-green-600 text-white">Online</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-slate-300 text-sm">Database</p>
                    <p className="text-white font-medium">Connected</p>
                  </div>
                  <Badge className="bg-green-600 text-white">Healthy</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-slate-300 text-sm">AI Services</p>
                    <p className="text-white font-medium">Available</p>
                  </div>
                  <Badge className="bg-yellow-600 text-white">Limited</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

