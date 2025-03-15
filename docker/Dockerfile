FROM docker.io/node:jod-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile --non-interactive

COPY . .
