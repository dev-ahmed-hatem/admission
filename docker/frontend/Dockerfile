# Step 1: Build the React app using Vite
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY ./frontend/package*.json ./

# Install dependencies (only for production)
# RUN npm install --frozen-lockfile --production
RUN npm install

# Copy the rest of the app source code
COPY ./frontend/ .

# Build the React app using Vite
RUN npm run build

# Step 2: Serve the build using Nginx (production-ready)
# FROM nginx:alpine

# # Copy the built React app from the build stage to Nginx's HTML directory
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copy custom Nginx configuration (optional, for better routing and caching)
# COPY ./docker/frontend/nginx.conf /etc/nginx/nginx.conf

# # Expose the default HTTP and HTTPS ports
# EXPOSE 80 443

# # Run Nginx in the foreground
# CMD ["nginx", "-g", "daemon off;"]
