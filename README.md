# nawy-task
# Apartment Listing Application

This is a full-stack application for creating, listing, and updating apartments. It consists of a Next.js 14 frontend and a Node.js backend.

## Project Structure
Root Directory
├── server/         # Backend Node.js application
│   └── package.json
├── web/            # Frontend Next.js 14 application
│   └── package.json
├── docker-compose.yml
└── docker-compose.dev.yml

## Features

- Create new apartment listings
- View list of apartments
- Update existing apartment information

## Prerequisites

- Node.js (v18 or later)
- npm
- Docker and Docker Compose (for containerized setup)

## Running the Applications Separately

### Backend (Server)

1. Navigate to the server directory:

cd server
2. Install dependencies:
npm install

3. Start the development server:

npm run dev

The server will start on `http://localhost:9999`.

### Frontend (Web)

1. Navigate to the web directory:
cd web

2. Install dependencies:
npm install
3. Start the development server:
npm run dev
The Next.js application will start on `http://localhost:3000`.

## Running with Docker

### Production Environment

To run both applications in a production-like environment:

1. Ensure you are in the root directory of the project.
2. Run:
docker-compose up --build

This will build and start both the frontend and backend services.

### Development Environment

For a development setup with hot-reloading:

1. Ensure you are in the root directory of the project.
2. Run:
docker-compose -f docker-compose.dev.yml up --build

This will start both services in development mode with volume mounts for hot-reloading.

## Accessing the Application

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:9999`

## Environment Variables

The backend uses several environment variables. These are set in the `docker-compose.yml` and `docker-compose.dev.yml` files. In a non-Dockerized environment, you'll need to set these manually or use a `.env` file.

