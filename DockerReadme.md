# Docker Setup

## Prerequisites

1. **Docker**: Install Docker from [Docker's official website](https://www.docker.com/).
2. **Docker Compose**: Ensure Docker Compose is installed (comes bundled with Docker Desktop).

## Directory Structure

The project is organized as follows:

```
cosc680-2024-project/
├── server/
│   ├── Dockerfile
│   ├── .env
├── db/
│   ├── Dockerfile
│   ├── .env
├── client/
│   ├── Dockerfile
│   ├── .env
├── docker-compose.yml  # Root compose for fullstack setup

```

## Update Environment Files based on the info shared

### `.env` in the root directory:
Used by the fullstack services.

```.env
PORT=5000

DB_NAME={db_name}
DB_HOST=fullstack_db{db service name in compose}
DB_USER={User}
DB_PASSWORD={password}
DB_PORT={port}

POSTGRES_USER={user_name}
POSTGRES_PASSWORD=
POSTGRES_DB={db_name}

VITE_EXPRESS_API_URL=http://localhost:5000
```

### `client/.env`:
Used by the client service. Update the `VITE_EXPRESS_API_URL` for mobile testing as needed.

```env
VITE_EXPRESS_API_URL=http://localhost:5000  # Replace with 192.168.x.x for mobile testing
```

### `server/.env`:
Used by the server service.

```env
PORT=5000

DB_NAME=
DB_HOST=db_service(db service name in compose)
DB_USER=
DB_PASSWORD=
DB_PORT=5432

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

### `db/.env`:
Used by the PostgreSQL database service.

```env
POSTGRES_USER={user}
POSTGRES_PASSWORD=
POSTGRES_DB=
```


## Run the Docker
### 1. Build and Start the Fullstack Application
Navigate to the root directory and use the fullstack Compose file:

```
cd cosc680
docker-compose up --build
```

This will start:
- The client service (`fullstack_client`) on port `5173`.
- The server service (`fullstack_server`) on port `3000`.
- The PostgreSQL database service (`fullstack_db`) on port `5432`.


## Replacing Environment Variables

- Replace `VITE_EXPRESS_API_URL` in `client/.env` with your computer's local IP (e.g., `192.168.x.x`) for mobile devices to access the server.
- Update `DB varibales` in `server/.env` and root `.env` for your database configuration.


## Testing the Application

1. **Web Browser**: Open [http://localhost:5173](http://localhost:5173) to access the client.
2. **Mobile**: Use the local IP address (e.g., `http://192.168.x.x:5173`) to access the app from a mobile browser or device.



## Stopping Services

To stop the services, run:

```
docker-compose down
```


## Troubleshooting

1. **Database Connection Issues**: Ensure the `DB_HOST` and `DB_PORT` in `.env` match the service name and port in the Compose file.
2. **client-server Communication**: Verify that `VITE_EXPRESS_API_URL` is set correctly in `client/.env`.
3. **Mobile Testing**: Ensure your local IP address is accessible on the same network as your mobile device.
