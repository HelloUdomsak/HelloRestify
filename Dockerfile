FROM keymetrics/pm2:latest-stretch

# Bundle APP files
COPY src src/
COPY pm2.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR src/
RUN npm install
WORKDIR /

CMD [ "pm2-runtime", "start", "pm2.json" ]