# Base image
FROM node:20.11.1

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Firebase CLI globally
RUN npm install -g firebase-tools

# Copy project files
COPY . .

# Command to run the application
CMD ["npm", "start"]
