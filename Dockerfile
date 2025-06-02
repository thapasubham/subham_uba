# Base build stage
FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules


COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
