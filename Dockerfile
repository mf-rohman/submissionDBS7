FROM alpine:latest AS builder
RUN apk update && \
    apk add --no-cache nodejs npm
WORKDIR /build
COPY . .
RUN mv -v .env.prod .env && \
    npm install && \
    npm run build

FROM joseluisq/static-web-server:2 AS runner
WORKDIR /app
COPY --from=builder /build/dist/* .
EXPOSE 80
CMD ["static-web-server", "-p", "80", "-d", "/app/", "-g", "trace"]