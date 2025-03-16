import { defineConfig } from "drizzle-kit";


const env = process.env["NODE_ENV"]!
const dbUrl = process.env[`${env.toUpperCase()}_DATABASE_URL`];

if (!dbUrl) {
    throw new Error(`DATABASE_URL is not defined for the ${env} environment`);
}

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/db/schema/*',
    dbCredentials: {
        url: dbUrl,
    },
    out: "./src/db/drizzle",
})
