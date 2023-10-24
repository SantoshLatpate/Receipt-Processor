# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

COPY . .

# Copy the rest of your application source code to the container
EXPOSE 3000

# Specify the command to run your application
CMD [ "node", "src/app.js" ]
