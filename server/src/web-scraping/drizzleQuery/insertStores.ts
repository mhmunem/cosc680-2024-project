import db from "../../db/connection/pool"
import { Chains } from "../../types/schema"
import { chains } from "../../db/schema/chains"
import { ilike } from "drizzle-orm"
import { stores } from "../../db/schema/stores"


export default async function insertOrUpdateStores(storeData: any): Promise<undefined> {
    try {
        for (const store of storeData) {
            if (!store.name) {
                console.error("Store name is undefined")
                continue
            }

            let chain: Chains | undefined

            chain = (await db.select().from(chains).where(ilike(chains.name, `${store.name.split(' ')[0]}%`)).limit(1))[0]

            if (!chain) {
                console.error(`No matching chain found for: ${store.name}`)
                continue
            }

            await db.insert(stores).values({
                name: store.name,
                chainID: chain.id,
            }).onConflictDoUpdate({
                target: [stores.name],
                set: {
                    chainID: chain.id,
                },
            })

            console.log(`Inserted or updated ${store.name} successfully.`)
        }
    } catch (error) {
        console.error("Error:", error)
    }
}
