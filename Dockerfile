# Use the official Playwright image which comes with Node.js and all browser dependencies pre-installed
FROM mcr.microsoft.com/playwright:v1.49.1-jammy

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
# We skip the postinstall script because the base image already has the browsers
# and we don't want to download them again or overwrite them.
# However, if the versions don't match exactly, we might need to run it.
# For safety on Railway, let's allow it to run or ensure we have the right deps.
# The base image has browsers at /ms-playwright.
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application, listening on the PORT environment variable or 3000 by default
CMD ["sh", "-c", "npm start -- -p ${PORT:-3000}"]
