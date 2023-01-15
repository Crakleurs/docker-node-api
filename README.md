# docker-node-api

## Installation

To install the api on the server, you just have to clone the project.

``` git clone https://github.com/Crakleurs/docker-node-api.git ```

You can then launch the whole architecture using docker. Docker will create the images and then launch the database and the api.

The order is as follows

``` docker-compose up -d ```

## Apply modifications

You can modify the api, if you wan't to apply the modifications to the production, you need to use the following command.

``` docker-compose up -d --build```

## Nginx

If you use nginx you can use the following configuration file. You need to change the server_name and also the certificates.
The api is just working with https, you can use the cert bot software to generate SSL certificates.

```
server {
        listen 80;
        server_name api-docker.etienne-faviere.tech;
        return 301 https://$host$request_uri;
}

server {
        listen 443 ssl http2;
        server_name api-docker.etienne-faviere.tech;

        ssl_certificate /etc/letsencrypt/live/api-docker.etienne-faviere.tech/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/api-docker.etienne-faviere.tech/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

        location / {
                proxy_pass http://localhost:8080;
        }
}
```
