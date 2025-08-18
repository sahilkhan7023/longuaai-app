import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Components
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages - User App
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AIChatPage from './pages/AIChatPage';
import SpeakingPage from './pages/SpeakingPage';
import ListeningPage from './pages/ListeningPage';
import LessonsPage from './pages/LessonsPage';
import LessonDetailPage from './pages/LessonDetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import PricingPage from './pages/PricingPage';

// Pages - Admin Panel
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminLessonsPage from './pages/admin/AdminLessonsPage';
import AdminLeaderboardPage from './pages/admin/AdminLeaderboardPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminSubscriptionsPage from './pages/admin/AdminSubscriptionsPage';

// PWA Components
import PWAInstallPrompt from './components/PWAInstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-yellow-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-6">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Navigation handler to prevent back button errors
function NavigationHandler({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle browser back/forward navigation
    const handlePopState = (event) => {
      try {
        // Prevent default browser behavior that might cause errors
        event.preventDefault();
        
        // Get the current path
        const currentPath = window.location.pathname;
        
        // Handle specific routes that might cause issues
        if (currentPath.includes('/admin') && !localStorage.getItem('adminToken') && !localStorage.getItem('accessToken')) {
          navigate('/admin/login', { replace: true });
          return;
        }
        
        // For protected routes, check authentication
        const protectedRoutes = ['/dashboard', '/chat', '/speaking', '/listening', '/lessons', '/leaderboard', '/profile', '/settings'];
        const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));
        
        if (isProtectedRoute && !localStorage.getItem('accessToken')) {
          navigate('/login', { replace: true });
          return;
        }
        
        // Allow normal navigation for other cases
        window.history.pushState(null, '', currentPath);
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to safe route
        navigate('/', { replace: true });
      }
    };

    // Add event listener for popstate (back/forward buttons)
    window.addEventListener('popstate', handlePopState);
    
    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  // Handle route changes
  useEffect(() => {
    try {
      // Scroll to top on route change
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Route change error:', error);
    }
  }, [location.pathname]);

  return children;
}

function AppContent() {
  const { user, loading } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        <NavigationHandler>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/pricing" element={<PricingPage />} />

              {/* Protected User Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Navbar />
                  <DashboardPage />
                </ProtectedRoute>
              } />
              
              <Route path="/chat" element={
                <ProtectedRoute>
                  <Navbar />
                  <AIChatPage />
                </ProtectedRoute>
              } />
              
              <Route path="/speaking" element={
                <ProtectedRoute>
                  <Navbar />
                  <SpeakingPage />
                </ProtectedRoute>
              } />
              
              <Route path="/listening" element={
                <ProtectedRoute>
                  <Navbar />
                  <ListeningPage />
                </ProtectedRoute>
              } />
              
              <Route path="/lessons" element={
                <ProtectedRoute>
                  <Navbar />
                  <LessonsPage />
                </ProtectedRoute>
              } />
              
              <Route path="/lessons/:id" element={
                <ProtectedRoute>
                  <Navbar />
                  <LessonDetailPage />
                </ProtectedRoute>
              } />
              
              <Route path="/leaderboard" element={
                <ProtectedRoute>
                  <Navbar />
                  <LeaderboardPage />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Navbar />
                  <ProfilePage />
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Navbar />
                  <SettingsPage />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              } />
              
              <Route path="/admin/users" element={
                <AdminRoute>
                  <AdminUsersPage />
                </AdminRoute>
              } />
              
              <Route path="/admin/lessons" element={
                <AdminRoute>
                  <AdminLessonsPage />
                </AdminRoute>
              } />
              
              <Route path="/admin/leaderboard" element={
                <AdminRoute>
                  <AdminLeaderboardPage />
                </AdminRoute>
              } />
              
              <Route path="/admin/subscriptions" element={
                <AdminRoute>
                  <AdminSubscriptionsPage />
                </AdminRoute>
              } />
              
              <Route path="/admin/settings" element={
                <AdminRoute>
                  <AdminSettingsPage />
                </AdminRoute>
              } />

              {/* Redirect Routes */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
            </Routes>
          </AnimatePresence>
        </NavigationHandler>

        {/* PWA Components */}
        <PWAInstallPrompt />
        <OfflineIndicator isOnline={isOnline} />
      </div>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

