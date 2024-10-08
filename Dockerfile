# Stage 1: Build the app
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the rest of the application source code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Serve the app
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the node_modules from the build stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the built app from the build stage
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start the NestJS server
CMD ["node", "dist/main"]
