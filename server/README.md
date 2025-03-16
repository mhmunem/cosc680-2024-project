# Back-end Server Setup

This README provides instructions for setting up, running, and managing your Back-end Server.

## Prerequisites

Ensure you have the following installed:
- Node.js: [Download Node.js](https://nodejs.org/)
- npm: Comes with Node.js installation
- Docker: [Download Docker](https://docs.docker.com/get-started/get-docker/)
- nodemon (optional): For automatic server restart on code changes
- install postman:[Download Postman](https://www.postman.com/downloads/) For API testing 

Verify the installation:
```
    - node -v
    - npm -v
    - nodeman
    - docker -v
```

## Setup

1. Clone the repository 
   ```
   git clone -b <branch-name> <repo-name>
   ```
2.  Navigate to the project directory:
    ```
    cd server
    ```
3. Install packages:
   ```
   npm i
   ```

## Running the Server

To start the server:

1. Start the docker engine by opening Docker Desktop.

2. Run the server:  
   ```
   docker compose up --build
   ```
3. Navigate to the project server directory:
   ```
   cd server
   ```
4. Open a browser and navigate to `http://localhost:5173/` to see the message - 
   ``` "Welcome to the Grocery Comparison from server!" ```
   This means the server is running at `http://localhost:5000/`

# Drizzle Configuration
All the commands are run in server directory.

1. Generate the drizzle TS files to SQL:
   ```
   npx drizzle-kit generate --config ./drizzle.config.ts
   ```
   or
   ```
   npm run db:generate
   ```
2. Push SQL to Postgres database:
   ```
   npx drizzle-kit push --config ./drizzle.config.ts
   ```
   or 
   ```
   npm run db:push
   ```
3. To see the database in a Graphical user interface:
   ```
   npx drizzle-kit studio --config ./drizzle.config.ts
   ```
   or 
   ```
   npm run db:show
   ```
4. To see the database in a terminal:
   ```
   docker exec -it fullstack_db psql -U postgres
   ```
   ```
   \dt
   ```
   ```
   select * from <table-name>
   ```

for more information visit the [drizzle docs](https://orm.drizzle.team/docs/overview).

## To use Database 

1. Update the NODE_ENV variaable to dev/test/prod based on which databse you need.

## Additional Notes

- To install packages and at the same time include that in package.json, use:
  ```
  npm install <package-name> --save
  ```

- To uninstall packages, use:
  ```
  npm uninstall <package-name>
  ```

## Coding Best Practices

[Express.js Coding Stadards](https://eng-git.canterbury.ac.nz/cosc680-2024/cosc680-2024-project/-/wikis/Coding-Style-Guidelines/Express.js-Coding-Standards-)
