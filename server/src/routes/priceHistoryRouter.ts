import db from "../db/connection/pool";
import { Router } from 'express';
import { Request, Response } from 'express';
import { get_price_history_product } from '../query/priceHistory';

const priceHistoryRouter = Router();


/**
 * @swagger
 * tags:
 *   name: PriceHistory
 *   description: API for managing price History
 */

/**
* @swagger
* /price_history:
*   get:
*     tags: [PriceHistory]
*     summary: Retrieve the price history of a product
*     description: Fetches the price history for a specific product based on its ID and optional store filters.
*     parameters:
*       - in: query
*         name: product_id
*         required: true
*         schema:
*           type: integer
*         description: The ID of the product whose price history is to be retrieved.
*       - in: query
*         name: store_ids
*         required: false
*         schema:
*           type: string
*           example: "1,2,3"
*         description: Comma-separated list of store IDs to filter results.
*     responses:
*       200:
*         description: A list of price history records for the specified product.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   date:
*                     type: string
*                     format: date
*                     description: The date of the price record.
*                   price:
*                     type: number
*                     format: float
*                     description: The price of the product on the specified date.
*                   store_id:
*                     type: integer
*                     description: The ID of the store offering this price.
*       400:
*         description: Bad Request. The product_id query parameter is missing or invalid.
*       500:
*         description: Internal Server Error. An error occurred while processing the request.
*/
priceHistoryRouter.get('/price_history', async (req: Request<{ product_id: number}>, res: Response): Promise<undefined> => {
    const { product_id, store_ids } = req.query;
    const storeIdsArray = (store_ids as string).split(',').map(Number);
    const result = await get_price_history_product(db, Number(product_id), storeIdsArray);
    res.send(result);
});

export default priceHistoryRouter;
