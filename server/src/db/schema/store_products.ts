import { products } from "./products";
import { serial, integer, pgTable, unique, index } from "drizzle-orm/pg-core";
import { stores } from "./stores";
import { numericCasted } from "../../types/schema";

export const store_products = pgTable('store_products', {
    id: serial().primaryKey(),
    storeID: integer("store_id").notNull().references(() => stores.id),
    productID: integer("product_id").notNull().references(() => products.id),
    price: numericCasted().notNull(),
}, (table) => [
    unique().on(table.storeID, table.productID),
    index("idx_store_products_store_id").on(table.storeID),
    index("idx_store_products_product_id").on(table.productID),
]);
