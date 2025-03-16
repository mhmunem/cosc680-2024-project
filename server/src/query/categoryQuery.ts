import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Category } from "../types/schema";
import { category } from "../db/schema/category";

export async function get_category(db: NodePgDatabase): Promise<Category[]> {
    return await db
        .select()
        .from(category)
}
