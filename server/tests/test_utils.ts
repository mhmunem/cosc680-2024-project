import dotenv from "dotenv"
import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"

dotenv.config()

export const test_pool = new Pool({
    connectionString: process.env["TEST_DATABASE_URL"]
})

export const test_db = drizzle(test_pool)
