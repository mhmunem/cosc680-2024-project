import { Pool } from 'pg'


const config = {
    user: process.env["DB_USER"],
    host: process.env["DB_HOST"],
    database: process.env["DB_NAME"],
    password: process.env["DB_PASSWORD"],
    port: parseInt(process.env["DB_PORT"]!),
}

export const pool = new Pool(config)

export async function createDatabases(pool: Pool, databases: string[]) {
    for (const dbName of databases) {
        try {
            const query = `SELECT 1 FROM pg_database WHERE datname = $1 LIMIT 1`
            const res = await pool.query(query, [dbName])
            if (res.rowCount === 0) {
                await pool.query(`CREATE DATABASE ${dbName}`)
                console.log(`${dbName} created`);
            }

        } catch (error) {
            console.error(`Error while creating database ${dbName}:`, error)
        }
    }
}

export async function dropDB(pool: Pool, databases: String[]) {
    if (process.env["NODE_ENV"] === 'prod') { // extra protection so prod is not accidentally dropped.
        return
    }

    for (const dbName of databases) {
        try {
            const query = `SELECT 1 FROM pg_database WHERE datname = $1 LIMIT 1`
            const res = await pool.query(query, [dbName])
            if (res.rowCount === 1) {
                await pool.query(`DROP DATABASE IF EXISTS ${dbName}`)
            }
            console.log(`${dbName} dropped`);

        } catch (error) {
            console.error(`Error while creating database ${dbName}:`, error)
        }
    }
}
