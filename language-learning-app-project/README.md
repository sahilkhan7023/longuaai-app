# 🚀 LinguaAI - AI Language Learning Platform

A comprehensive full-stack AI-powered language learning web application built with React.js, Node.js, and MongoDB. Features include AI chat tutoring, speaking practice, interactive lessons, progress tracking, and a complete admin panel.

## ✨ Features

### 🎓 User Features
- **AI Chat Tutor**: Intelligent conversational practice with grammar correction and translation
- **Speaking & Listening Practice**: Real-time speech recognition and pronunciation feedback
- **Interactive Lessons**: Gamified learning modules with flashcards and quizzes
- **Progress Tracking**: Detailed analytics, XP system, and achievement badges
- **Leaderboard**: Global rankings and competitive learning
- **PWA Support**: Offline access, push notifications, and mobile app experience
- **Multi-language Support**: Spanish, French, German, Italian, Portuguese, Japanese

### 🛠 Admin Features
- **User Management**: View, edit, and manage user accounts
- **Lesson Management**: Create, edit, and organize learning content
- **Analytics Dashboard**: User engagement and learning progress insights
- **Subscription Management**: Stripe integration for premium features
- **AI Prompt Editor**: Customize chatbot responses and behavior
- **Leaderboard Control**: Manage rankings and detect cheating

### 🎨 Design & UX
- **Glassmorphism UI**: Modern glass-effect design with subtle animations
- **Blue Theme**: Primary #3B82F6, Secondary #FACC15 color scheme
- **Responsive Design**: Mobile-first approach with touch support
- **Micro-interactions**: Confetti effects, streaks, and smooth transitions
- **Dark/Light Mode**: Automatic theme switching based on system preference

## 🏗 Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for styling and responsive design
- **Framer Motion** for animations and transitions
- **React Router** for client-side routing
- **Shadcn/UI** for consistent component library
- **PWA** with service worker for offline functionality

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** authentication with refresh tokens
- **Stripe** for payment processing
- **OpenAI API** for AI chat functionality
- **Bcrypt** for password hashing
- **CORS** and security middleware

### DevOps & Deployment
- **Docker** support for containerization
- **Environment variables** for configuration
- **ESLint** and Prettier for code quality
- **Git** version control with comprehensive .gitignore

## 📁 Project Structure

```
ai-language-learning-app/
├── backend/                    # Node.js + Express.js backend
│   ├── models/                # MongoDB models
│   │   ├── User.js           # User account model
│   │   ├── Progress.js       # Learning progress tracking
│   │   ├── VocabItem.js      # Vocabulary items
│   │   ├── Lesson.js         # Lesson content model
│   │   ├── Quiz.js           # Quiz and assessment model
│   │   └── Subscription.js   # Stripe subscription model
│   ├── routes/               # API route handlers
│   │   ├── auth.js          # Authentication endpoints
│   │   ├── user.js          # User profile and dashboard
│   │   ├── ai.js            # AI chat and language processing
│   │   ├── admin.js         # Admin panel endpoints
│   │   ├── lessons.js       # Lesson management
│   │   ├── progress.js      # Progress tracking
│   │   └── subscriptions.js # Stripe integration
│   ├── middleware/          # Express middleware
│   │   └── auth.js         # JWT authentication middleware
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
├── frontend/               # React.js + Tailwind CSS frontend
│   ├── public/            # Static assets
│   │   ├── manifest.json  # PWA manifest
│   │   ├── sw.js         # Service worker
│   │   └── offline.html  # Offline fallback page
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   │   ├── ui/      # Shadcn/UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── PWAInstallPrompt.jsx
│   │   │   └── OfflineIndicator.jsx
│   │   ├── contexts/    # React context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/       # Page components
│   │   │   ├── auth/    # Authentication pages
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── SignupPage.jsx
│   │   │   ├── admin/   # Admin panel pages
│   │   │   │   ├── AdminLoginPage.jsx
│   │   │   │   ├── AdminDashboardPage.jsx
│   │   │   │   ├── AdminUsersPage.jsx
│   │   │   │   ├── AdminLessonsPage.jsx
│   │   │   │   ├── AdminLeaderboardPage.jsx
│   │   │   │   ├── AdminSettingsPage.jsx
│   │   │   │   └── AdminSubscriptionsPage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── OnboardingPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── AIChatPage.jsx
│   │   │   ├── SpeakingPage.jsx
│   │   │   ├── ListeningPage.jsx
│   │   │   ├── LessonsPage.jsx
│   │   │   ├── LessonDetailPage.jsx
│   │   │   ├── LeaderboardPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── PricingPage.jsx
│   │   ├── services/    # API service layer
│   │   │   └── apiService.js
│   │   ├── App.jsx     # Main app component
│   │   ├── App.css     # Global styles and theme
│   │   └── main.jsx    # React entry point
│   ├── package.json    # Frontend dependencies
│   ├── vite.config.js  # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── components.json # Shadcn/UI configuration
│   └── .env.example    # Frontend environment variables
├── README.md           # This file
└── .gitignore         # Git ignore rules
```




## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm/yarn/pnpm
- **MongoDB** (local installation or MongoDB Atlas)
- **OpenAI API Key** for AI chat functionality
- **Stripe Account** for payment processing (optional)

### 1. Clone and Setup

```bash
# Extract the project
unzip ai-language-learning-app.zip
cd ai-language-learning-app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

**Required Environment Variables:**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ai-language-learning
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/ai-language-learning

# JWT Secrets (generate strong random strings)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-here-make-it-long-and-random

# OpenAI API (required for AI chat)
OPENAI_API_KEY=your-openai-api-key-here

# Stripe (optional, for payments)
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key-here
STRIPE_WEBHOOK_SECRET=whsec_your-stripe-webhook-secret-here
```

```bash
# Start the backend server
npm run dev

# Server will run on http://localhost:5000
```

### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
pnpm install
# or: npm install / yarn install

# Copy environment variables
cp .env.example .env

# Edit .env file
nano .env
```

**Frontend Environment Variables:**
```env
# API URL (should match your backend)
VITE_API_URL=http://localhost:5000/api

# Stripe Public Key (if using payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key-here
```

```bash
# Start the frontend development server
pnpm run dev
# or: npm run dev / yarn dev

# Frontend will run on http://localhost:5173
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Admin Panel**: http://localhost:5173/admin

**Default Admin Credentials** (create manually in database):
```javascript
// In MongoDB, create an admin user:
{
  username: "admin",
  email: "admin@linguaai.com",
  password: "$2b$10$...", // bcrypt hash of "admin123"
  role: "admin"
}
```

## 🔧 Configuration

### MongoDB Setup

#### Option 1: Local MongoDB
```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Start MongoDB service
mongod
```

#### Option 2: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

### OpenAI API Setup
1. Create account at [OpenAI](https://platform.openai.com/)
2. Generate API key
3. Add to backend `.env` as `OPENAI_API_KEY`

### Stripe Setup (Optional)
1. Create account at [Stripe](https://stripe.com/)
2. Get API keys from dashboard
3. Add to both backend and frontend `.env` files
4. Set up webhook endpoint: `https://yourdomain.com/api/subscriptions/webhook`

## 📱 PWA Installation

The app supports Progressive Web App (PWA) features:

1. **Desktop**: Visit the site and click the install prompt
2. **Mobile**: Use "Add to Home Screen" from browser menu
3. **Offline**: Works offline with cached content and sync when online

## 🎨 Customization

### Theme Colors
Edit `frontend/src/App.css` to change the color scheme:

```css
:root {
  --primary: oklch(0.578 0.207 258.338); /* #3B82F6 - Blue */
  --secondary: oklch(0.832 0.174 85.873); /* #FACC15 - Yellow */
  /* Add your custom colors */
}
```

### AI Prompts
Customize AI chat behavior in `backend/routes/ai.js`:

```javascript
const systemPrompt = `You are a helpful language tutor...`;
```

### Branding
- Replace logo in `frontend/public/icons/`
- Update app name in `frontend/public/manifest.json`
- Modify meta tags in `frontend/index.html`

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
# Build the frontend
cd frontend
pnpm run build

# Deploy the dist/ folder to your hosting provider
```

**Vercel:**
```bash
npm i -g vercel
vercel --prod
```

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Backend Deployment (Railway/Heroku/DigitalOcean)

**Railway:**
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

**Heroku:**
```bash
# Install Heroku CLI
heroku create your-app-name
git push heroku main
```

**Docker Deployment:**
```bash
# Build and run with Docker
docker build -t linguaai-backend ./backend
docker run -p 5000:5000 linguaai-backend

docker build -t linguaai-frontend ./frontend
docker run -p 3000:3000 linguaai-frontend
```

### Environment Variables for Production

**Backend Production Variables:**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=production-secret-key
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_live_...
FRONTEND_URL=https://yourdomain.com
```

**Frontend Production Variables:**
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
pnpm test
```

### E2E Testing
```bash
# Install Playwright
npm install -g @playwright/test
playwright test
```

## 📊 Monitoring & Analytics

### Error Tracking
- **Sentry**: Add Sentry DSN to environment variables
- **LogRocket**: For frontend session replay

### Performance Monitoring
- **New Relic**: Backend performance monitoring
- **Vercel Analytics**: Frontend performance insights

### User Analytics
- **Google Analytics**: Add GA4 tracking ID
- **Mixpanel**: For detailed user behavior tracking

## 🔒 Security

### Security Headers
The app includes security middleware:
- CORS protection
- Rate limiting
- Helmet.js security headers
- JWT token validation
- Input sanitization

### Best Practices Implemented
- Password hashing with bcrypt
- JWT with refresh tokens
- Environment variable protection
- SQL injection prevention
- XSS protection
- CSRF protection

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Use conventional commits

## 📝 API Documentation

### Authentication Endpoints
```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
POST /api/auth/logout       # User logout
POST /api/auth/refresh      # Refresh JWT token
GET  /api/auth/me          # Get current user
PUT  /api/auth/profile     # Update user profile
```

### User Endpoints
```
GET  /api/user/dashboard    # Get dashboard data
GET  /api/user/progress     # Get learning progress
POST /api/user/progress     # Update progress
GET  /api/user/leaderboard  # Get leaderboard
GET  /api/user/statistics   # Get user statistics
```

### AI Endpoints
```
POST /api/ai/chat           # AI chat conversation
POST /api/ai/grammar-check  # Grammar checking
POST /api/ai/translate      # Text translation
POST /api/ai/vocabulary     # Vocabulary practice
```

### Admin Endpoints
```
GET  /api/admin/dashboard   # Admin dashboard
GET  /api/admin/users       # Manage users
GET  /api/admin/lessons     # Manage lessons
GET  /api/admin/settings    # App settings
```

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check MongoDB connection
- Verify environment variables
- Ensure port 5000 is available

**Frontend build fails:**
- Clear node_modules and reinstall
- Check Node.js version (18+)
- Verify environment variables

**AI chat not working:**
- Verify OpenAI API key
- Check API quota and billing
- Review network connectivity

**PWA not installing:**
- Ensure HTTPS in production
- Check manifest.json validity
- Verify service worker registration

### Debug Mode
Enable debug logging:
```env
# Backend
DEBUG=true
LOG_LEVEL=debug

# Frontend
VITE_DEBUG=true
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT API
- **Stripe** for payment processing
- **MongoDB** for database
- **Vercel** for hosting
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React** and **Node.js** communities

## 📞 Support

- **Email**: support@linguaai.com
- **Documentation**: https://docs.linguaai.com
- **Issues**: Create an issue in this repository
- **Discord**: https://discord.gg/linguaai

---

**Built with ❤️ by the LinguaAI Team**

*Happy Learning! 🚀*

