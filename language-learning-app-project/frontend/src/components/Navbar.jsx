import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  MessageCircle, 
  Mic, 
  Headphones, 
  BookOpen, 
  Trophy, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X,
  Zap,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { user, logout, isPremium } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/chat', icon: MessageCircle, label: 'AI Chat' },
    { path: '/speaking', icon: Mic, label: 'Speaking' },
    { path: '/listening', icon: Headphones, label: 'Listening' },
    { path: '/lessons', icon: BookOpen, label: 'Lessons' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      className="glass-nav sticky top-0 z-50 border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 hover-scale">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
              LinguaAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 rounded-lg transition-all duration-200 hover-lift ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="activeTab"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* XP Display */}
            <div className="hidden sm:flex items-center space-x-2 glass px-3 py-1 rounded-full">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold">{user?.totalXP || 0}</span>
              <Badge variant="secondary" className="text-xs">
                Lv.{user?.level || 1}
              </Badge>
            </div>

            {/* Premium Badge */}
            {isPremium() && (
              <Badge className="gradient-secondary text-black font-semibold">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}

            {/* Profile Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="p-1 hover:bg-white/10"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar} alt={user?.username} />
                  <AvatarFallback className="gradient-primary text-white text-sm">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-lg py-2"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-sm font-medium">{user?.username}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-white/5 transition-colors w-full text-left text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-white/10 py-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile XP Display */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">{user?.totalXP || 0} XP</span>
                    <Badge variant="secondary">Lv.{user?.level || 1}</Badge>
                  </div>
                  {isPremium() && (
                    <Badge className="gradient-secondary text-black font-semibold">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

