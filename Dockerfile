FROM nginx:alpine

MAINTAINER Tan Jin (tjtanjin)

# set leaderboard endpoints
ENV SOLOURL="https://spaceships.tjtanjin.com:801/api/v1/sololeaderboard"
ENV DUOURL="https://spaceships.tjtanjin.com:801/api/v1/duoleaderboard";

# copy all the files to the container
ADD ./res.tgz /usr/share/nginx/html/res
COPY . /usr/share/nginx/html
COPY ./nginx.conf ./etc/nginx/conf.d/default.conf

# update leaderboard endpoints into config
RUN echo -e "var SOLOURL='${SOLOURL}'\nvar DUOURL='${DUOURL}'" > /usr/share/nginx/html/js/config.js
