[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FIndustryFusion%2Ficidservice-poc.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2FIndustryFusion%2Ficidservice-poc?ref=badge_shield&issueType=license)

[![Nigthly](https://github.com/IndustryFusion/icidservice-poc/actions/workflows/nightly.yaml/badge.svg)](https://github.com/IndustryFusion/icidservice-poc/actions/workflows/nightly.yaml)

### ICID Service

This reposoitory contains the code of IFRIC service which is responsible for unique registration, identification and certification of Industry Fusion Assets


## Running the Project Locally

The project contains one application, the backend build on nest.js. The project takes the .env file with multiple required configurations.

Go inside each project and use README.md for running the applications.

The backend will be accessible at http://localhost:4006 after successful run.

## Running the Project using Docker.

**Build**

## Backend

### Build the Backend Docker Image

Navigate to the `backend` directory and build the Docker image:

```bash
cd backend
docker build -t ibn40/backend:latest .
```

**Run**

Make sure the .env variables are passed to the docker run command.

`docker run --env-file .env -p <actual-port-num>:<actual-port-num> ibn40/<image>:<tag>`
"../IfricRegistryService/README.md" 41L, 1524B   
