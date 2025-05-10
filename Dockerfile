FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# Build stage
FROM base AS build
WORKDIR /app/
ENV NODE_ENV=production
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile --prod=false
COPY ./ ./
RUN pnpm build

# Run stage
FROM base AS run
WORKDIR /app/
COPY --from=build /app/build /app/build
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/pnpm-lock.yaml /app/pnpm-lock.yaml
RUN pnpm install --prod --frozen-lockfile
CMD ["node", "build/index.js"]