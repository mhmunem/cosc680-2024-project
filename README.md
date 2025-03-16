# Grocery Comparison App

## How to Run

This project uses docker compose for development, testing, and release.

The run the client, server, or pgadmin separately simple run `sudo docker compose -f <respective_compose_file> up`.
One can also run multiple docker compose files at the same time.
E.g. `sudo docker compose -f ./docker-compose-db.yml -f ./docker-compose-server.yml up` to run the server with database.
However, to run the entire stack (client, server, and pgadmin) in parallel run `sudo docker compose up`.
To automatically restart the containers in case of any changes use `--watch`. E.g. `sudo docker compose up --watch`.

On Windows `sudo` is not required. Make sure Docker is running.

## Running Production

- `sudo docker compose -f docker-compose-prod.yml -f ./docker-compose-prod-override.yml`
    - This will run the server, client, and web scraping. Go to `http://localhost:5173/` to view the app.
- Running tests:
    - `sudo docker compose -f server/docker-compose-server-test.yml -f server/docker-compose-server-test-override.yml up --build`
    - `sudo docker compose -f client/docker-compose-e2e.yml -f client/compose-override-e2e.yml  up --build`
- In case of problems remove the containers with `sudo docker container ls -aq | xargs -i sudo docker container rm {}` and try again.

## Running Tests

**Server**

From the root directory run: `sudo docker compose -f server/docker-compose-server-test.yml -f server/docker-compose-server-test-override.yml up --watch --build`.
The tests will automatically rerun when any files in `server/` change.

**Client**

ETA: soon

**End-to-end Tests**

From the root directory run: `sudo docker compose -f client/docker-compose-e2e.yml -f client/compose-override-e2e.yml up --build --watch`.
The tests will automatically rerun when any files in `server/` or `client/` change.

# Overview

We will develop a grocery price comparison app to help users find the best prices for their grocery items across multiple supermarkets.

## Folder Structure

- `client/`: Mobile application using React and Ionic.
- `server/`: API and server-side logic with Express.js.

## Tech Stack

- **client**: React, Ionic, Capacitor
- **server**: Node.js, Express.js

## Getting Started

Follow the instructions in the individual folder README files for setup.

- `client/`:[client Readme](client\README.md)
- `server/`:[server Readme](server\Readme.md)

## Development Team

- Team Members: Anne-Jan Veendijk, Haosheng Ye, Mohammad Munem, Nandhini Sambasivam, Sam Williams, Yuchuan Jin
- Development Timeline: December 2, 2024 - February 7, 2025

## Prerequisites

### Node.js and npm Installation

1. Download:
   - Download the latest **LTS version** of Node.js from the [Node.js official website](https://nodejs.org/). This installation includes npm.
   - Alternatively, follow detailed instructions for your OS from [this guide](https://kinsta.com/blog/how-to-install-node-js/).

2. Verify Installation:
   Run the following commands to confirm installation:
   ```
   node -v
   npm -v
   ```

#### Troubleshooting

##### If node or npm Is Not Recognized

1. **Check PATH Variable**:
   Ensure that node and npm are added to your system's PATH.
   - Windows:
     - Open System Properties > Environment Variables.
     - Locate the Path variable in System Variables and ensure it includes the directory where Node.js was installed (C:\Program Files\nodejs\).
2. **Other issue check here** (https://medium.com/@ruben.alapont/troubleshooting-common-npm-issues-tips-and-solutions-c6d0cd094d56)

### Code Editor of your Choice

- The Ionic React documentation recommends using Visual Studio Code (VS Code) as the IDE for development (https://ionicframework.com/docs/intro/environment)

## Git Workflow

Check the Git Cheat sheet for the Git workflow [here](https://about.gitlab.com/images/press/git-cheat-sheet.pdf).

### Clone the Repository

Clone the project to your local machine:

```
git clone https://eng-git.canterbury.ac.nz/cosc680-2024/cosc680-2024-project.git
cd cosc680-2024-project
```

### Create and Switch to a New Branch

```
git checkout -b <branch-name>
```

Use descriptive branch names, such as `feature/<feature_name>` or `bug/<bug_name>`.

### Stage and Commit Changes

1. Stage your changes:
   ```
   git add .
   ```
   - To stage specific files:
     ```
     git add <file-name>
     ```

2. Commit your changes with a message:
   ```
   git commit -m "Descriptive commit message"
   ```

### Push Changes

```
git push origin <branch-name>
```

## Run the client and server

```
npm run dev (check the package.json scripts)
```

# PostgreSQL Setup and Quick Reference Guide

This README provides detailed instructions for installing PostgreSQL, setting up roles and databases, and basic commands to get started.

## 1. Install PostgreSQL

### Windows

1. Download PostgreSQL from the [official website](https://www.postgresql.org/download/).
2. Run the installer and follow the instructions.
3. During installation, set up a PostgreSQL superuser (default is postgres) with a password.

## 2. Accessing PostgreSQL

After installation, access PostgreSQL using the psql CLI from installation folder
- enter  Server [localhost]:
            Database [postgres]:
            Port [5432]:
            Username [postgres]:
            Password for user postgres:

## 3. PostgreSQL Basics

### View Connection Information

```
\conninfo
```

### Quit the PostgreSQL Command Line

```
\q
```

## 4. Creating Roles and Setting Permissions

### Create a Role

```
CREATE ROLE admin WITH LOGIN PASSWORD 'admin';
```

### Grant Permissions to the Role

- Allow the role to create databases:
  ```
  ALTER ROLE admin CREATEDB;
  ```
- View the list of roles:
  ```
  \du
  ```
  Example Output:
  ```
                               List of roles
   Role name |                         Attributes
  --+
   admin     | Create DB
   postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS
  ```


## 5. Creating and Connecting to a Database

### Create a Database

```
CREATE DATABASE api;
```

### Connect to the Database

```
\c api
```
- This switches to the api database and uses the admin user (if logged in as admin).

Example Output:

```
You are now connected to database "api" as user "admin".
```

## 6. Working with Tables

### List Tables in the Current Schema

```sql
\dt
```

## 7. Example Workflow

1. Access PostgreSQL as a superuser:
   ```
   psql -U postgres
   ```
2. Create a new role with login credentials:
   ```
   CREATE ROLE admin WITH LOGIN PASSWORD 'admin';
   ```
3. Grant the `CREATEDB` privilege to the `admin` role:
   ```
   ALTER ROLE admin CREATEDB;
   ```
4. Create a new database named `api`:
   ``
   CREATE DATABASE api;
   ```
5. Switch to the `api` database:
   ```
   \c api
   ```
6. Verify the connection:
   ```
   \conninfo
   ```
7. View tables in the current schema (if any):
   ```
   \dt
   ```

## 8. Additional Commands
### List All Schemas
```
\dn
```

### View Database Information
```
\l
```

### Delete a Role
```
DROP ROLE admin;
```

## 9. Common Troubleshooting
- Permission Denied: Check the role's permissions using `\du`.

# Crawlee Setup Guide

### Overview

We are using Crawlee, a robust web scraping and automation library, to build scalable crawlers with support for multiple frameworks like Playwright, Puppeteer, and Cheerio.
Future iterations may include cloud deployment for enhanced scalability and storage.

### Prerequisites

- Node.js (node -v)
- npm (Node Package Manager) or yarn (npm -v)
- A folder for the project is already created.

### To run the docker for production with web scarping 

```
docker compose -f docker-compose-prod.yml -f docker-compose-prod-override.yml up --build

```



## Resources

Here are helpful resources for understanding and extending this project:

1. [Crawlee Introduction](https://crawlee.dev/docs/introduction)
2. [PlaywrightCrawler API Reference](https://crawlee.dev/api/playwright-crawler/class/PlaywrightCrawler)
4. [PuppeteerCrawler API Reference](https://crawlee.dev/api/puppeteer-crawler/class/PuppeteerCrawler)
3. [PlaywrightCrawler Example](https://crawlee.dev/docs/examples/playwright-crawler)
5. [PuppeteerCrawler Example](https://crawlee.dev/docs/examples/basic-crawler)
6. [CheerioCrawler Example](https://crawlee.dev/docs/examples/cheerio-crawler)

## Future Development

### Cloud Deployment

Consider deploying Crawlee project to the cloud to scale operations and achieve persistent storage.
For guidance, refer to the [Crawlee Cloud Documentation](https://crawlee.dev/).
