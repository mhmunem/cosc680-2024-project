import insertGrocerChains from '../drizzleQuery/insertGrocerChain'

const GrocerChainScraper = async () => {
    try {
        await insertGrocerChains() 
        console.log('All chains inserted successfully.')
    } catch (error) {
        console.error('Error during scraping:', error)
    }
}

export default GrocerChainScraper;