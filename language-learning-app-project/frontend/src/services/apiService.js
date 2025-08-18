const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle token expiration
        if (response.status === 401 && data.code === 'TOKEN_EXPIRED') {
          try {
            const newToken = await this.refreshToken();
            // Retry the original request with new token
            config.headers.Authorization = `Bearer ${newToken}`;
            const retryResponse = await fetch(url, config);
            const retryData = await retryResponse.json();
            
            return {
              success: retryResponse.ok,
              data: retryData,
              message: retryData.message,
              status: retryResponse.status
            };
          } catch (refreshError) {
            // Refresh failed, redirect to login
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            throw refreshError;
          }
        }

        return {
          success: false,
          data: null,
          message: data.message || 'Request failed',
          status: response.status,
          errors: data.errors
        };
      }

      return {
        success: true,
        data: data,
        message: data.message,
        status: response.status
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        data: null,
        message: error.message || 'Network error',
        status: 0
      };
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${this.baseURL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    const newToken = data.tokens.accessToken;
    localStorage.setItem('accessToken', newToken);
    
    return newToken;
  }

  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  async upload(endpoint, formData) {
    const token = localStorage.getItem('accessToken');
    const headers = {};
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      return {
        success: response.ok,
        data: data,
        message: data.message,
        status: response.status
      };
    } catch (error) {
      console.error('Upload failed:', error);
      return {
        success: false,
        data: null,
        message: error.message || 'Upload failed',
        status: 0
      };
    }
  }
}

const apiService = new ApiService();
export default apiService;

// Specific API methods for different endpoints
export const authAPI = {
  login: (email, password) => apiService.post('/auth/login', { email, password }),
  register: (userData) => apiService.post('/auth/register', userData),
  logout: () => apiService.post('/auth/logout'),
  getProfile: () => apiService.get('/auth/me'),
  updateProfile: (data) => apiService.put('/auth/profile', data),
  changePassword: (currentPassword, newPassword) => 
    apiService.put('/auth/change-password', { currentPassword, newPassword }),
  deleteAccount: (password) => apiService.delete('/auth/account', { password }),
};

export const userAPI = {
  getDashboard: (language) => apiService.get('/user/dashboard', { language }),
  getProgress: (language) => apiService.get(`/user/progress/${language}`),
  updateLessonProgress: (data) => apiService.post('/user/progress/lesson', data),
  getLeaderboard: (params) => apiService.get('/user/leaderboard', params),
  getStatistics: (params) => apiService.get('/user/statistics', params),
  updateWeeklyGoals: (data) => apiService.put('/user/goals/weekly', data),
  getBadges: () => apiService.get('/user/badges'),
  searchUsers: (query) => apiService.get('/user/search', { q: query }),
};

export const aiAPI = {
  chat: (message, language, context, difficulty) => 
    apiService.post('/ai/chat', { message, language, context, difficulty }),
  checkGrammar: (text, language) => 
    apiService.post('/ai/grammar-check', { text, language }),
  translate: (text, fromLanguage, toLanguage, includeExplanation) => 
    apiService.post('/ai/translate', { text, fromLanguage, toLanguage, includeExplanation }),
  generateVocabulary: (language, difficulty, category, count) => 
    apiService.post('/ai/vocabulary-practice', { language, difficulty, category, count }),
  getConversationStarters: (language, difficulty, topic, count) => 
    apiService.post('/ai/conversation-starters', { language, difficulty, topic, count }),
  getUsage: () => apiService.get('/ai/usage'),
};

export const lessonsAPI = {
  getLessons: (params) => apiService.get('/lessons', params),
  getLesson: (id) => apiService.get(`/lessons/${id}`),
  getPopular: (language, limit) => apiService.get(`/lessons/popular/${language}`, { limit }),
  getRecommendations: (language, limit) => apiService.get(`/lessons/recommendations/${language}`, { limit }),
  getByDifficulty: (language, difficulty, limit) => 
    apiService.get(`/lessons/difficulty/${language}/${difficulty}`, { limit }),
  search: (language, query, filters) => 
    apiService.get(`/lessons/search/${language}`, { q: query, ...filters }),
};

export const progressAPI = {
  getQuiz: (id) => apiService.get(`/progress/quiz/${id}`),
  startQuiz: (id) => apiService.post(`/progress/quiz/${id}/start`),
  submitAnswer: (quizId, data) => apiService.post(`/progress/quiz/${quizId}/answer`, data),
  completeQuiz: (quizId, attemptId) => apiService.post(`/progress/quiz/${quizId}/complete`, { attemptId }),
  getQuizAttempts: (params) => apiService.get('/progress/quiz-attempts', params),
  getDailyChallenge: (language) => apiService.get(`/progress/daily-challenge/${language}`),
  getVocabularyReview: (language, count) => apiService.get(`/progress/vocabulary-review/${language}`, { count }),
};

export const subscriptionAPI = {
  getPlans: () => apiService.get('/subscriptions/plans'),
  getCurrent: () => apiService.get('/subscriptions/current'),
  createSetupIntent: () => apiService.post('/subscriptions/setup-intent'),
  createSubscription: (priceId, paymentMethodId) => 
    apiService.post('/subscriptions/create', { priceId, paymentMethodId }),
  updateSubscription: (priceId) => apiService.put('/subscriptions/update', { priceId }),
  cancelSubscription: (cancelAtPeriodEnd) => 
    apiService.post('/subscriptions/cancel', { cancelAtPeriodEnd }),
  reactivateSubscription: () => apiService.post('/subscriptions/reactivate'),
  getBillingHistory: () => apiService.get('/subscriptions/billing-history'),
};

export const adminAPI = {
  getDashboard: () => apiService.get('/admin/dashboard'),
  getUsers: (params) => apiService.get('/admin/users', params),
  updateUser: (userId, data) => apiService.put(`/admin/users/${userId}`, data),
  deleteUser: (userId) => apiService.delete(`/admin/users/${userId}`),
  getLessons: (params) => apiService.get('/admin/lessons', params),
  createLesson: (data) => apiService.post('/admin/lessons', data),
  updateLesson: (lessonId, data) => apiService.put(`/admin/lessons/${lessonId}`, data),
  deleteLesson: (lessonId) => apiService.delete(`/admin/lessons/${lessonId}`),
  getVocabulary: (params) => apiService.get('/admin/vocabulary', params),
  getSubscriptions: (params) => apiService.get('/admin/subscriptions', params),
  getSettings: () => apiService.get('/admin/settings'),
  updateSettings: (settings) => apiService.put('/admin/settings', { settings }),
};


