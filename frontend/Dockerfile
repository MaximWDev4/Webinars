# stage 1

FROM node:alpine AS frontend-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build --prod

# stage 2

FROM nginx:alpine
COPY --from=frontend-build /app/dist/app-to-run-inside-docker /usr/share/nginx/html
EXPOSE 80
