# Stage 1: Build the Next.js app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install || yarn install || pnpm install

# Copy rest of the code
COPY . .

# Build Next.js app
RUN npm run build

# Stage 2: Run the app
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only what's needed
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js

# If you want envs in container
COPY .env .env

EXPOSE 3000
CMD ["npm", "start"]
