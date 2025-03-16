import { createDatabases, dropDB, pool } from "./db/connection/pool-maintenance"

// This file is to facilitate automating seeding of the dev database using docker compose
// It allows seeding and resetting to be done indepently using packacke.json script.
// This prevents race conditions when resestting and seeding the database.

const arg = process.argv[2]
const env = process.env["NODE_ENV"]

console.log("Running in environment:", env)

if (env !== "prod" && arg === "drop") { // extra protection so prod is not accidentally dropped.
    // dropDB(pool, ['cosc680_dev_db', 'cosc680_test_db'])
} else if (arg === "create") {
    createDatabases(pool, ['cosc680_dev_db', 'cosc680_test_db', 'cosc680_prod_db'])
} else {
    console.log("No commands given");

}
