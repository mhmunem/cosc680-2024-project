import db from '../../db/connection/pool'
import { chains } from '../../db/schema/chains'
import chainLogoURl from '../constants/chainLogoUrl'

// For GroSave
const insertChains = async () => {
    for (const chain of chainLogoURl) {
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

export default insertChains
