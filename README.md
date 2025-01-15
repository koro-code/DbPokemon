# Fastack

A Pokemon database project using Virtuoso and Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [pnpm](https://pnpm.io/) (Will be installed in the steps below)

## Installation Steps

### 1. Start Docker Containers

```bash
# Navigate to docker directory
cd apps/.docker

# Start the containers in detached mode
docker compose up -d
```

### 2. Configure Virtuoso Database

Access the Virtuoso container and load the data:

```bash
# Access the container
docker exec -it virtuoso bash

# Access SQL console
isql-v

# Execute these commands in the SQL console:
ld_dir('/data', 'poke-a.nq', 'http://www.example.com/my-graph');
rdf_loader_run();
```

### 3. Install Dependencies and Start Development Server

```bash
# cd into the project's root !

# Install pnpm globally
npm i -g pnpm

# Install project dependencies
pnpm i

# Build the project
pnpm build

# Start the development server
cd apps/frontend

# Copy .env sample
cp .env.sample .env

pnpm dev
```

## Accessing the Application

Once all steps are completed, you can access the application at `http://localhost:3001` (or the port specified in your environment settings).

## Troubleshooting

If you encounter any issues:

1. Ensure all Docker containers are running (`docker ps`)
2. Check Docker logs (`docker logs virtuoso`)
3. Verify all dependencies are installed correctly
