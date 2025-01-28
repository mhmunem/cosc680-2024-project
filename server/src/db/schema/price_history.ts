import { serial, date, integer, pgTable, unique, index } from "drizzle-orm/pg-core";
import { numericCasted } from "../../types/schema";
import { products } from "./products";
import { stores } from "./stores";

export const price_history = pgTable("price_history", {
    id: serial().primaryKey(),
    date: date().notNull(),
    price: numericCasted().notNull(),
    productID: integer("product_id").notNull().references(() => products.id),
    storeID: integer("store_id").notNull().references(() => stores.id)
}, (table) => [
    unique().on(table.date, table.productID, table.storeID),
    index("idx_price_product_id").on(table.productID),
    index("idx_price_store_id").on(table.storeID)
]);
