# Use the node base image
FROM node:latest

# Move inside the container to specific dir
WORKDIR /usr/src/app

# copy both package.json and package.lock.json
COPY package*.json ./

# copy src in container workspace
COPY src/ src/

# install dependecies
RUN npm install

# Run the app
CMD ["npm", "run", "start"]
