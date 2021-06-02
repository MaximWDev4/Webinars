FROM nginx

COPY ./proxy_ssl.conf /etc/nginx/conf.d/proxy_ssl.conf

COPY ./backend-not-found.html /var/www/html/backend-not-found.html

COPY ./includes/ /etc/nginx/includes/

COPY ./ssl/ /etc/ssl/certs/nginx/
