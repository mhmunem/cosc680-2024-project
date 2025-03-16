import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Chains } from "../types/schema";
import { chains } from "../db/schema/chains";
import { Stores } from "../types/schema";
import { stores } from "../db/schema/stores";
import { inArray } from "drizzle-orm";

export async function get_chain(db: NodePgDatabase): Promise<Chains[]> {
    return await db
        .select()
        .from(chains)

}

export async function get_stores(db: NodePgDatabase): Promise<Stores[]> {
    return await db
        .select()
        .from(stores)
}
