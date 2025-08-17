# LinguaAI Deployment Guide

This guide covers different deployment options for the LinguaAI language learning application.

## Prerequisites

- Node.js 18+ and npm
- MongoDB 7.0+
- Docker and Docker Compose (for containerized deployment)
- PM2 (for production Node.js deployment)

## Environment Configuration

### Backend Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Required
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/ai-language-learning
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key
OPENAI_API_KEY=your-openai-api-key

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Optional
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Frontend Environment Variables

Copy `.env.example` to `.env.production` and configure:

```bash
VITE_API_URL=https://your-backend-domain.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

## Deployment Options

### Option 1: Docker Compose (Recommended)

1. **Build and start all services:**
   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

4. **Stop services:**
   ```bash
   docker-compose down
   ```

### Option 2: Manual Deployment

#### Backend Deployment

1. **Install dependencies:**
   ```bash
   cd backend
   npm ci --production
   ```

2. **Set up MongoDB:**
   ```bash
   # Install MongoDB 7.0
   # Start MongoDB service
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

3. **Start with PM2:**
   ```bash
   npm install -g pm2
   pm2 start ecosystem.config.js --env production
   pm2 save
   pm2 startup
   ```

#### Frontend Deployment

1. **Build the application:**
   ```bash
   cd frontend
   npm ci
   npm run build
   ```

2. **Deploy with Nginx:**
   ```bash
   # Copy built files to web server
   sudo cp -r dist/* /var/www/html/
   
   # Configure Nginx (copy nginx.conf)
   sudo cp nginx.conf /etc/nginx/sites-available/linguaai
   sudo ln -s /etc/nginx/sites-available/linguaai /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Option 3: Cloud Deployment

#### Vercel (Frontend)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel --prod
   ```

#### Railway/Render (Backend)

1. **Connect your GitHub repository**
2. **Set environment variables in the dashboard**
3. **Deploy automatically on push**

#### MongoDB Atlas (Database)

1. **Create a cluster at mongodb.com**
2. **Get connection string**
3. **Update MONGODB_URI in environment variables**

## Production Checklist

### Security
- [ ] Change default JWT secrets
- [ ] Use HTTPS in production
- [ ] Set up proper CORS origins
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging

### Performance
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Configure caching headers
- [ ] Optimize database indexes
- [ ] Set up Redis for caching

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure log aggregation
- [ ] Set up uptime monitoring
- [ ] Configure alerts

### Backup
- [ ] Set up automated database backups
- [ ] Test backup restoration
- [ ] Document recovery procedures

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MongoDB service status
   - Verify connection string
   - Check firewall settings

2. **CORS Errors**
   - Update FRONTEND_URL in backend .env
   - Check CORS configuration in server.js

3. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify environment variables

4. **API Errors**
   - Check OpenAI API key
   - Verify Stripe configuration
   - Check server logs

### Logs Location

- **Docker:** `docker-compose logs [service-name]`
- **PM2:** `pm2 logs`
- **Nginx:** `/var/log/nginx/`
- **Application:** `backend/logs/`

## Scaling

### Horizontal Scaling
- Use load balancer (nginx, HAProxy)
- Deploy multiple backend instances
- Use Redis for session storage

### Database Scaling
- Set up MongoDB replica set
- Consider sharding for large datasets
- Use read replicas for analytics

### CDN and Caching
- Use CloudFlare or AWS CloudFront
- Implement Redis caching
- Cache API responses

## Support

For deployment issues:
- Check logs first
- Review environment variables
- Consult the troubleshooting section
- Contact support at support@linguaai.com

