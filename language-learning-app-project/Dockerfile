# Use Node LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend package files first for caching
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy rest of backend code
COPY backend ./

# Expose backend port (change 3000 if your server uses another)
EXPOSE 3000

# Start server
CMD ["npm", "start"]
