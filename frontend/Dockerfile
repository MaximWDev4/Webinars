# stage 1

FROM node:alpine AS frontend-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build --prod

# stage 2

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/dist/Frontend /usr/share/nginx/html
EXPOSE 80
