FROM node:8.9.4

# Move project to /jlto directory
RUN mkdir -p /jlto
COPY . /jlto
WORKDIR /jlto

# Install dependencies
RUN npm i