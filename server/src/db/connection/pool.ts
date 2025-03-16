import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'


const env = process.env["NODE_ENV"]!
const dbUrl = process.env[`${env?.toUpperCase()}_DATABASE_URL`]

const finalPool = new Pool({
    connectionString: dbUrl
})

const db = drizzle(finalPool)


export default db
