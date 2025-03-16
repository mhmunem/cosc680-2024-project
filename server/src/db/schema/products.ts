import { serial, integer, text, pgTable } from "drizzle-orm/pg-core"
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
    unitID: integer().notNull().references(() => units.id),
    categoryID: integer().notNull().references(() => category.id),
})
