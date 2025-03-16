import axios from 'axios'
import { insertScarpedStores } from '../drizzleQuery/InsertScarpedStores'
import { Dataset } from 'crawlee'


async function fetchGrosaveStores() {
    const response = await axios.get('https://grosave.co.nz/api/allstores')
    return response.data.data
}

async function GrosaveStoresScraper() {
    try {
        const storesData = await fetchGrosaveStores()
        await insertScarpedStores(storesData)
        console.log('All stores inserted successfully.')
    } catch (error) {
        console.error('Error during scraping:', error)
    }
}

export default GrosaveStoresScraper