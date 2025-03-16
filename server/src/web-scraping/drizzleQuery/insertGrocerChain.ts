import db from '../../db/connection/pool'
import { chains } from '../../db/schema/chains'
import chainLogoGrocerURL from '../constants/chainLogoGrocerURL'

const insertGrocerChains = async () => {
    for (const chain of chainLogoGrocerURL) {
        try {
            await db.insert(chains)
            .values({ name: chain.name, image_logo: chain.imageurl })
            .onConflictDoUpdate({
                                target: chains.name,
                                set: {
                                    image_logo: chain.imageurl,
                                },
                            })
        } catch (error) {
            console.error(`Error inserting ${chain.name}:`, error)
        }
    }
}

export default insertGrocerChains
