FROM node:12.6.0

# Move project to /jlto directory
RUN mkdir -p /jlto
COPY . /jlto
WORKDIR /jlto

# Install dependencies
RUN npm ci
