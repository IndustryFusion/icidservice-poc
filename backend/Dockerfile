# 
# Copyright (c) 2024 IB Systems GmbH 
# 
# Licensed under the Apache License, Version 2.0 (the "License"); 
# you may not use this file except in compliance with the License. 
# You may obtain a copy of the License at 
# 
# http://www.apache.org/licenses/LICENSE-2.0 
# 
# Unless required by applicable law or agreed to in writing, software 
# distributed under the License is distributed on an "AS IS" BASIS, 
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
# See the License for the specific language governing permissions and 
# limitations under the License. 
# 

# Use an official Node.js runtime as a base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the entire application to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 4010

# Install application dependencies
RUN npm install

# Define a build argument with a default value "dev"
ARG ENV=dev

# Set environment variable in the container
ENV NODE_ENV=$ENV

# Conditionally run build command based on the ENV argument
RUN if [ "$ENV" = "prod" ]; then \
    npm run build; \
    fi

CMD ["/bin/sh", "-c", "if [ \"$NODE_ENV\" = \"prod\" ]; then npm run start:prod; else npm run start:dev; fi"]
