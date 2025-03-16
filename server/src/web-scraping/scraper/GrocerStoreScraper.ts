import axios from 'axios'
import insertOrUpdateStores from '../drizzleQuery/insertStores'
import approved_stores from '../constants/chainGrocerVendorCodes'


async function fetchStores() {
    const response = await axios.get('https://backend.grocer.nz/stores')

    const approved_stores_ids = approved_stores.slice().map(s => s.id)

    const stores = response.data.filter((s: any) => approved_stores_ids.includes(s.id))

    return stores
}

async function storeScraper() {
    try {
        const storesData = await fetchStores()
        await insertOrUpdateStores(storesData)
        console.log('All stores inserted successfully.')
    } catch (error) {
        console.error('Error during scraping:', error)
    }
}

export default storeScraper()
