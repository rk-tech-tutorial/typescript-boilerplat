# image
FROM node:16.13.1

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Installing dependencies
COPY package*.json ./
RUN npm install --global npm@latest
RUN npm install --verbose

# Copying source files
COPY . .

ENV NODE_ENV production

# Building app
RUN npm run build --verbose

# Running the app
CMD [ "npm", "start" ]
