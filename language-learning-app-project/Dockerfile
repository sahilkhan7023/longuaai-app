# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend package.json and package-lock.json
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the backend code
COPY backend/ ./

# Expose the port your app runs on
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
