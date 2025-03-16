import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ilike, asc, desc, eq, ne, and } from "drizzle-orm";
import { products } from "../db/schema/products";
import { store_products } from "../db/schema/store_products";
import { units } from "../db/schema/units";
import { category } from "../db/schema/category";
import { stores } from "../db/schema/stores";
import { chains } from "../db/schema/chains";
import { ProductSearchResult } from "../types/schema";

export async function search_product(db: NodePgDatabase, name: string, sort_by: 'name' | 'price' | 'amount', sort_direction: 'ASC' | 'DESC'): Promise<ProductSearchResult[]> {
    const sort = sort_direction == 'ASC' ? asc : desc
    let column

    switch (sort_by) {
        case 'name':
            column = products.name
            break;
        case 'amount':
            column = products.amount
            break;
        default:
            column = store_products.price
            break;
    }

    const search_results = await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${name}%`))
        .innerJoin(store_products, and(eq(products.id, store_products.productID), ne(store_products.price, 0))) // ensures products erroneously scraped with price 0 will not show (as an extra layer of procection)
        .innerJoin(units, eq(products.unitID, units.id))
        .innerJoin(category, eq(products.categoryID, category.id))
        .innerJoin(stores, eq(store_products.storeID, stores.id))
        .innerJoin(chains, eq(chains.id, stores.chainID))
        .orderBy(sort(column))


    return search_results
}
