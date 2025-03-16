import { serial, text, pgTable, unique } from "drizzle-orm/pg-core";

export const category = pgTable('category', {
    id: serial().primaryKey(),
    name: text().notNull().unique(),
} );
