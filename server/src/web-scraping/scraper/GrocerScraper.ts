import axios from 'axios';
import db from '../../db/connection/pool';
import { products } from '../../db/schema/products';
import { units } from '../../db/schema/units';
import { category } from '../../db/schema/category';
import { PlaywrightCrawler } from 'crawlee';
import { stores } from '../../db/schema/stores';
import approved_stores from '../constants/chainGrocerVendorCodes'
import { store_products } from '../../db/schema/store_products';
import { price_history } from '../../db/schema/price_history';

async function insertProductDetails(productHits: any[]) {
    const unitSet = new Set<string>();
    const categorySet = new Set<string>();
    const productData = [];

    for (const product of productHits) {
        const unitName = product.unit || 'Unknown';
        unitSet.add(unitName);

        const categories = product.category_1 || [];
        const lastCategory = categories[categories.length - 1];
        categorySet.add(lastCategory);
    }

    const unitNames = Array.from(unitSet);
    const insertedUnits = await db.insert(units).values(
        unitNames.map((name) => ({ name }))
    ).onConflictDoUpdate({
        target: units.name,
        set: { name: units.name },
    }).returning().execute();

    const unitIdMap = new Map(insertedUnits.map((unit) => [unit.name, unit.id]));


    const categoryNames = Array.from(categorySet);
    const insertedCategories = await db.insert(category).values(
        categoryNames.map((name) => ({ name }))
    ).onConflictDoUpdate({
        target: category.name,
        set: { name: category.name },
    }).returning().execute();

    const categoryIdMap = new Map(insertedCategories.map((cat) => [cat.name, cat.id]));


    for (const product of productHits) {
        const unitId = unitIdMap.get(product.unit || 'Unknown');
        if (!unitId) {
            console.error(`Unit ID not found for unit ${product.unit}`);
            continue;
        }

        const categories = product.category_1 || [];
        let categoryId;
        const lastCategoryName = categories[categories.length - 1];

        if (lastCategoryName) {
            categoryId = categoryIdMap.get(lastCategoryName);
        }

        if (!categoryId) {
            console.error(`Category ID not found for product ${product.name}`);
            continue;
        }

        productData.push({
            name: product.name,
            brand: product.brand,
            details: '',
            amount: product.size || 1,
            image: `https://grocer-au.syd1.cdn.digitaloceanspaces.com/products/${product.id}.webp`,
            unitID: unitId,
            categoryID: categoryId,
        });
    }

    if (productData.length > 0) {
        const uniqueProductData = Array.from(
            new Map(productData.map((p) => [p.name, p])).values()
        );

        await db.insert(products).values(uniqueProductData).onConflictDoUpdate({
            target: products.name,
            set: {
                brand: products.brand,
                details: products.details,
                amount: products.amount,
                image: products.image,
                unitID: products.unitID,
                categoryID: products.categoryID,
            },
        }).execute();

        console.log(`Inserted or updated ${uniqueProductData.length} products.`);
    } else {
        console.log('No product data to insert.');
    }

}

// TODO: use defined type instead from the types folder
async function getStoreIdMap() {
    const allStores = await db.select().from(stores).execute();
    return new Map(allStores.map(store => [store.name, store.id]));
}

// TODO: use defined type instead from the types folder
async function getProductIdMap() {
    const allProducts = await db.select().from(products).execute();
    return new Map(allProducts.map(product => [product.name, product.id]));
}

function chunkArray(array: any[], size: number): any[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}
async function fetchAndProcessPriceData(productIds: string[], storeIds: string[]) {
    const productBatches = chunkArray(productIds, 10);
    const storeBatches = chunkArray(storeIds, 20);

    for (const productBatch of productBatches) {
        for (const storeBatch of storeBatches) {
            const productIdsQuery = productBatch.map(id => `productIds[]=${id}`).join('&');
            const storeIdsQuery = storeBatch.map(id => `storeIds[]=${id}`).join('&');
            const url = `https://backend.grocer.nz/products?${productIdsQuery}&${storeIdsQuery}`;

            try {
                //console.log(`Fetching data for products: [${productBatch}] and stores: [${storeBatch}]`);
                const response = await axios.get(url);

                const productData = response.data;
                if (productData && productData.length > 0) {
                    await insertStoreProductsAndPriceHistory(productData);
                } else {
                    console.warn(`No data found for products: [${productBatch}] and stores: [${storeBatch}]`);
                }
            } catch (error) {
                console.error(`Error fetching data for batch:`, error);
            }
        }
    }
} async function processProductHits(productHits: any[]) {
    const grocerProductIds = new Set<string>();
    const grocerStoreIds = new Set<string>();
    const processedProducts: string[] = [];

    for (const product of productHits) {
        grocerProductIds.add(product.id);

        if (product.stores && Array.isArray(product.stores)) {
            for (const store of product.stores) {
                if (approved_stores.slice().map((s: any) => s.id).includes(store)) {
                    grocerStoreIds.add(store);
                }
            }
        }

        processedProducts.push(product.name);
    }

    const productIdsArray = Array.from(grocerProductIds);
    const storeIdsArray = Array.from(grocerStoreIds);

    console.log(`Extracted ${productIdsArray.length} product IDs and ${storeIdsArray.length} store IDs.`);
    await fetchAndProcessPriceData(productIdsArray, storeIdsArray);
}
async function insertStoreProductsAndPriceHistory(productData: any[]) {
    const storeIdMap = await getStoreIdMap();
    const productIdMap = await getProductIdMap();

    const storeProductData = [];
    const priceHistoryData = [];
    const today = new Date().toDateString()

    for (const product of productData) {
        const productID = productIdMap.get(product.name);
        if (!productID) {
            console.error(`Product ID not found for product: ${product.name}`);
            continue;
        }

        for (const priceInfo of product.prices) {
            const storeID = storeIdMap.get(priceInfo.store_name);
            if (!storeID) {
                console.error(`Store ID not found for store: ${priceInfo.store_name}`);
                continue;
            }

            const price = priceInfo.original_price || 0;

            storeProductData.push({
                storeID,
                productID,
                price,
            });

            priceHistoryData.push({
                date: today,
                price,
                productID,
                storeID,
            });
        }
    }
    const uniqueStoreProductData = Array.from(
        new Map(storeProductData.map(p => [`${p.storeID}-${p.productID}`, p])).values()
    );

    const uniquePriceHistoryData = Array.from(
        new Map(priceHistoryData.map(p => [`${p.date}-${p.productID}-${p.storeID}`, p])).values()
    );

    if (uniqueStoreProductData.length > 0) {
        await db.insert(store_products).values(uniqueStoreProductData).onConflictDoUpdate({
            target: [store_products.storeID, store_products.productID],
            set: {
                price: store_products.price,
            },
        }).execute();
        console.log(`Inserted or updated ${uniqueStoreProductData.length} store_products.`);
    }

    if (uniquePriceHistoryData.length > 0) {
        await db.insert(price_history).values(uniquePriceHistoryData).onConflictDoUpdate({
            target: [price_history.date, price_history.productID, price_history.storeID],
            set: {
                price: price_history.price,
            },
        }).execute();
        console.log(`Inserted or updated ${uniquePriceHistoryData.length} price_history records.`);
    }
}

async function GrocerProductsScraper() {
    const crawler = new PlaywrightCrawler({
        maxRequestsPerCrawl: 1,
        async requestHandler({ page }) {
            let isRouteHandled = false;
            await page.route('https://search.grocer.nz/indexes/products/search', async (route, interceptedRequest) => {
                if (isRouteHandled) {
                    return await route.continue();
                }
                isRouteHandled = true;
                console.log(`Processing request to: ${interceptedRequest.url()}`);
                const headers = interceptedRequest.headers();
                const authorizationHeader = headers['authorization'];

                if (authorizationHeader) {
                    const payload = {
                        q: '',
                        attributesToRetrieve: ['*'],
                        limit: 99999,
                        offset: 0,
                    };

                    try {
                        const response = await axios.post(
                            'https://search.grocer.nz/indexes/products/search',
                            payload,
                            {
                                headers: {
                                    ...headers,
                                    Authorization: authorizationHeader,
                                },
                            }
                        );

                        const productHits = response.data.hits;

                        if (productHits && productHits.length > 0) {
                            await insertProductDetails(productHits);
                            await processProductHits(productHits);
                        } else {
                            console.warn('No product hits found in the response.');
                        }

                        console.log('Product details inserted successfully.');
                    } catch (error) {
                        console.error('Error while processing Grocer data:', error);
                    }
                } else {
                    console.warn('Missing Authorization header.');
                }

                await route.continue();
            });

            await page.goto('https://grocer.nz/search');
            await page.waitForTimeout(5000);
        },
    });

    await crawler.run(['https://grocer.nz/search']);
}

export default GrocerProductsScraper;
