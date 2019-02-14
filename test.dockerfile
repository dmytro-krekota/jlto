FROM node:11.9.0

# Move project to /jlto directory
RUN mkdir -p /jlto
COPY . /jlto
WORKDIR /jlto

# Install dependencies
RUN npm ci
