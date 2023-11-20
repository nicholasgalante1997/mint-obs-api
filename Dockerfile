# https://pnpm.io/docker
FROM node:18-slim as node
# Set PNPM Env Variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV RUNTIME_STAGE="production"
# Enable pnpm via corepack @see https://nodejs.org/api/corepack.html
RUN corepack enable
# Create app directory
RUN mkdir -p /home/couch/mint/obs-api
# Change into app directory
WORKDIR /home/couch/mint/obs-api
# Copy over the package manifest and dependency lockfile
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
# Copy over app
COPY ./tsconfig.json ./
COPY ./src/ ./src/

# Install build dependencies
RUN pnpm install
# Build a static dist of the website
RUN pnpm build
# Clean development source code and deps
RUN rm -rf src 

CMD ["pnpm", "start"]