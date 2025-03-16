import { Router } from 'express';
import { search_product } from "../search/search";
import { Request, Response } from 'express';
import db from "../db/connection/pool";
import { SortDirection } from '../types/routes';
import { SortBy } from '../types/routes';

const searchRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: API for managing search Product
 */

/**
 * @swagger
 * /search_product:
 *   get:
 *     tags: [Search]
 *     summary: Search for a product
 *     description: Retrieves a list of products filtered by name and sorted by the specified criteria.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the product to search for.
 *       - in: query
 *         name: sort_by
 *         schema:
 *           type: string
 *           enum: [name, price, amount]
 *         required: false
 *         description: The field by which to sort the results.
 *       - in: query
 *         name: sort_direction
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         required: false
 *         description: The direction to sort the results (ascending or descending).
 *     responses:
 *       200:
 *         description: A list of products matching the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the product.
 *                   name:
 *                     type: string
 *                     description: The name of the product.
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: The price of the product.
 *                   amount:
 *                     type: integer
 *                     description: The available amount of the product.
 *       400:
 *         description: Invalid request parameters.
 */
searchRouter.get('/search_product', async (req: Request<{ name: string, sort_by: SortBy, sort_direction: SortDirection }>, res: Response) => {
    const { name, sort_by, sort_direction } = req.query

    const result = await search_product(db, name as string, sort_by as SortBy, sort_direction as SortDirection)

    res.send(result)
});

export default searchRouter
