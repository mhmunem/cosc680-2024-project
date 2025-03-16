import { defineConfig } from "drizzle-kit";


const env = process.env["NODE_ENV"]!

const dbUrl = `postgresql://postgres:cosc680@localhost:5432/cosc680_${env}_db`

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
