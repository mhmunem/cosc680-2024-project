import SeedFunction from "../../types/seed"
import { NodePgDatabase } from "drizzle-orm/node-postgres"
import { reset, seed } from "drizzle-seed"

export async function reset_db(db: NodePgDatabase, tables: Object): Promise<undefined> {
    // prod database should never be seeded
    if (process.env["NODE_ENV"] === "prod") {
        return
    }

    await reset(db, tables)
}

// This function seed the test data
export async function seed_db(db: NodePgDatabase, tables: Object, seed_data_callback: SeedFunction): Promise<undefined> {
    // prod database should never be seeded
    if (process.env["NODE_ENV"] === "prod") {
        return
    }

    try {
        await seed(db, tables, { seed: 42 }).refine(seed_data_callback)
    } catch (_) {
        console.log("Database seeded")
    }
}
