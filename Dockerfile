# Use the official Playwright image which comes with all necessary system dependencies
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Copy package files
COPY package*.json ./

# Install dependencies (including Playwright browsers)
# Using npm install instead of npm ci to handle platform-specific dependencies
# that may not be in the Windows-generated lockfile
RUN npm install --omit=dev

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Health check for container orchestrators
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Expose port (Railway and Render both use PORT env variable)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
