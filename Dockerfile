# Use the official Node.js image as a base image
FROM node:18.12.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies using yarn
RUN yarn install

# Copy the rest of the application to the working directory
COPY . .

#Build the Next.js application for production
RUN npm run build

##Expose port 3000 to be accessible outside the container
EXPOSE 3000

#Command to run the application using Next.js's built-in server
CMD ["npm","run", "start"]
