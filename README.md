[![Publish Docker image](https://github.com/Crakleurs/docker-node-api/actions/workflows/docker-image.yml/badge.svg)](https://github.com/Crakleurs/docker-node-api/actions/workflows/docker-image.yml)

# docker-node-api
## Download

<a href='https://play.google.com/store/apps/details?id=fr.isep.mobwhale&gl=FR&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' height="150"/></a>

## Overview

This project is an api that allows you to manage your docker containers and images from your smartphone. The api was made in Node-js with the framwork express. It uses a PostresSQL database. The library used to manage docker is dockerode.
You can find the android application at the following address. https://github.com/Crakleurs/docker-node-api/releases/tag/v1.02


<p align="center">
   <img src="https://cdn.discordapp.com/attachments/562005144754192414/1064994247725563974/mob_docker.gif" height="500" alt="gif"/>
</p>


## Installation

To install the api on the server, you just have to clone the project.

``` git clone https://github.com/Crakleurs/docker-node-api.git ```

You can then launch the whole architecture using docker. Docker will create the images and then launch the database and the api.

Before launching the application, you need to change de environment variable in the docker-compose.yml
```
      MASTER_HOST: "https://api-url
```


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
