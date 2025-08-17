# Use Node.js 18 (compatible with your "engines" requirement)
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install --production

# Copy backend source code
COPY backend ./

# Expose the backend port (your package.json docker run maps 5000)
EXPOSE 5000

# Run backend
CMD ["npm", "start"]
