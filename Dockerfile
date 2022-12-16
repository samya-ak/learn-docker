# base image
FROM node:15
#Sets /app as root directory to run commands from
WORKDIR /app
# Copy package.json from this directory to /app in docker image
COPY package.json .

#Argument which is passed into docker file when we are building docker image.
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ];\
	then npm install; \
	else npm install --only=production; \
	fi

#Copy rest of the files from this directory in docker image
# we are first copying package.json and then remaining files because we don't wanna reiterate building 
# package.json and npm install (assets that rarely change while developing) when all that changed was source code files.
COPY . .
#Open port 3000
#Environment variable
ENV PORT 3000
EXPOSE $PORT
#Commands for runtime - when container is run
CMD ["npm", "run", "dev"]
