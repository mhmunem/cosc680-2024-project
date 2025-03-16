import { numericCasted } from "../../types/schema";
import { products } from "./products";
import { serial, integer, pgTable } from "drizzle-orm/pg-core";

export const shopping_list = pgTable('shopping_list', {
    id: serial().primaryKey(),
    amount: numericCasted().notNull(),
    productID: integer().notNull().references(() => products.id),
})
