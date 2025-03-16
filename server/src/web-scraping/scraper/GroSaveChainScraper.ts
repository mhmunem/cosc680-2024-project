import insertChains from '../drizzleQuery/insertChain'

const GrosaveChainScraper = async () => {
    try {
        await insertChains() 
        console.log('All chains inserted successfully.')
    } catch (error) {
        console.error('Error during scraping:', error)
    }
}

export default GrosaveChainScraper;