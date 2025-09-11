# Stage 1: Build the Next.js app
FROM node:20-slim AS builder

WORKDIR /app

# Install required packages (openssl for Prisma, python3/make/g++ for node-gyp builds)
RUN apt-get update \
  && apt-get install -y openssl python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY package.json package-lock.json* ./

# Copy Prisma schema first (so prisma generate works)
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Generate Prisma client explicitly (important for Next.js build)
RUN npx prisma generate

# Copy the rest of the app
COPY . .

# Build Next.js app
RUN npm run build

# Copy Prisma engines into .next (so Next.js can find them at runtime)
RUN mkdir -p .next/server/.prisma/client \
  && cp -r node_modules/.prisma/client/* .next/server/.prisma/client/


# Stage 2: Run the app
FROM node:20-slim AS runner

WORKDIR /app

# Install runtime dependencies
RUN apt-get update \
  && apt-get install -y openssl \
  && rm -rf /var/lib/apt/lists/*

# Copy runtime files only
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/prisma ./prisma

# Copy env (make sure DATABASE_URL and DIRECT_URL are inside .env)
COPY .env* ./

EXPOSE 3000

# Run Prisma migrations before starting the app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
