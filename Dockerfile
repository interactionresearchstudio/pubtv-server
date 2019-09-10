FROM arm32v7/node:11.0.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY package-lock.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
