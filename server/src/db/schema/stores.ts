import { chains } from './chains';
import { serial, integer, text, pgTable,index } from "drizzle-orm/pg-core";

export const stores = pgTable('stores', {
    id: serial().primaryKey(),
    name: text().notNull().unique(),
    chainID: integer("chain_id").notNull().references(() => chains.id),
}, (table) => [
    index("idx_store_chain_id").on(table.chainID),
]);
