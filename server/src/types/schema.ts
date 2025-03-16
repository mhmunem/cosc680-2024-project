import { stores } from "../db/schema/stores";
import { products } from "../db/schema/products";
import { chains } from "../db/schema/chains";
import { units } from "../db/schema/units";
import { store_products } from "../db/schema/store_products";
import { customType } from "drizzle-orm/pg-core";
import { category } from "../db/schema/category";
import { price_history } from "../db/schema/price_history";

export type Products = typeof products.$inferSelect
export type Stores = typeof stores.$inferSelect
export type Chains = typeof chains.$inferSelect
export type Units = typeof units.$inferSelect
export type StoreProducts = typeof store_products.$inferSelect
export type Category = typeof category.$inferSelect
export type PriceHistory = typeof price_history.$inferSelect

// This results from joins
export type ProductSearchResult = {
    store_products: StoreProducts
    units: Units
    category: Category
    stores: Stores
    chains: Chains
    products: Products
}

// A custom type which solves the issue of numeric and decimal types being infered as string.
// See: https://github.com/drizzle-team/drizzle-orm/issues/1042
export const numericCasted = customType<{
    data: number
    driverData: string
}>({
    dataType: () => 'numeric',
    fromDriver: (value: string) => Number.parseFloat(value), // note: precision loss for very large/small digits so area to refactor if needed
    toDriver: (value: number) => value.toString(),
})
