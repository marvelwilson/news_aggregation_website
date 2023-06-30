# Base image
FROM node:14-alpine as react

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the container port (if your React app uses a different port, change it here)
EXPOSE 3000

# Start the React app
CMD ["npm", "run", "dev"]
