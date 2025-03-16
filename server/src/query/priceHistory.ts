import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq, inArray, and, ne } from "drizzle-orm";
import { price_history } from "../db/schema/price_history";
import { stores } from "../db/schema/stores";

export async function get_price_history_product(db: NodePgDatabase,product_id: number,store_ids: number[]): Promise<{ date: string; price: number | null; storeName: string }[]> {
    const result = await db
        .selectDistinctOn([price_history.date],{
            date: price_history.date,
            price: price_history.price,
            storeName: stores.name,
        })
        .from(price_history)
        .innerJoin(stores, eq(price_history.storeID, stores.id))
        .where(
            and(
                eq(price_history.productID, product_id),
                inArray(price_history.storeID, store_ids),
                ne(price_history.price, 0)
            )
        )
       .orderBy(price_history.date, price_history.price,stores.name)

    return result;
}
