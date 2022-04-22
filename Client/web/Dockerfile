FROM node:16

# Set production environment
ENV NODE_ENV=production

# Install serve
RUN npm install -g serve

# Create app directory
WORKDIR /app

# Copy build files into /app
COPY build /app

EXPOSE 3001
CMD [ "npx", "serve", "-l", "3001" ]