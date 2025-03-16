import GrosaveChainScraper from './scraper/GroSaveChainScraper'
import GrocerChainScraper from './scraper/GrocerChainScraper'
import GrocerProductsScraper from './scraper/GrocerScraper'
import GrocerStoreScraper from './scraper/GrocerStoreScraper'
import GroSaveCategoryScraper from './scraper/GroSaveCategoryScraper'
import GroSaveProductsScraper from './scraper/GroSaveProductsScraper'
import GrosaveStoresScraper from './scraper/GrosaveStoresScraper'

async function runScrapers(): Promise<undefined> {
    try {

        // TODO: This should be parametrizable from the CLI
        /* Grocer Scraper call*/
        // Uncommented ths if we need Grocer Data and comment the grosave 

        await GrocerChainScraper()
        console.log("Chain scraping completed")

        await GrocerStoreScraper
        console.log("Store scraping completed")

        await GrocerProductsScraper()
        console.log('Products scraped completed')



        /* GroSave Scraper call*/

        // await GrosaveChainScraper()
        // console.log("Chain scraping completed")

        // await GrosaveStoresScraper()
        // console.log("Stores scraped completed")

        // await GroSaveCategoryScraper()
        // console.log('Categories scraped completed')

        // await GroSaveProductsScraper()
        // console.log('Products scraped completed')

    } catch (error) {
        console.error('Error during scraping:', error)
    }
}

runScrapers()
