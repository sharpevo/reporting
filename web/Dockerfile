FROM caddy/caddy:latest
COPY dist/ /app/
COPY caddyfile /etc/caddy/Caddyfile

CMD ["caddy", "run", "-config=/etc/caddy/Caddyfile", "-adapter=caddyfile"]
