# fastify_learning

A Fastify web server built with TypeScript and Bun that provides health check endpoints and MongoDB-backed operations for animal records.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Configuration](#configuration)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)

## Features

- Fastify v5 server with fastify logger enabled
- Environment variable validation using `@fastify/env`
- MongoDB database integration using `@fastify/mongodb` and `fastify-plugin`
- JSON Schema body validation for API routes
- Local MongoDB container orchestration via Docker Compose

## Requirements

- [Bun](https://bun.sh/) runtime
- [Docker](https://www.docker.com/) with Docker Compose (for local database execution)

## Configuration

The application validates required environment variables at server startup using `@fastify/env`.

| Variable | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `PORT` | Integer | `3000` | Yes | The port number on which the HTTP server listens. |
| `MONGODB_URI` | String | None | Yes | Required environment schema parameter. |

*Note: The MongoDB plugin in `app/src/db/dbPlugin.ts` currently connects to `mongodb://localhost:27017/test_database`.*

## Installation

1. Install project dependencies:

```bash
bun install
```

2. Start the local MongoDB service using Docker Compose:

```bash
docker compose -f app/scripts/docker.compose.yml up -d
```

## Usage

Start the development server with hot-reloading:

```bash
PORT=3000 MONGODB_URI=mongodb://localhost:27017/test_database bun run dev
```

## API Reference

### General Routes

#### `GET /`
Returns a welcome message.

- **Response (200 OK):**
  ```json
  {
    "message": "hello world from fastify server"
  }
  ```

#### `GET /health`
Returns the server status.

- **Response (200 OK):**
  ```json
  {
    "message": "server is up and running healthy"
  }
  ```

### Animal Routes

All animal endpoints interact with the `test_collection` collection in MongoDB.

#### `GET /animals`
Retrieves all animal records.

- **Response (200 OK):** Array of animal documents.
- **Response (404 Not Found):**
  ```json
  {
    "message": "No documents found"
  }
  ```

#### `GET /animals/:animal`
Retrieves a single animal record by name.

- **Parameters:** `animal` (string) - The animal identifier.
- **Response (200 OK):** Animal document matching query.
- **Response (404 Not Found):**
  ```json
  {
    "message": "Animal not found"
  }
  ```

#### `POST /animals`
Creates a new animal document in MongoDB.

- **Request Body:**
  ```json
  {
    "animal": "string"
  }
  ```
- **Response (200 OK):** MongoDB insert operation result object containing insertion status and generated ID.

## Project Structure

```
.
├── app/
│   ├── scripts/
│   │   └── docker.compose.yml   # Docker Compose file for MongoDB container
│   └── src/
│       ├── animal/              # Animal routes, schemas, and controllers
│       │   ├── animal.controller.ts
│       │   └── animal.routes.ts
│       ├── db/                  # Fastify MongoDB plugin configuration
│       │   └── dbPlugin.ts
│       ├── health/              # Health route and controller
│       │   ├── health.controller.ts
│       │   └── health.routes.ts
│       └── server.ts            # Server entrypoint and env configuration
├── bun.lock
└── package.json
```