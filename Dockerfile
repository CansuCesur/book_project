# Base image
FROM node:20.11.1

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Run tests (assuming your test command is npm test)
RUN npm test

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]