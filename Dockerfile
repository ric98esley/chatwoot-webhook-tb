FROM node:18-alpine3.20 as builder

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY ./src ./src

# Set the enviorenment variable

ENV API_VERSION=$API_VERSION
ENV PORT=$PORT
ENV POCKETBASE_URL=$POCKETBASE_URL
ENV POCKETBASE_API_KEY=$USER_PASS_PB
ENV USER_PB=$USER_PB

ENV TYPEBOT_URL=$TYPEBOT_URL
ENV TYPEBOT_FLOW_ID=$TYPEBOT_FLOW_ID

ENV CHATWOOT_URL=$CHATWOOT_URL
ENV CHATWOOT_BOT_TOKEN=$CHATWOOT_BOT_TOKEN
ENV ACCOUNT_ID=$ACCOUNT_ID

ENV AUTH_TOKEN=$AUTH_TOKEN

# Make port 3000 available to the outside world
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]