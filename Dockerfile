# Stage 1: Build the application
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock (or package-lock.json if you're using npm)
COPY package.json package-lock.lock ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Install only production dependencies
COPY package.json yarn.lock ./
RUN npm install --production --frozen-lockfile

# Copy the built application from the build stage
COPY --from=build /app/.output ./.output

# Expose the Nuxt app port
EXPOSE 5173

# Start the application
CMD ["node", ".output/server/index.mjs"]
