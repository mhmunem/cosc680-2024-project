import { serial, date, integer, pgTable, unique } from "drizzle-orm/pg-core";
import { numericCasted } from "../../types/schema";
import { products } from "./products";
import { stores } from "./stores";

export const price_history = pgTable('price_history', {
    id: serial().primaryKey(),
    date: date().notNull(),
    price: numericCasted().notNull(),
    productID: integer().notNull().references(() => products.id),
    storeID: integer().notNull().references(() => stores.id)

}, (table) => {
    return {
        dateProduct: unique().on(table.date, table.productID, table.storeID),
    }
})
