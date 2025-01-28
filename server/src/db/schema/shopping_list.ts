import { numericCasted } from "../../types/schema";
import { products } from "./products";
import { serial, integer, pgTable, index } from "drizzle-orm/pg-core";

export const shopping_list = pgTable('shopping_list', {
    id: serial().primaryKey(),
    amount: numericCasted().notNull(),
    productID: integer("product_id").notNull().references(() => products.id),
}, (table) => [
    index("idx_shoping_list_product_id").on(table.productID),
]);
