FROM node:10.5.0-alpine

# Move project to /jlto directory
RUN mkdir -p /jlto
COPY . /jlto
WORKDIR /jlto

# Install dependencies
RUN npm ci
