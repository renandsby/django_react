FROM node:20-slim

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy app
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
