import { stores } from '../../db/schema/stores'
import { chains } from '../../db/schema/chains'
import db from '../../db/connection/pool'
import { Chains } from '../../types/schema'
import { ilike } from 'drizzle-orm'


export async function insertScarpedStores(storesData: any): Promise<undefined> {
    try {
        for (const store of storesData) {
            if (!store.name) {
                            console.error('Store name is undefined')
                            continue
                        }
            
            let chain: Chains | undefined
            chain = (await db.select().from(chains).where(ilike(chains.name, store.brand.name)).limit(1))[0]

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
        }

        console.log('All matching stores inserted successfully.')

    } catch (error) {
        console.error('Error during scraping:', error)
    }
}
