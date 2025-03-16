import { PlaywrightCrawler, Dataset } from 'crawlee'
import insertCategories from '../drizzleQuery/insertCategories'

async function GroSaveCategoryScraper() {
    const crawler = new PlaywrightCrawler({
        async requestHandler({ page }) {
            const categories = await page.evaluate(() => {
                const categoryElements = document.querySelectorAll('.chip')
                return Array.from(categoryElements).map(el => el.textContent?.trim())
            })

            await insertCategories(categories)
        },
    })

    await crawler.run(['https://grosave.co.nz/search?page=1&limit=20&sortedBy=relevance&sortOrder=asc'])

}

export default GroSaveCategoryScraper
