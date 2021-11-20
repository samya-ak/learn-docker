FROM node:15
#Sets /app as root directory to run commands from
WORKDIR /app
# Copy package.json from this directory to /app in docker image
COPY package.json .
RUN npm install
#Copy rest of the files from this directory in docker image
COPY . .
#Open port 3000
ENV PORT 3000
EXPOSE $PORT
#Commands for runtime - when container is run
CMD ["npm", "run", "dev"]