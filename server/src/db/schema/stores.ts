import { chains } from './chains';
import { serial, integer, text, pgTable } from "drizzle-orm/pg-core";

export const stores = pgTable('stores', {
    id: serial().primaryKey(),
    name: text().notNull().unique(),
    chainID: integer().notNull().references(() => chains.id),
})
