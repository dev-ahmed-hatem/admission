# Stage 1: Build React app
FROM node:18 AS build
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend .
RUN npm run build


# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80 443
# CMD ["nginx", "-g", "daemon off;"]
