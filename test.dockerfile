FROM node:8.11.3-alpine

# Move project to /jlto directory
RUN mkdir -p /jlto
COPY . /jlto
WORKDIR /jlto

# It is needed, becaouse current repository (node:8.11.3-alpine) has an old npm without `npm ci` support.
RUN npm install npm@latest -g

# Install dependencies
RUN npm ci
