# 'dev' or 'release' container build
ARG BUILD_TYPE=dev

# Use an official Python base image from the Docker Hub
FROM python:3.10-slim AS autogpt-base

# Install browsers
RUN apt-get update && apt-get install -y \
    chromium-driver firefox-esr ca-certificates \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install utilities
RUN apt-get update && apt-get install -y \
    curl jq wget git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PIP_NO_CACHE_DIR=yes \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Install the required python packages globally
ENV PATH="$PATH:/root/.local/bin"
COPY requirements.txt .

# Set the entrypoint
ENTRYPOINT ["python", "-m", "autogpt", "--install-plugin-deps"]

# dev build -> include everything
FROM autogpt-base as autogpt-dev
RUN pip install --no-cache-dir -r requirements.txt
WORKDIR /app
ONBUILD COPY . ./

# release build -> include bare minimum
FROM autogpt-base as autogpt-release
RUN sed -i '/Items below this point will not be included in the Docker Image/,$d' requirements.txt && \
    pip install --no-cache-dir -r requirements.txt
WORKDIR /app
ONBUILD COPY autogpt/ ./autogpt
ONBUILD COPY scripts/ ./scripts
ONBUILD COPY plugins/ ./plugins
ONBUILD COPY prompt_settings.yaml ./prompt_settings.yaml
ONBUILD RUN mkdir ./data

# Use an official Node.js base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

ENV OPENAI_API_KEY=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


# Copy the package.json and package-lock.json files
COPY next-app/package*.json ./

# Install dependencies
RUN npm install

# Copy the API code
COPY next-app/api/index.py ./api/index.py

# ...

# Copy the pages code
COPY next-app/app/page.tsx ./app/page.tsx

# ...

# Build the Next.js application
RUN npm run build

# Set the command to start the Next.js application
CMD ["npm", "start"]
