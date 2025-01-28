import { serial, integer, text, pgTable, index } from "drizzle-orm/pg-core"
import { units } from "./units"
import { category } from "./category"
import { numericCasted } from "../../types/schema"

export const products = pgTable('products', {
    id: serial().primaryKey(),
    name: text().notNull().unique(),
    brand: text(),
    details: text(),
    amount: text(),
    image: text(),
    unitID: integer("unit_id").notNull().references(() => units.id),
    categoryID: integer("category_id").notNull().references(() => category.id),
}, (table) => [
    index("idx_product_unit_id").on(table.unitID),
    index("idx_product_category_id").on(table.categoryID),
]);
