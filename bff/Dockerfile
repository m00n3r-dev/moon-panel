FROM node:24-alpine AS builder
WORKDIR /app
COPY bff/package*.json ./
RUN npm ci
COPY bff/ ./
COPY proto ./proto
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/proto ./proto
COPY --from=builder /app/package*.json ./
EXPOSE 3000
CMD ["node", "dist/main"]