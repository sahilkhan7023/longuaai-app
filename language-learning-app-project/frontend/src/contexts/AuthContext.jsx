import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/apiService'; // Changed to default import

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      console.log('AuthContext: Checking auth status, token found:', !!token);
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await apiService.get('/auth/me');
      if (response.success) {
        setUser(response.data.user);
        setSubscription(response.data.user.subscription);
        console.log('AuthContext: User and subscription set from /auth/me:', response.data.user);
      } else {
        console.log('AuthContext: /auth/me failed, clearing tokens.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await apiService.post('/auth/login', { email, password });
      
      if (response.success) {
        const { user, tokens } = response.data;
        
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        console.log('AuthContext: Tokens stored in localStorage:', tokens);
        
        setUser(user);
        setSubscription(user.subscription);
        console.log('AuthContext: User and subscription set after login:', user);
        
        return { success: true };
      } else {
        console.log('AuthContext: Login failed, response message:', response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await apiService.post('/auth/register', userData);
      
      if (response.success) {
        const { user, tokens } = response.data;
        
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        console.log('AuthContext: Tokens stored in localStorage after signup:', tokens);
        
        setUser(user);
        setSubscription(user.subscription);
        console.log('AuthContext: User and subscription set after signup:', user);
        
        return { success: true };
      } else {
        console.log('AuthContext: Signup failed, response message:', response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Signup failed. Please try again.' 
      };
    }
  };

  const logout = async () => {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setSubscription(null);
      console.log('AuthContext: User logged out, tokens cleared.');
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await apiService.put('/auth/profile', profileData);
      
      if (response.success) {
        setUser(response.data.user);
        console.log('AuthContext: Profile updated:', response.data.user);
        return { success: true };
      } else {
        console.log('AuthContext: Profile update failed, response message:', response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Profile update failed.' 
      };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await apiService.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      
      if (response.success) {
        console.log('AuthContext: Password changed successfully.');
        return { success: true };
      } else {
        console.log('AuthContext: Password change failed, response message:', response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('Password change error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Password change failed.' 
      };
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      console.log('AuthContext: Refreshing token, refresh token found:', !!refreshToken);
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const response = await apiService.post('/auth/refresh', { refreshToken });
      
      if (response.success) {
        localStorage.setItem('accessToken', response.data.tokens.accessToken);
        console.log('AuthContext: Access token refreshed:', response.data.tokens.accessToken);
        return response.data.tokens.accessToken;
      } else {
        console.log('AuthContext: Token refresh failed, response message:', response.message);
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      throw error;
    }
  };

  const updateSubscription = (newSubscription) => {
    setSubscription(newSubscription);
    if (user) {
      setUser({ ...user, subscription: newSubscription });
    }
    console.log('AuthContext: Subscription updated:', newSubscription);
  };

  const addXP = (xpAmount) => {
    if (user) {
      const newTotalXP = user.totalXP + xpAmount;
      const newLevel = Math.floor(newTotalXP / 1000) + 1;
      
      setUser({
        ...user,
        totalXP: newTotalXP,
        level: newLevel
      });
      console.log('AuthContext: XP added, new user state:', { totalXP: newTotalXP, level: newLevel });

      // Return level up info
      return {
        leveledUp: newLevel > user.level,
        newLevel,
        xpGained: xpAmount
      };
    }
    return { leveledUp: false, newLevel: 1, xpGained: 0 };
  };

  const updateStreak = () => {
    if (user) {
      const today = new Date();
      const lastActive = new Date(user.lastActiveDate);
      const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
      
      let newStreak = user.currentStreak;
      let newLongestStreak = user.longestStreak;
      
      if (daysDiff === 1) {
        newStreak += 1;
        if (newStreak > newLongestStreak) {
          newLongestStreak = newStreak;
        }
      } else if (daysDiff > 1) {
        newStreak = 1;
      }
      
      setUser({
        ...user,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastActiveDate: today.toISOString()
      });
      console.log('AuthContext: Streak updated, new user state:', { currentStreak: newStreak, longestStreak: newLongestStreak });

      return {
        streakIncreased: daysDiff === 1,
        currentStreak: newStreak,
        isNewRecord: newStreak > user.longestStreak
      };
    }
    return { streakIncreased: false, currentStreak: 0, isNewRecord: false };
  };

  const isAdmin = () => {
    return user && (user.role === 'admin' || user.role === 'moderator');
  };

  const isPremium = () => {
    return subscription && subscription.plan !== 'free' && subscription.status === 'active';
  };

  const canUseFeature = (featureName, amount = 1) => {
    if (!subscription) return false;
    
    const limit = subscription.features[featureName];
    if (limit === -1) return true; // Unlimited
    
    const used = subscription.usage.currentPeriod[featureName] || 0;
    return used + amount <= limit;
  };

  const getRemainingUsage = (featureName) => {
    if (!subscription) return 0;
    
    const limit = subscription.features[featureName];
    if (limit === -1) return -1; // Unlimited
    
    const used = subscription.usage.currentPeriod[featureName] || 0;
    return Math.max(0, limit - used);
  };

  const value = {
    user,
    subscription,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
    refreshToken,
    updateSubscription,
    addXP,
    updateStreak,
    isAdmin,
    isPremium,
    canUseFeature,
    getRemainingUsage
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


