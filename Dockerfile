FROM node:20

# We have to install nodemon globally before moving into the working directory
# RUN npm install -g

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY ./favicon.png ./favicon.png
COPY ./index.html ./index.html
COPY ./log.js ./log.js
COPY ./.proxyrc.js ./.proxyrc.js
COPY ./.terserrc ./.terserrc
COPY ./src ./src
COPY ./public ./public
COPY ./parcel ./parcel

RUN npm install

EXPOSE 8000
CMD npm run dev